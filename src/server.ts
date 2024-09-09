import http from "node:http";

const PORT = 8080;
function handleRequest(request, response) {
  console.log(request.headers);
  response.end("It Works!! Path Hit: " + request.url);
}

const server = http.createServer(handleRequest);

export const initServer = () => {
  server.listen(PORT, function () {
    console.log("Server listening on:", PORT);
  });
};
