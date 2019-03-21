package main

import (
	"flag"
	"fmt"
	"sync"

	socketio "github.com/googollee/go-socket.io"
	graphql "github.com/graph-gophers/graphql-go"
	"github.com/graph-gophers/graphql-go/relay"
	"github.com/graph-gophers/graphql-transport-ws/graphqlws"
	"github.com/zartbot/goweb/src/server/gql"
	"github.com/zartbot/goweb/src/server/gql/schema"
	"github.com/zartbot/goweb/src/server/middleware/jwt"

	"github.com/zartbot/goweb/src/server/api/auth"
	"github.com/zartbot/goweb/src/server/model"

	"github.com/99designs/gqlgen/handler"
	"github.com/gin-gonic/gin"
	"github.com/zartbot/goweb/src/server/lib/config"
	"github.com/zartbot/goweb/src/server/middleware/sess"

	"github.com/sirupsen/logrus"

	"github.com/zartbot/goflow/lib/metricbeat"

	"net/http"
	_ "net/http/pprof"
)

var cli = struct {
	ConfigFilename string
}{
	"./config/conf.yaml",
}

func init() {
	flag.StringVar(&cli.ConfigFilename, "c", cli.ConfigFilename, "Config YAML File Path")
	flag.Parse()
}

func main() {
	var c config.Config
	c.GetConf(cli.ConfigFilename)

	if c.DevMode {
		//pprof hook
		go func() {
			logrus.Info(http.ListenAndServe("localhost:6666", nil))
		}()
		go metricbeat.StartMetricBeat()
	}

	var wg sync.WaitGroup
	wg.Add(2)

	go func() {
		if !c.DevMode {
			gin.SetMode(gin.ReleaseMode)
		}
		app := gin.Default()
		app.StaticFS("/js", http.Dir("dist/js"))
		app.StaticFS("/jslib", http.Dir("dist/jslib"))
		app.StaticFS("/css", http.Dir("dist/css"))
		app.StaticFS("/fonts", http.Dir("dist/fonts"))
		app.StaticFile("/", "./dist/index.html")
		app.StaticFile("/favicon.ico", "./dist/favicon.ico")

		//init user authentication database
		userDBvalid := model.GetUserDBInstance().Init("config/webui/user.db")
		if !userDBvalid {
			logrus.Fatal("connect user authentication database failed.")
		}

		//enable session suport
		app.Use(sess.New(c.WEB_SessionSecureKey, "sess", c.WEB_MaxAge))
		//enable jwt
		jwtoken := jwt.NewJWT(c.WEB_SessionSecureKey, 30*60)
		app.Use(jwtoken.Init())

		//apply authentication
		auth.AttachRoutes(app)

		app.GET("/graphiql", gin.WrapH(handler.Playground("GraphQL playground", "/api/graphql")))

		s, err := graphql.ParseSchema(schema.GetSchema(), gql.NewResolver())
		if err != nil {
			panic(err)
		}
		//graphQLHandler := graphqlauth.NewHandlerFunc(s, &relay.Handler{Schema: s}, jwtoken)
		graphQLHandler := graphqlws.NewHandlerFunc(s, &relay.Handler{Schema: s})
		app.POST("/api/graphql", gin.WrapF(graphQLHandler))
		app.GET("/api/graphql", gin.WrapF(graphQLHandler))

		/*
			gql := gin.WrapH(handler.GraphQL(graphql.NewExecutableSchema(graphql.Config{Resolvers: &graphql.Resolver{}})))

			app.GET("/api/graphql", gql)
			app.POST("/api/graphql", gql)
		*/

		app.LoadHTMLFiles("dist/index.html")
		/*
			app.GET("/login", func(c *gin.Context) {
				c.HTML(200, "index.html", nil)
			})
			app.GET("/signup", func(c *gin.Context) {
				c.HTML(200, "index.html", nil)
			})
		*/

		soIO, err := socketio.NewServer(nil)
		if err != nil {
			panic(err)
		}

		soIO.On("connection", func(so socketio.Socket) {
			fmt.Println("on connection")
			so.Join("chat")
			so.On("msg", func(msg string) {
				logrus.Warn(msg)
				so.BroadcastTo("chat", "msg", msg)
			})

			so.On("disconnection", func() {
				fmt.Println("on disconnect")
			})
		})

		soIO.On("error", func(so socketio.Socket, err error) {
			fmt.Printf("[ WebSocket ] Error : %v", err.Error())
		})

		app.GET("/socket.io/", gin.WrapH(soIO))

		app.NoRoute(func(c *gin.Context) {
			c.HTML(200, "index.html", nil)
		})

		app.RunTLS(fmt.Sprintf(":%d", c.HTTPSPort), c.SSLCert, c.SSLKey)
	}()
	wg.Wait()
}
