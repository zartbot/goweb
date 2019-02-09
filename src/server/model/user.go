package model

import (
	"sync"
	"time"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	"github.com/sirupsen/logrus"
)

type UserDBConnectPool struct {
}

var userdb *gorm.DB
var err_userdb error
var userdbInstance *UserDBConnectPool
var userdbOnce sync.Once

func GetUserDBInstance() *UserDBConnectPool {
	userdbOnce.Do(func() {
		userdbInstance = &UserDBConnectPool{}
	})
	return userdbInstance
}

func (u *UserDBConnectPool) Init(path string) bool {
	userdb, err_userdb = gorm.Open("sqlite3", path)
	if err_userdb != nil {
		logrus.Fatal(err_userdb)
		return false
	}
	userdb.AutoMigrate(&UserInfo{})
	return true
}

func (u *UserDBConnectPool) GetDB() *gorm.DB {
	return userdb
}

type UserInfo struct {
	ID             uint   `gorm:"primary_key"`
	Username       string `json:"username"`
	DisplayName    string `json:"displayname"`
	PhoneNumber    string `json:"phonenumber"`
	Email          string `json:"email"`
	Password       string `json:"password"`
	PrivilegeLevel int16  `json:"privilegeLevel"`
	Locale         string `json:"locale"`
	Token          string `json:"token"`
	Role           string `json:"role"`
	CreateAt       time.Time
	UpdatedAt      time.Time
	DeletedAt      *time.Time
	LastLogin      time.Time
}

type UserBasicInfo struct {
	ID             uint   `json:"uid"`
	DisplayName    string `json:"displayname"`
	PrivilegeLevel int16  `json:"privilegeLevel"`
	Locale         string `json:"locale"`
	Token          string `json:"token"`
	Role           string `json:"role"`
}
