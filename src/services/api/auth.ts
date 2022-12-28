import AxiosService from '@/services/utils/axios.http';

export default class APIAuthService extends AxiosService {
  login(provider: string, code: string) {
    return this.requestPost({
      url: 'https://api.stylec.co.kr:4886/v1/auth/login',
      body: {
        provider,
        code,
      },
    });
  }
}
