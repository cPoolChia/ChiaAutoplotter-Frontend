export const config = {
  serverUrl:
    process.env.NODE_ENV !== "production"
      ? "http://127.0.0.1:8000"
      : "https://api.efullmakt.io",
};
