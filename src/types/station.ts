export enum StationStatus {
  Active = "Активна",
  Inactive = "Неактивна",
  NotUsed = "Не используется",
  Unknown = "Неизвестно",
}

export interface Station {
  id: string;
  name: string;
  address: string;
  power: number;
  output: number;
  generators: number;
  status: StationStatus;
}
