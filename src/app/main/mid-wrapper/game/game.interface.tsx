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
  matchInfo_id : number,
  matchInfo_home : string,
  matchInfo_home_score : number,
  matchInfo_away : string,
  matchInfo_away_score : number,
  matchInfo_match_type : string,
  matchInfo_start_date : Date,
}

export interface historyInterface {
  history : historyDto[],
}