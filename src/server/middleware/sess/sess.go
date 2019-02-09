package sess

import (
	"encoding/gob"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/memstore"
	"github.com/gin-gonic/gin"
	"github.com/zartbot/goweb/src/server/model"
)

func init() {
	gob.Register(model.UserBasicInfo{})
}

func New(secret string, name string, maxAge int) gin.HandlerFunc {
	store := memstore.NewStore([]byte(secret))
	store.Options(sessions.Options{
		MaxAge:   maxAge,
		Path:     "/",
		Secure:   true,
		HttpOnly: true,
	})
	return sessions.Sessions(name, store)
}

func ValidateSession(priv int16) gin.HandlerFunc {
	return func(c *gin.Context) {
		session := sessions.Default(c)
		v := session.Get("userinfo")
		if v == nil {
			c.AbortWithStatusJSON(401, gin.H{
				"status": -1,
				"msg":    "invalid access",
			})
			return
		}
		uinfo := v.(model.UserBasicInfo)
		if uinfo.PrivilegeLevel < priv {
			c.AbortWithStatusJSON(401, gin.H{
				"status": -1,
				"msg":    "invalid access",
			})
			return
		}
	}
}

func FetchUserInfo(c *gin.Context) (model.UserBasicInfo, bool) {
	session := sessions.Default(c)
	v := session.Get("userinfo")
	if v == nil {
		nilUserinfo := &model.UserBasicInfo{}
		return *nilUserinfo, false
	}
	uinfo := v.(model.UserBasicInfo)
	return uinfo, true
}
