import API from './fetchUtil';

const BASE_URL = "medicament/api"
const BackEndAPI = {
  'getUserInfo': (token) =>
    API.postAPI(`${BASE_URL}/verify`, token),
  
  'chatWithOpenAi': (data) =>
    API.postAPI(`${BASE_URL}/chatWithOpenAi`, data),

  'sendUncomfortableMessage': (data) =>
    API.postAPI(`${BASE_URL}/sendUncomfortableMessage`, data),

  'getIsFirstTimeUseRecord': () =>
    API.getAPI(`${BASE_URL}/record`),

  'getHelloUserInfo':(data) =>
    API.postAPI(`${BASE_URL}/hellouser`, data)
}

export default BackEndAPI;