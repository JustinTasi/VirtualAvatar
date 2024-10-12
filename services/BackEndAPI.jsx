import API from './fetchUtil';

const BASE_URL = "medicament/api"
const BackEndAPI = {
  'getLineVerifyPage': () =>
    API.postAPI('linebot/medicament'),

  'chatWithOpenAi': (message) =>
    API.postAPI(`${BASE_URL}/chatWithOpenAi`, message),

  'sendUncomfortableMessage': (message) =>
    API.postAPI(`${BASE_URL}/sendMessage`, message),

  'getLineId': () =>
    API.postAPI(`${BASE_URL}/getLineToken`),
  
  'getIsFirstTimeUseRecord': () =>
    API.getAPI(`${BASE_URL}/record`),
}

export default BackEndAPI;