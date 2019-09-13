package web

import (
	"fmt"
	"net/http"
)

const (
	webpath = "../../web"
	webdir  = http.Dir(webpath)
)

func handleRequest(resp http.ResponseWriter, req *http.Request) {
	path := req.URL.Path
	file, err := webdir.Open(path)

	if err != nil {
		switch {
		case req.URL.Path == "/":
			path = "index.html"
		case req.URL.Path == "/rules" || req.URL.Path == "/play":
			path += ".html"
		}

		file, err = webdir.Open(path)

		if err != nil {
			http.NotFound(resp, req)
			return
		}
	}

	stat, err := file.Stat()
	if err != nil {
		headers := resp.Header()
		headers.Set("Content-Length", fmt.Sprintf("%d(MISSING)", stat.Size()))
		// headers.Set("Content-Type", mime.TypeByExtension(strings.ToLower(stat.Ext(val))))
	}

	http.ServeFile(resp, req, webpath+path)
}

// Setup configures the web server to serve the static html and assets files
func Setup() {
	http.HandleFunc("/", handleRequest)
}
