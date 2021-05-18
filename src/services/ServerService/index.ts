import { AxiosResponse } from "axios";
import { config as globalConfig } from "../../config";
import {
  MsgReturnType,
  ServersArrayType,
  ServerType,
  ConfigurableServerFieldsType,
  PlotsArrayType,
} from "./types";
import { axiosRequest } from "../../utils/axiosRequest";
import { requestDecorator } from "../../utils/requestDecorator";
import { QueuesArrayType } from "../PlotsService/types";

class ServerService {
  readonly url: string;

  constructor(config: typeof globalConfig) {
    this.url = config.serverUrl;
  }

  @requestDecorator()
  public async getAllServers(): // limit = 100,
  // offset = 0,
  // sort = "created"
  Promise<ServersArrayType> {
    const { data }: AxiosResponse<ServersArrayType> = await axiosRequest({
      url: this.url + "/server/",
      // params: { limit, offset, sort },
      headers: { authorization: true },
    });
    return data;
  }

  @requestDecorator()
  public async getServer(id: string): Promise<ServerType> {
    const { data }: AxiosResponse<ServerType> = await axiosRequest({
      url: this.url + "/server/" + id,
      headers: { authorization: true },
    });
    return data;
  }

  @requestDecorator()
  public async addServer(
    fields: ConfigurableServerFieldsType
  ): Promise<ServerType> {
    const { data }: AxiosResponse<ServerType> = await axiosRequest({
      url: this.url + "/server/",
      method: "POST",
      data: fields,
      headers: { authorization: true },
    });
    return data;
  }

  @requestDecorator()
  public async updateServer(
    id: string,
    fields: ConfigurableServerFieldsType
  ): Promise<ServerType> {
    const { data }: AxiosResponse<ServerType> = await axiosRequest({
      url: this.url + "/server/" + id,
      method: "PUT",
      data: fields,
      headers: { authorization: true },
    });
    return data;
  }

  @requestDecorator()
  public async deleteServer(id: string): Promise<MsgReturnType> {
    const { data }: AxiosResponse<MsgReturnType> = await axiosRequest({
      url: this.url + "/server/" + id,
      method: "DELETE",
      headers: { authorization: true },
    });
    return data;
  }

  @requestDecorator()
  public async getCreatedPlots(id: string): Promise<PlotsArrayType> {
    const { data }: AxiosResponse<PlotsArrayType> = await axiosRequest({
      url: this.url + "/server/" + id + "/plots/created/",
      headers: { authorization: true },
    });
    return data;
  }

  @requestDecorator()
  public async getLocatedPlots(id: string): Promise<PlotsArrayType> {
    const { data }: AxiosResponse<PlotsArrayType> = await axiosRequest({
      url: this.url + "/server/" + id + "/plots/located/",
      headers: { authorization: true },
    });
    return data;
  }

  @requestDecorator()
  public async getQueues(id: string): Promise<QueuesArrayType> {
    const { data }: AxiosResponse<QueuesArrayType> = await axiosRequest({
      url: this.url + "/server/" + id + "/queues/",
      headers: { authorization: true },
    });
    return data;
  }
}

export default new ServerService(globalConfig);
