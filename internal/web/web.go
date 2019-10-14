package web

import (
	"fmt"
	"mime"
	"net/http"
	"path/filepath"
	"strings"
)

const (
	webpath = "../../web"
	webdir  = http.Dir(webpath)
)

func handleRequest(resp http.ResponseWriter, req *http.Request) {
	path := strings.TrimRight(req.URL.Path, "/")

	if path == "" {
		path = "/index.html"
	}

	ext := filepath.Ext(path)

	if ext == "" {
		ext = ".html"
		path += ext
	}

	file, err := webdir.Open(path)

	if err != nil {
		http.NotFound(resp, req)
		return
	}

	stat, err := file.Stat()
	if err != nil {
		headers := resp.Header()
		headers.Set("Content-Length", fmt.Sprintf("%d(MISSING)", stat.Size()))
		headers.Set("Content-Type", mime.TypeByExtension(ext))
	}

	http.ServeFile(resp, req, webpath+path)
}

// Setup configures the web server to serve the static html and assets files
func Setup() {
	http.HandleFunc("/", handleRequest)
}
