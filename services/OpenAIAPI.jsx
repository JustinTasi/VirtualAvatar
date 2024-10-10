import API from './fetchUtil';

const BASE_URL = "medicament/api"
const openAIAPI = {
  'chatWithOpenAi': (message) =>
    API.postAPI(`${BASE_URL}/chatWithOpenAi`, message),

  'sendUncomfortableMessage': (message) =>
    API.postAPI(`${BASE_URL}/sendMessage`, message),

  'getLineId': () =>
    API.postAPI(`${BASE_URL}/openAi`),
}

export default openAIAPI;