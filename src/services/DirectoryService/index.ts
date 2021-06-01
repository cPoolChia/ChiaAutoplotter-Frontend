import { AxiosResponse } from "axios";
import { config as globalConfig } from "../../config";
import { DirectoryArrayType, DirectoryType } from "../DirectoryService/types";
import { axiosRequest } from "../../utils/axiosRequest";
import { requestDecorator } from "../../utils/requestDecorator";
import { PlotsArrayType, QueuesArrayType } from "../PlotsService/types";

class ServerService {
  readonly url: string;

  constructor(config: typeof globalConfig) {
    this.url = config.serverUrl;
  }

  @requestDecorator()
  public async getAllDirectories(): Promise<DirectoryArrayType> {
    const { data }: AxiosResponse<DirectoryArrayType> = await axiosRequest({
      url: this.url + "/directory/",
      headers: { authorization: true },
    });
    return data;
  }

  @requestDecorator()
  public async getDirectoryData(id: string): Promise<DirectoryType> {
    const { data }: AxiosResponse<DirectoryType> = await axiosRequest({
      url: this.url + "/directory/" + id,
      headers: { authorization: true },
    });
    return data;
  }

  @requestDecorator()
  public async deleteDirectory(id: string): Promise<DirectoryType> {
    const { data }: AxiosResponse<DirectoryType> = await axiosRequest({
      url: this.url + "/directory/" + id,
      method: "DELETE",
      headers: { authorization: true },
    });
    return data;
  }

  @requestDecorator()
  public async getDirectoryPlots(id: string): Promise<PlotsArrayType> {
    const { data }: AxiosResponse<PlotsArrayType> = await axiosRequest({
      url: this.url + "/directory/" + id + "/plots/",
      headers: { authorization: true },
    });
    return data;
  }

  @requestDecorator()
  public async getDirectoryQueues(id: string): Promise<QueuesArrayType> {
    const { data }: AxiosResponse<QueuesArrayType> = await axiosRequest({
      url: this.url + "/directory/" + id + "/queues/",
      headers: { authorization: true },
    });
    return data;
  }
}

export default new ServerService(globalConfig);
