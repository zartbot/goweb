package graphqlws

import (
	"context"
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/sirupsen/logrus"

	"github.com/zartbot/goweb/src/server/gql/graphqlws/internal/connection"
	"github.com/zartbot/goweb/src/server/middleware/jwt"
)

const protocolGraphQLWS = "graphql-ws"

var upgrader = websocket.Upgrader{
	CheckOrigin:  func(r *http.Request) bool { return true },
	Subprotocols: []string{protocolGraphQLWS},
}

// NewHandlerFunc returns an http.HandlerFunc that supports GraphQL over websockets
func NewHandlerFunc(svc connection.GraphQLService, httpHandler http.Handler, j *jwt.JWT) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		tokenString := r.Header.Get("Authorization")
		claims, err := j.ParseToken(tokenString)
		if err != nil {
			logrus.Warn(err)
			w.WriteHeader(401)
			return
		}
		for _, subprotocol := range websocket.Subprotocols(r) {
			if subprotocol == "graphql-ws" {
				ws, err := upgrader.Upgrade(w, r, nil)
				if err != nil {
					return
				}

				if ws.Subprotocol() != protocolGraphQLWS {
					ws.Close()
					return
				}

				go connection.Connect(ws, svc)
				return
			}
		}

		// Fallback to HTTP
		httpHandler.ServeHTTP(w, r.WithContext(context.WithValue(r.Context(), "Authorization", claims)))
	}
}
