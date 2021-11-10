export interface IAuthService {
  login(payload: { email: string; password: string }): any;
  registration(payload: {
    email: string;
    password: string;
    username: string;
  }): any;
  getCurrentUser(): any;
}
