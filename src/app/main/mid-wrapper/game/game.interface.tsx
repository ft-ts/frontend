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
  matchInfo_loser_id : string,
  matchInfo_loser_score : number,
  matchInfo_match_type : string,
  matchInfo_timestamp : Date,
  matchInfo_winner_id : string,
  matchInfo_winner_score : number,
}

export interface historyInterface {
  history : historyDto[],
}