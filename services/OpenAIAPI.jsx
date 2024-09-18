import API from './API'


const BASE_URL = "medicament/api"

const openAIAPI = {
  'sendMessageToOpenAi': (data) =>
    API.post(`${BASE_URL}/openAi`, data),
}

export default openAIAPI;