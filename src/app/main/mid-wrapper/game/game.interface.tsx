export interface ballDto {
  width: number;
  height: number;
  x: number;
  y: number;
  type: string;
}

export interface paddleDto {
  width: number;
  height: number;
  x: number;
  y: number;
  type: string;
  score: number;
}

export interface HookFormTypes {
  name : string,
}

export interface historyDto {
  id : number,
  home : string,
  home_score : number,
  away : string,
  away_score : number,
  match_type : string,
  start_date : Date,
}

export interface historyInterface {
  history : historyDto[],
}