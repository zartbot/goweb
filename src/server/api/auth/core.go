package auth

import (
	"fmt"
	"strings"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/zartbot/goweb/src/server/middleware/jwt"
	"github.com/zartbot/goweb/src/server/model"
	"golang.org/x/crypto/bcrypt"
)

func hash(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 12)
	return string(bytes), err
}

func checkHash(password string, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

type loginForm struct {
	Userid   string
	Password string
}

func login(c *gin.Context) {
	req := new(loginForm)
	e := c.BindJSON(&req)
	if e != nil {
		c.JSON(200, gin.H{
			"status": -1,
			"errmsg": "invalid access",
		})
		return
	}
	db := model.GetUserDBInstance().GetDB()

	var user model.UserInfo

	db.Where(model.UserInfo{Username: req.Userid}).First(&user)
	if user.ID == 0 {
		db.Where(model.UserInfo{Email: req.Userid}).First(&user)
	}
	if user.ID == 0 {
		db.Where(model.UserInfo{PhoneNumber: req.Userid}).First(&user)
	}

	if user.ID == 0 {
		c.JSON(200, gin.H{
			"status": -1,
			"errmsg": "User not found",
		})
		return
	}

	if !checkHash(req.Password, user.Password) {
		c.JSON(200, gin.H{
			"status": -1,
			"errmsg": "Invalid password",
		})
		return
	} else {
		r := &model.UserBasicInfo{
			ID:             user.ID,
			DisplayName:    user.DisplayName,
			PrivilegeLevel: user.PrivilegeLevel,
			Role:           user.Role,
			Locale:         user.Locale,
		}
		j, valid := c.Get("jwt")
		if !valid {
			c.JSON(200, gin.H{
				"status": -1,
				"errmsg": "JWT Service not start",
			})
			return
		}
		jwtservice := j.(*jwt.JWT)

		claims := jwt.NewTokenClaims(r.ID, r.DisplayName, r.PrivilegeLevel)
		r.Token, _ = jwtservice.GenerateToken(claims)
		session := sessions.Default(c)
		session.Set("userinfo", *r)
		session.Save()
		c.JSON(200, gin.H{
			"status": 1,
			"data":   r,
		})
	}
}

func IsAuthenticated(c *gin.Context) {
	j, valid := c.Get("jwt")
	if !valid {
		c.JSON(200, gin.H{
			"status": -1,
			"errmsg": "JWT Service not start",
		})
		return
	}
	jwtservice := j.(*jwt.JWT)
	//fetch userinfo from session
	session := sessions.Default(c)
	v := session.Get("userinfo")
	if v != nil {
		c.Next()
		return
	} else {
		//check token
		authorization := c.Request.Header.Get("Authorization")
		if authorization == "" {
			c.AbortWithStatusJSON(401, gin.H{
				"status": -1,
				"errmsg": "invalid session/token ",
			})
			c.Abort()
			return
		}
		sp := strings.Split(authorization, "Bearer ")
		// invalid token
		if len(sp) < 1 {
			c.AbortWithStatusJSON(401, gin.H{
				"status": -1,
				"errmsg": "invalid token",
			})
			c.Abort()
			return
		}
		claim, errTokenParse := jwtservice.ParseToken(sp[1])
		if errTokenParse != nil {
			c.AbortWithStatusJSON(401, gin.H{
				"status": -1,
				"errmsg": fmt.Sprintf("Invalid Token %+v", errTokenParse),
			})
			return
		}
		//fetch user by id and set session
		db := model.GetUserDBInstance().GetDB()
		var user model.UserInfo
		db.Where(model.UserInfo{ID: claim.ID}).First(&user)
		if user.ID == 0 {
			c.AbortWithStatusJSON(401, gin.H{
				"status": -1,
				"errmsg": "invalid token",
			})
			return
		}
		r := &model.UserBasicInfo{
			ID:             user.ID,
			DisplayName:    user.DisplayName,
			PrivilegeLevel: user.PrivilegeLevel,
			Role:           user.Role,
			Locale:         user.Locale,
		}
		session.Set("userinfo", *r)
		session.Save()
		c.Next()
		return
	}
}

func generateToken(c *gin.Context) {
	j, valid := c.Get("jwt")
	if !valid {
		c.JSON(200, gin.H{
			"status": -1,
			"errmsg": "JWT Service not start",
		})
		return
	}
	jwtservice := j.(*jwt.JWT)
	session := sessions.Default(c)
	v := session.Get("userinfo")
	if v == nil {
		c.JSON(200, gin.H{
			"status": -1,
			"errmsg": "server internal error during generate token",
		})
		return
	} else {
		r := v.(model.UserBasicInfo)
		claims := jwt.NewTokenClaims(r.ID, r.DisplayName, r.PrivilegeLevel)
		r.Token, _ = jwtservice.GenerateToken(claims)
		session.Set("userinfo", r)
		session.Save()
		c.JSON(200, gin.H{
			"status": 1,
			"data":   r,
		})
		return
	}
}

func logout(c *gin.Context) {
	c.JSON(200, gin.H{
		"status": 1,
	})
}

type registerForm struct {
	Username    string
	Email       string
	PhoneNumber string
	Prefix      string
	Password    string
}

func register(c *gin.Context) {
	req := new(registerForm)
	e := c.BindJSON(&req)
	if e != nil {
		c.JSON(200, gin.H{
			"status": -1,
			"errmsg": "invalid access",
		})
		return
	}
	db := model.GetUserDBInstance().GetDB()

	var user model.UserInfo

	db.Where("username = ? OR email = ? OR phone_number = ?", req.Username, req.Username, req.Username).First(&user)
	if user.ID != 0 {
		c.JSON(200, gin.H{
			"status": -1,
			"errmsg": "Username has been registered",
		})
		return
	}
	db.Where("username = ? OR email = ? OR phone_number = ?", req.Email, req.Email, req.Email).First(&user)

	if user.ID != 0 {
		c.JSON(200, gin.H{
			"status": -1,
			"errmsg": "Email has been registered",
		})
		return
	}
	db.Where("username = ? OR email = ? OR phone_number = ?", req.PhoneNumber, req.PhoneNumber, req.PhoneNumber).First(&user)
	if user.ID != 0 {
		c.JSON(200, gin.H{
			"status": -1,
			"errmsg": "Phone Number has been registered",
		})
		return
	}

	u := &model.UserInfo{
		Username:       req.Username,
		PhoneNumber:    req.PhoneNumber,
		DisplayName:    req.Username,
		Email:          req.Email,
		PrivilegeLevel: 1,
		Role:           "viewer",
		Locale:         "en",
		Token:          "",
	}
	u.Password, _ = hash(req.Password)
	db.Create(u)
	c.JSON(200, gin.H{
		"status": 1,
	})
}
