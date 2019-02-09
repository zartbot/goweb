package config

import (
	"io/ioutil"

	"github.com/sirupsen/logrus"
	yaml "gopkg.in/yaml.v2"
)

type Config struct {
	WEB_SessionSecureKey string `yaml:"web_sess_securekey"`
	WEB_MaxAge           int    `yaml:"web_maxage"`
	HTTPSPort            int    `yaml:"https_port"`
	SSLCert              string `yaml:"ssl_cert"`
	SSLKey               string `yaml:"ssl_key"`
	Verbose              bool   `yaml:"verbose"`
	DevMode              bool   `yaml:"devmode"`
}

func (c *Config) GetConf(filename string) *Config {
	yamlFile, err := ioutil.ReadFile(filename)
	if err != nil {
		logrus.Fatalf("[Error]Config file fetch error, %v", err)
	}
	err = yaml.Unmarshal(yamlFile, c)
	if err != nil {
		logrus.Fatalf("Unmarshal: %v", err)
	}
	return c
}
