import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { userLogin } from '../store/actions/authAction';
import { useKeycloak } from "@react-keycloak/web";

const Login = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const { keycloak, initialized } = useKeycloak();

  const {loading,authenticate,error,successMessage,myInfo}=useSelector(state=>state.auth);

  const [state,setState]=useState({
    email:'',
    password:''
  })

  const inputHandle = (e) => {
    console.log(e);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const submit=(e)=>{
    const {email,password}=state;
        e.preventDefault();

        const formData=new FormData();
        formData.append('email',email);
        formData.append('password',password);
        dispatch(userLogin(formData)); 
  };
  useEffect(()=>{
    if(authenticate){
      navigate('/');
    }
    if(successMessage){
      alert(successMessage)
      dispatch({type:"SUCCESS_MESSAGE_CLEAR"});
    }
    if(error){
      alert(error)
      dispatch({type:"ERROR_CLEAR"});
    }
  },[successMessage,error]);
  return (
    <div className="register">
      <div className="container">
        <div className="header">
          <h2>Login</h2>
        </div>
        <div className="body">
          <form onSubmit={submit}>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="User Email"
                id="email"
                name='email'
                autoComplete="off"
                value={state.email}
                onChange={inputHandle}
              />
            </div>
            <div className="form-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                id="password"
                autoComplete="off"
                name='password'
                value={state.password}
                onChange={inputHandle}
              />
            </div>
            <div className="form-field">
              <input type="submit" value={"Login"} className="btn" />
            </div>
            <div className="form-field">
              <span>
                <Link to={"/register"}>Create Account</Link>
              </span>
            </div>
            <div className="form-field">
              <span>
                {/* <Link to={"/register"}>Create Account</Link> */}
                {!keycloak.authenticated && (
                   <button
                     type="button"
                     className="text-blue-800"
                     onClick={() => keycloak.login()}
                   >
                     Login keycloak
                   </button>
                 )}
              </span>
            </div>
            <div className="form-field">
              <span>
                {/* <Link to={"/register"}>Create Account</Link> */}
                {keycloak.authenticated && (
                   <button
                     type="button"
                     className="text-blue-800"
                     onClick={() => keycloak.logout()}
                   >
                     Logout keycloak
                   </button>
                 )}
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login