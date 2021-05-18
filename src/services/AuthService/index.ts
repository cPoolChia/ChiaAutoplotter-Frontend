import { AxiosResponse } from "axios";
import { config as globalConfig } from "../../config";
import { GetJwtTokenType } from "./types";
import { axiosRequest } from "../../utils/axiosRequest";
import { JWT_TOKEN_STORAGE_KEY, JWT_TOKEN_REFRESH_TIME } from "../../constants";
import { requestDecorator } from "../../utils/requestDecorator";

class AuthService {
  readonly url: string;
  private storage: string = localStorage.getItem("storage") || "sessionStorage";
  private interval: NodeJS.Timeout | null = null;

  constructor(config: typeof globalConfig) {
    this.url = config.serverUrl;
  }

  private setStorage(storage: string): void {
    localStorage.setItem("storage", storage);
    this.storage = storage;
  }

  public getStorage(): Storage {
    return this.storage === "localStorage" ? localStorage : sessionStorage;
  }

  private setJwtTokenToStorage(jwt: string): void {
    this.getStorage().setItem(JWT_TOKEN_STORAGE_KEY, jwt);
  }

  private startRefreshTokenInterval(): void {
    this.interval = setInterval(() => {
      this.updateJwtToken();
    }, JWT_TOKEN_REFRESH_TIME);
  }

  public getJwtTokenFromStorage(): string | null {
    return this.getStorage().getItem(JWT_TOKEN_STORAGE_KEY);
  }

  @requestDecorator()
  public async login(
    input: string,
    password: string,
    shouldBeStoredInLocalStorage: boolean
  ): Promise<string | Error> {
    if (shouldBeStoredInLocalStorage) {
      this.setStorage("localStorage");
    }

    const params = new URLSearchParams();
    params.append("username", input);
    params.append("password", password);

    const { data }: AxiosResponse<GetJwtTokenType> = await axiosRequest({
      url: this.url + "/login/access-token",
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: params,
    });

    this.setJwtTokenToStorage(data.access_token);
    this.startRefreshTokenInterval();

    return data.access_token;
  }

  // public async passwordRecovery(input: string): Promise<void | Error> {
  //   await axiosRequest({
  //     url: this.url + "/login/password-recovery/" + input,
  //     method: "POST",
  //   });
  // }

  // public async changePasswordFromRecovery(
  //   token: string,
  //   newPassword: string
  // ): Promise<any | Error> {
  //   const { data } = await axiosRequest({
  //     url: this.url + "/login/reset-password/",
  //     method: "POST",
  //     data: { token, new_password: newPassword },
  //   });

  //   return data;
  // }

  @requestDecorator()
  public async updateJwtToken(): Promise<void> {
    const { data }: AxiosResponse<GetJwtTokenType> = await axiosRequest({
      url: this.url + "/login/access-token",
      method: "PUT",
      headers: { authorization: true },
    });

    this.setJwtTokenToStorage(data.access_token);
  }

  @requestDecorator()
  public async logout(): Promise<void> {
    sessionStorage.clear();
    localStorage.clear();
    if (this.interval) clearTimeout(this.interval);
  }
}

export default new AuthService(globalConfig);
