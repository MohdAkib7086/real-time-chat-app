import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../static/style/components/register.scss"
import {useDispatch,useSelector} from "react-redux";
import { userRegister } from "../store/actions/authAction";
const Register = () => {
    const dispatch=useDispatch();
    const {loading,authenticate,error,successMessage,myInfo}=useSelector(state=>state.auth);
    const navigate=useNavigate();
    const [state,setState]=useState({
        userName:'',
        email:'',
        password:'',
        confirmPassword:'',
        image:''
    })
    const [loadImage,setLoadImage]=useState('');
    const inputHandle=(e)=>{
        console.log(e);
       setState({
        ...state,
        [e.target.name]:e.target.value
       })    
    }

    const imageHandle = e =>{
      if(e.target.files.length !==0){
        setState({
                ...state,
                [e.target.name] : e.target.files[0]
           })
      }

      const reader = new FileReader();
      reader.onload = () => {
           setLoadImage(reader.result);
      }
      reader.readAsDataURL(e.target.files[0]);
 }


    const submit=e=>{
        console.log(state);
        const {userName,email,password,confirmPassword,image}=state;
        e.preventDefault();

        const formData=new FormData();

        formData.append('userName',userName);
        formData.append('email',email);
        formData.append('password',password);
        formData.append('confirmPassword',confirmPassword);
        formData.append('image',image);
        dispatch(userRegister(formData));          
    }
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
    },[successMessage,error])
  return (
    <div className="register">
      <div className="container">
        <div className="header">
          <h2>Register</h2>
        </div>
        <div className="body">
          <form onSubmit={submit}>
            <div className="form-field">
              <label htmlFor="userName">User Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="User Name"
                id="userName"
                autoComplete="off"
                onChange={inputHandle}
                name="userName"
                value={state.userName}
              />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="User Email"
                id="email"
                autoComplete="off"
                onChange={inputHandle}
                name="email"
                value={state.email}
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
                onChange={inputHandle}
                name="password"
                value={state.password}
              />
            </div>
            <div className="form-field">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                id="confirmPassword"
                onChange={inputHandle}
                name="confirmPassword"
                value={state.confirmPassword}
              />
            </div>
            <div className="form-field">
              <div className="upload">
                <div className="image">
                    {loadImage ? <img src={loadImage}/> :''}
                </div>
                <div className="file">
                  <label htmlFor="image">Select image</label>
                  <input type="file" className="form-control"
                   onChange={imageHandle}
                   name="image"
                //    value={state.image}
                   id="image"
                  />
                </div>
              </div>
            </div>

            <div className="form-field">
              <input type="submit" value={"Register"} onClick={submit} className="btn" />
            </div>
            <div className="form-field">
              <span>
                <Link to={"/login"}>Login your account</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
