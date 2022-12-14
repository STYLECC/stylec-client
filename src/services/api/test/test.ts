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
      url: 'https://jsonplaceholder.typicode.com/posts?_page=${1}&_limit=10',
      config: {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      },
    });
  }
}
