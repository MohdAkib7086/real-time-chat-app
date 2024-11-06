import { jwtDecode } from "jwt-decode";
const authState={
    loading:true,
    authenticate:false,
    error:"",
    successMessage:'',
    myInfo:''
}

const tokenDecode=(token)=>{
    const tokenDecoded=jwtDecode(token);
    const expTime=new Date(tokenDecoded.exp*1000);
    if(new Date() >expTime){
        return null;
    }else{
        return tokenDecoded;
    }
}

const getToken=localStorage.getItem('authToken');
if(getToken){
    const getInfo=tokenDecode(getToken);
    if(getInfo){
        authState.myInfo=getInfo;
        authState.authenticate=true;
        authState.loading=false;
    }
}
export const authRedcuer=(state=authState,actions)=>{
    const {payload,type}=actions;
    if(type ==="REGISTER_FAIL" || type==="LOGIN_FAIL"){
        return {
            ...state,
            error:payload.error,
            authenticate:false,
            myInfo:'',
            loading:true
        }
    }
    if(type ==="REGISTER_SUCCESS" || type ==="LOGIN_SUCCESS"){
        const myInfo=tokenDecode(payload.token)
        return {
            ...state,
            myInfo:myInfo,
            successMessage:payload.successMessage,
            error:'',
            authenticate:true,
            loading:false
        }
    }

    if(type==="SUCCESS_MESSAGE_CLEAR"){
        return{
            ...state,
            successMessage:""
        }
    }
    if(type==="ERROR_CLEAR"){
        return{
            ...state,
            error:""
        }
    }

    if(type==="LOGOUT_SUCCESS"){
        return {
            ...state,
            authenticate:false,
            myInfo:'',
            successMessage:"Logout Successfull"

        }
    }

    return state;
}