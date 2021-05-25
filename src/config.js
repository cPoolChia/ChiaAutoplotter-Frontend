export const config = {
    serverUrl:
        process.env.NODE_ENV !== "production"
            ? "http://127.0.0.1:8000"
            : "https://admin.cpool.farm/api",
    websocketUrl:
        process.env.NODE_ENV !== "production"
            ? "ws://127.0.0.1:8000"
            : "wss://admin.cpool.farm/api",
};
