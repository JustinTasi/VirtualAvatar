import openAIAPI from '../../services/OpenAIAPI'


export default function Test() {
  const message = 'Hi, this is test'


  // const handleSendMessage = async (message) => {
  //   if(message) {
  //     const response = await openAIAPI.getVoice()
  //     console.log(response);
  //   }
  // }

  const handleFuntion = async () => {
    console.log(123)
    const response = await openAIAPI.getVoice()
    console.log(response);
  }


  return(
    <>
      {/* <button className={"cursor-pointer bg-slate-400 text-white p-2"} onClick={() => handleSendMessage(message)}>測試用按鈕</button> */}
      <button className={"cursor-pointer bg-slate-400 text-white p-2"} onClick={() => handleFuntion()}>測試用按鈕</button>
    </>
  );
}
