import API from './API'


const BASE_URL = "medicament/api"

const openAIAPI = {
  'sendMessageToOpenAi': (data) =>
    API.post(`${BASE_URL}/openAi`, data),

  'getVoice': (data) =>
    API.post(`${BASE_URL}/getVoice`, data),

}

export default openAIAPI;