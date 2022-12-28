import AxiosService from '@/services/utils/axios.http';

export default class APITestService extends AxiosService {
  /**
   * [블로그]
   * 조회
   * @requestBody   : Object > {  }
   * @responseData  : Object > {  }
   * @return        : Object: Promise
   */
  blogs() {
    return this.requestGet({
      url: 'https://jsonplaceholder.typicode.com/posts',
      params: {
        page: 1,
        limit: 10,
      },
      acToken: this.accessToken,
    });
  }

  blog(id: string) {
    return this.requestGet({
      url: `https://jsonplaceholder.typicode.com/posts/${id}`,
    });
  }

  user() {
    return this.requestGet({
      url: 'https://api.stylec.co.kr:4886/v1/users/naver_96260941/info',
      acToken: this.accessToken,
    });
  }
}
