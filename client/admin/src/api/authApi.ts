import { axiosInstance } from './axiosInstance.ts';

export interface IAuthParam {
  username: string;
  password: string;
  rememberMe: boolean;
}

class AuthApi {
  async login(body: IAuthParam): Promise<void> {
    await axiosInstance.post('/Auth/login', body);
  }
}

export const authApi = new AuthApi();
