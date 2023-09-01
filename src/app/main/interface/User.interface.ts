export interface User {
  uid: number,
  name: string,
  avatar: string,
  email: string,
  twoFactorAuth: boolean,
  status: string,
  rating: number,
  custom_wins: number,
  custom_losses: number,
  ladder_wins: number,
  ladder_losses: number,
}