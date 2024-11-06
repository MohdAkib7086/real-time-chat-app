

const chatState={
    recievers:[],
    chat:[]
}

export const  chatReducer=(state=chatState,action)=>{
    const {type,payload}=action;
    if(type ==="RECIEVER_GET_SUCCESS"){
        return {
            ...state,
            recievers:payload.recievers
        }
    }
    if(type ==="CHAT_GET_SUCCESS"){
        return {
            ...state,
            chat:payload.message
        }
    }
    if(type ==="CHAT_SEND_SUCCESS"){
        return {
            ...state,
            chat:[...state.chat,payload.message]
        }
    }

    if(type ==="SOCKET_CHAT"){
        return {
            ...state,
            chat:[...state.chat,payload.message]
        }
    }
    if(type === 'SEEN_MESSAGE'){
        const index = state.recievers.findIndex(f=>f.fndInfo._id === payload.msgInfo.reseverId || f.fndInfo._id === payload.msgInfo.senderId);
        state.recievers[index].msgInfo.status = 'seen';
       return {
            ...state
       };
   }



    return state;
}

