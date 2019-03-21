let Server_IP = document.location.hostname;

let Server_IP_PORT ;

if (process.env.NODE_ENV !== "production" ) {
    Server_IP_PORT = Server_IP + ":8000";  //Webpack
} else {
    Server_IP_PORT = Server_IP + ":8443";  //production
}

//const HTTP_PROTOCOL = "http";   
//const WEBSOCKET_PROTOCOL = "ws";
const HTTP_PROTOCOL = "https";   
const WEBSOCKET_PROTOCOL = "wss";

let HTTP_URL_HDR = HTTP_PROTOCOL + "://" + Server_IP_PORT ;
let WS_URL_HDR = WEBSOCKET_PROTOCOL + "://"+ Server_IP_PORT;

export default {
    ws_uri_hdr: WS_URL_HDR, 
    login: () => "/auth/login",
    logout: () =>  "/auth/logout",
    updatetoken: () =>  "/auth/token",
    graphql_http: () =>  "/api/graphql",
    graphql_ws: () => WS_URL_HDR + "/api/graphql",
};
  
