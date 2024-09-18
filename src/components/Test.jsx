import openAIAPI from '../../services/OpenAIAPI'


export default function Test() {
  const message = 'Hi, this is test'


  const handleSendMessage = async (message) => {
    if(message) {
      const response = await openAIAPI.sendMessageToOpenAi(message)
      console.log(response);
    }
  }

  return(
    <>
      <button className={"cursor-pointer bg-slate-400 text-white p-2"} onClick={() => handleSendMessage(message)}>測試用按鈕</button>
    </>
  );
}