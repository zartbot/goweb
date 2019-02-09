package auth

import (
	"github.com/gin-gonic/gin"
)

func AttachRoutes(r *gin.Engine) {
	auth := r.Group("/auth")
	{
		auth.POST("/register", register)
		auth.POST("/login", login)
		auth.POST("/logout", IsAuthenticated, logout)
		auth.POST("/token", IsAuthenticated, generateToken)
	}
}
