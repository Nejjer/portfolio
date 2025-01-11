import { axiosInstance } from './axiosInstance.ts';

export interface IAuthParam extends IRegisterParam {
  rememberMe: boolean;
}

export interface IRegisterParam {
  username: string;
  password: string;
}

class AuthApi {
  async login(body: IAuthParam): Promise<void> {
    await axiosInstance.post('/Auth/login', body);
  }

  async register(body: IAuthParam): Promise<void> {
    await axiosInstance.post('/Auth/register', body);
  }
}

export const authApi = new AuthApi();
