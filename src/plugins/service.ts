/**
 * 필요한 API Service만 주입 후 사용하면 됨.
 * */

import APITestService from '@/services/api/test/test';
import AxiosService from '@/services/utils/AxiosService';

const aartServices = {
  api: {
    http: new AxiosService(),
    test: new APITestService(),
  },
};

export default aartServices;
