import { AxiosResponse } from "axios";
import { config as globalConfig } from "../../config";
import { axiosRequest } from "../../utils/axiosRequest";
import { requestDecorator } from "../../utils/requestDecorator";
import { PlotsArrayType } from "../PlotsService/types";
import {
  ConfigurableQueueFieldsType,
  QueuesArrayType,
  QueueType,
} from "./types";

class PlotsService {
  readonly url: string;

  constructor(config: typeof globalConfig) {
    this.url = config.serverUrl;
  }

  @requestDecorator()
  public async getAllPlotsQueue(): Promise<QueuesArrayType> {
    const { data }: AxiosResponse<QueuesArrayType> = await axiosRequest({
      url: this.url + "/plot/queue/",
      headers: { authorization: true },
    });
    return data;
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
    const plotsAmount = Number(fields.plotsAmount);
    const { data }: AxiosResponse<QueueType> = await axiosRequest({
      url: this.url + "/plot/queue",
      method: "POST",
      data: { ...fields, serverId, plotsAmount },
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

  @requestDecorator()
  public async pausePlotQueue(id: string): Promise<QueueType> {
    const { data }: AxiosResponse<QueueType> = await axiosRequest({
      url: this.url + "/plot/queue/" + id + "/pause/",
      method: "POST",
      headers: { authorization: true },
    });
    return data;
  }

  @requestDecorator()
  public async restartPlotQueue(id: string): Promise<QueueType> {
    const { data }: AxiosResponse<QueueType> = await axiosRequest({
      url: this.url + "/plot/queue/" + id + "/restart/",
      method: "POST",
      headers: { authorization: true },
    });
    return data;
  }
}

export default new PlotsService(globalConfig);
