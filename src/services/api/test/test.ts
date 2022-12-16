/**
 * API User Service
 * Deokin 2019.01.25
 * */

import AxiosService from '@/services/utils/AxiosService';

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
      url: 'https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10',
      config: {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      },
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
      config: {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      },
    });
  }
}
