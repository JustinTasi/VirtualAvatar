import API from '../../system/API';
import { Response } from '@/system/Request.type';

const loginAPI = {
  'login': (account: string, password: string): Promise<Response<any>> =>
    API.post('/login', { 'params': { account, password } }),

  'logout': (): Promise<Response<any>> =>
    API.get('/logout'),
};

export default loginAPI;