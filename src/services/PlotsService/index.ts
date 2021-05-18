import { AxiosResponse } from "axios";
import { config as globalConfig } from "../../config";
import { axiosRequest } from "../../utils/axiosRequest";
import { requestDecorator } from "../../utils/requestDecorator";
import { PlotsArrayType } from "../ServerService/types";
import { ConfigurableQueueFieldsType, QueueType } from "./types";

class PlotsService {
  readonly url: string;

  constructor(config: typeof globalConfig) {
    this.url = config.serverUrl;
  }

  @requestDecorator()
  public async getPlotQueueData(id: string): Promise<QueueType> {
    const { data }: AxiosResponse<QueueType> = await axiosRequest({
      url: this.url + "/plot/queue/" + id,
      headers: { authorization: true },
    });
    return data;
  }

  @requestDecorator()
  public async getQueuePlotsData(id: string): Promise<PlotsArrayType> {
    const { data }: AxiosResponse<PlotsArrayType> = await axiosRequest({
      url: this.url + "/plot/queue/" + id + "/plots/",
      headers: { authorization: true },
    });
    return data;
  }

  @requestDecorator()
  public async addPlotQueue(
    serverId: string,
    fields: ConfigurableQueueFieldsType
  ): Promise<QueueType> {
    const { data }: AxiosResponse<QueueType> = await axiosRequest({
      url: this.url + "/plot/queue",
      method: "POST",
      data: { ...fields, server_id: serverId },
      headers: { authorization: true },
    });
    return data;
  }

  @requestDecorator()
  public async updatePlotQueue(
    id: string,
    fields: ConfigurableQueueFieldsType
  ): Promise<QueueType> {
    const { data }: AxiosResponse<QueueType> = await axiosRequest({
      url: this.url + "/plot/queue/" + id,
      method: "PUT",
      data: fields,
      headers: { authorization: true },
    });
    return data;
  }
}

export default new PlotsService(globalConfig);
