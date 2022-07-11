from http.server import BaseHTTPRequestHandler, HTTPServer
import signal

signal.signal(signal.SIGINT, signal.SIG_DFL)


class Counter:
    count = 0


class App(BaseHTTPRequestHandler):
    def do_GET(self):
        if(self.path == '/'):
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            Counter.count += 1
            self.wfile.write(bytes("Count: {}".format(Counter.count), "utf-8"))


if __name__ == "__main__":
    webServer = HTTPServer(("localhost", 8002), App)

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
