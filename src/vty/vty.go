package vty

import (
	"net/http"
	"sync"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"github.com/sirupsen/logrus"
	"github.com/zartbot/goconnect/lib/sshvty"
)

var upGrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

//webSocket请求ping 返回pong
func ping(c *gin.Context) {
	//升级get请求为webSocket协议
	ws, err := upGrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		return
	}
	defer ws.Close()
	for {
		//读取ws中的数据
		mt, message, err := ws.ReadMessage()
		if err != nil {
			break
		}
		if string(message) == "ping" {
			message = []byte("pong")
		}
		//写入ws数据
		err = ws.WriteMessage(mt, message)
		if err != nil {
			break
		}
	}
}

type argResizeTerminal struct {
	Columns int
	Rows    int
}

func VtyConnection(c *gin.Context) {
	//setup websocket and ssh connection
	ws, err := upGrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		return
	}
	vty := sshvty.NewDevice("192.168.99.244", 22, "onep", "fuck")
	vty.Connect()

	defer ws.Close()
	defer vty.Close()
	var wg sync.WaitGroup
	wg.Add(2)

	//read from ssh
	go func() {
		defer wg.Done()
		for {
			buf := make([]byte, 4096)
			n, err := vty.Reader.Read(buf)
			if err != nil {
				logrus.Warn("SSHVTY Read error:", err)
				return
			}
			err = ws.WriteMessage(websocket.BinaryMessage, buf[:n])
			if err != nil {
				logrus.Warn("Write websocket error:", err)
				return
			}
		}
	}()

	//read from frontend
	go func() {
		defer wg.Done()
		for {
			logrus.Warn("Reader form front end start....")
			_, reader, err := ws.NextReader()
			if err != nil {
				logrus.Warn("Read from websocket error:", err)
				return
			}
			dataBuff := make([]byte, 4096)
			n, err := reader.Read(dataBuff)
			logrus.Warn(dataBuff)
			if err != nil {
				logrus.Warn("Read from websocket reader error", err)
				return
			}

			_, err = vty.Writer.Write(dataBuff[:n])

			/*
				switch dataBuff[0] {
				case 0:
					buf := make([]byte, 1024)
					n, err := reader.Read(buf)
					if err != nil {
						logrus.Warn("Read from websocket reader error", err)
						return
					}
					_, err = vty.Writer.Write(buf[:n])
					if err != nil {
						logrus.Warn("Write SSHVTY error:", err)
						return
					}
					ws.WriteMessage(websocket.BinaryMessage, []byte(err.Error()))
					return

				//resize terminal
				case 1:
					var args argResizeTerminal
					err := json.Unmarshal(dataBuff[1:], &args)
					if err != nil {
						logrus.Warn("Recieve malformed:", err)
						continue
					}
					err = vty.Session.WindowChange(args.Rows, args.Columns)
					if err != nil {
						logrus.Warn("window change error:", err)
						ws.WriteMessage(websocket.BinaryMessage, []byte(err.Error()))
					}
				default:
					logrus.Warn("Unexpected data type")

				}*/
		}
	}()
	vty.StartShell()

}
