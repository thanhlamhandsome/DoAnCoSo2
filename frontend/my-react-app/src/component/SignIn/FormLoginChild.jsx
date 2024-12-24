import React from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-router-dom";
import { json, Link, redirect, useNavigation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import HiddenDiv from "../Root/HiddenDiv";
import { uiAction } from "../../store/ui-slice";
const FormLoginChild = ({onForgetPassword}) => {
  const isVisible = useSelector((state)=> state.ui.showHiddenDiv);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigation = useNavigation(); 
  const submiting = navigation.state ==='submitting';
  
  async function handleSubmitForm(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");
    const formData = { email, password };
    const response = await fetch("http://localhost:3000/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const resData = await response.json();
    console.log(typeof resData.user)
    console.log(resData.message)
    if (!response.ok) {
      return   dispatch(uiAction.setShowHiddenDiv({status : 'error',message: resData.message }))
    }
    const userJsonString = JSON.stringify(resData.user);
    localStorage.setItem('authennicateUser',true);
    localStorage.setItem('user', userJsonString);

    localStorage.setItem("token", resData.token);
    const experation = new Date(); 
    experation.setHours(experation.getHours()+1); 
    
    localStorage.setItem('expiration', experation.toISOString());
    return  navigate("/");
  }
  return (
    
<>
   {isVisible && <HiddenDiv />}
    <StyledWrapper>
      <Form method="post" onSubmit={handleSubmitForm} className="form">
        <span className="input-span">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input type="email" name="email" id="email" />
        </span>
        <span className="input-span">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input type="password" name="password" id="password" />
        </span>
        <span className="span">
        <a role="button" onClick={onForgetPassword}>Forgot password?</a>

        </span>
        <input className="submit" type="submit" value={submiting?'Submiting...':'Log in'} />
        <span className="span">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </span>
      </Form>
    </StyledWrapper>
    </>
  );
};

const StyledWrapper = styled.div`
  .form {
    --bg-light: #efefef;
    --bg-dark: #707070;
    --clr: #58bc82;
    --clr-alpha: #9c9c9c60;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 100%;
    max-width: 300px;
    margin-left: 40px;
  }

  .form .input-span {
    width: 100%;
    display: flex;
  
    flex-direction: column;
    gap: 0.5rem;
  }

  .form input[type="email"],
  .form input[type="password"] {
    border-radius: 0.5rem;
    padding: 1rem 0.75rem;
    width: 100%;
    border: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: var(--clr-alpha);
    color: white;
    outline: 2px solid var(--bg-dark);
    
  }

  .form input[type="email"]:focus,
  .form input[type="password"]:focus {
    outline: 2px solid var(--clr);
  }

  .label {
    align-self: flex-start;
    color: var(--clr);
    font-weight: 600;
  }

  .form .submit {
    padding: 1rem 0.75rem;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 3rem;
    background-color: var(--bg-dark);
    color: var(--bg-light);
    border: none;
    cursor: pointer;
  
    transition: all 300ms;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .form .submit:hover {
    background-color: var(--clr);
    color: var(--bg-dark);
  }

  .span {
    text-decoration: none;
    color: var(--bg-dark);
  }

  .span a {
    color: var(--clr);
  }
`;

export default FormLoginChild;
