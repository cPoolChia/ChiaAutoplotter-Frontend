import { config as globalConfig } from "../../config";
import AuthService from "../AuthService";

class WebsocketService {
  private readonly url: string;

  constructor(config: typeof globalConfig) {
    this.url = config.websocketUrl;
  }

  public websocketFactory(
    url: string,
    // auth: boolean = false,
    query?: { [key: string]: string }
  ) {
    let params: string = "?";
    // if (auth) {
    //   const token = AuthService.getJwtTokenFromStorage();
    //   if (token) {
    //     params += `token=${token}&`;
    //   } else {
    //     throw new Error("Not authorized");
    //   }
    // }
    try {
      if (query) {
        Object.entries(query).map(([key, value]) => {
          params += `${key}=${value}&`;
          return false;
        });
      }
      const socket = new WebSocket(`${this.url}${url}${params}`);
      return socket;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new WebsocketService(globalConfig);
