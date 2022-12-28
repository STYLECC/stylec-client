// 필요한 API Service만 주입 후 사용하면 됨.

import APITestService from '@/services/api/test';
import AxiosHttpService from '@/services/utils/axios.http';
import APIAuthService from '../api/auth';

const aartServices = {
  api: {
    http: new AxiosHttpService(),
    test: new APITestService(),
    auth: new APIAuthService(),
  },
};

export default aartServices;
