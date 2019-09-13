package web

import (
	"fmt"
	"log"
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

// Serve lauches the http server and serves the website content
func Serve() error {
	log.Println("Launching server on port :8080")
	return http.ListenAndServe(":8080", http.HandlerFunc(handleRequest))
}
