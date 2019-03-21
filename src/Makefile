GOCMD=go
GOBUILD=$(GOCMD) build
GOCLEAN=$(GOCMD) clean
GOTEST=$(GOCMD) test
GOGET=$(GOCMD) get
GOARMBUILD=/opt/golang/gosrc/goarm/bin/go build
#LDFLAGS = -s -w
#ld flags -s -w is used to remove symbolink from package
BINARY_NAME=web
BINARY_PATH=../build
CONFIG_PATH=../config
WEB_PATH= ../dist


all: build
build:  linux mac win rpi
test:
	$(GOTEST) -v ./...
clean:
	$(GOCLEAN)
	rm -rf $(BINARY_PATH)
	mkdir -p $(BINARY_PATH)
	cp -r $(CONFIG_PATH) $(BINARY_PATH)
	cp -r $(WEB_PATH) $(BINARY_PATH)
schema:
	go generate ./server/gql/schema
run:
	$(GOBUILD) -o $(BINARY_NAME) -v ./...
	./$(BINARY_NAME)
deps:
	$(GOGET) -u -v  github.com/zartbot/goweb

linux:  schema ; $(info >> Starting build linux package...)
	GOOS=linux GOARCH=amd64 $(GOBUILD) -ldflags="$(LDFLAGS)" -o $(BINARY_PATH)/$(BINARY_NAME)_linux -v

mac:    schema ; $(info >> Starting build mac package...)
	GOOS=darwin GOARCH=amd64 $(GOBUILD) -ldflags="$(LDFLAGS)" -o $(BINARY_PATH)/$(BINARY_NAME)_mac -v

win:    schema ; $(info >> Starting build windows package...)
	GOOS=windows GOARCH=amd64 $(GOBUILD) -ldflags="$(LDFLAGS)" -o $(BINARY_PATH)/$(BINARY_NAME)_win.exe -v

rpi:    schema ; $(info >> Starting build rpi package...)
	GOOS=linux GOARCH=arm $(GOBUILD) -ldflags="$(LDFLAGS)" -o $(BINARY_PATH)/$(BINARY_NAME)_rpi -v
