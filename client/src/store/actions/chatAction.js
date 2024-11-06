import axios from "axios"

export const getReciever=()=>async(dispatch)=>{
    try{

        const response=await axios.get('/api/chat/get-recievers');
        dispatch({
            type:"RECIEVER_GET_SUCCESS",
            payload:{
                recievers:response.data.recievers
            }
        })
    }catch(error){
        console.log(error.response.data)
    }
}
export const chatSend=(data)=>async(dispatch)=>{
    try{
        const response=await axios.post('/api/chat/send-chat',data);
        console.log(response);
        dispatch({
            type:"CHAT_SEND_SUCCESS",
            payload:{
                message:response.data.message
            }
        })

    }catch(error){
        console.log(error.response.data);
    }
}

export const getChat=(id)=>{
    return async(dispatch)=>{
        try {
            const response=await axios.get(`/api/chat/get-chat/${id}`);
            dispatch({
                type:"CHAT_GET_SUCCESS",
                payload:{
                    message:response.data.message
                }
            })
        } catch(error){
            console.log(error.response.data)
        }
    }
}

export const imageChatSend=(data)=>{
     return async(dispatch)=>{
        const config={
            headers: {
                "Content-Type": `multipart/form-data`,
              },
        }       
         try {
            const response=await axios.post('/api/chat/send-image-chat',data,config);
            dispatch({
                type:"CHAT_SEND_SUCCESS",
                payload:{
                    message:response.data.message
                }
            })
        } catch (error) {
            console.log(error.response.data);
        }
     }
}

export const seenMessage = (msg) => async (dispatch) => {
    try {
      const response = await axios.post("/api/messenger/seen-message", msg);
      console.log(response.data);
    } catch (error) {
      console.log(error.response.message);
    }
  };