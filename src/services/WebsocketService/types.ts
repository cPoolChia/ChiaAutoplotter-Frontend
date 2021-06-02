export interface LogsType {
  clock: number;
  data: null | DataSuccessType | DataErrorType;
  state: "PENDING" | "UPDATE" | "SUCCESS";
  timestamp: number;
  uuid: string;
}

export interface PlotQueuesLogsType {
  error: string;
  output: string;
}

export type DataSuccessType = {
  console: Array<{
    command: string;
    stdout: string;
    time: number;
  }>;
  info: string;
};

export type DataErrorType = {
  error: string;
  type: string;
};
