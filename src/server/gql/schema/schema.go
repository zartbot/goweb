//Package schema used "go-bindata" to convert *.graphql file under this directory
//to a package string. The following "go:generate" line is a notation for go generate
//PLEASE DONOT EDIT THIS FILE.
//
//go:generate go-bindata -ignore=\.go -pkg=schema -o=bindata.go ./...
package schema

import "bytes"

func GetSchema() string {
	buf := bytes.Buffer{}
	for _, name := range AssetNames() {
		b := MustAsset(name)
		buf.Write(b)
		if len(b) > 0 && b[len(b)-1] != '\n' {
			buf.WriteByte('\n')
		}
	}
	return buf.String()
}
