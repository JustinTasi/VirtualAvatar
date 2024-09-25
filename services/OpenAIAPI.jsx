import API from './fetchUtil';

const BASE_URL = "medicament/api"
const openAIAPI = {
  'sendMessageToOpenAi': (data) =>
    API.postAPI(`${BASE_URL}/openAi`, data),
}

export default openAIAPI;