import React from 'react';
import styled from 'styled-components';
import { Link, useActionData } from 'react-router-dom';
import { Form, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { uiAction } from '../../store/ui-slice';

const FormSignUp = ({imageUrl}) => {
  
  let data= useActionData();
 console.log(data)
  const dispatch = useDispatch();  
  {data && dispatch(uiAction.setShowHiddenDiv({status: data.status,message: data.message}))}
  const googleAuth = () => {
    // Đảm bảo rằng biến môi trường tồn tại
    const apiUrl = process.env.REACT_APP_API_URL;

    if (apiUrl) {
        window.open(`${apiUrl}/auth/google/callback`, "_self");
    } else {
        console.error("API URL không được cấu hình đúng trong biến môi trường.");
    }
};

  return (
    <StyledWrapper imageUrl={imageUrl}>
      <Form method="post" className="form">
        <p className="title">Register </p>
        <p className="message">Signup now and get full access to our app. </p>
        <div className="flex">
          <label>
            <input required placeholder type="text" className="input" name='name'/>
            <span>Firstname</span>
          </label>
          <label>
            <input required placeholder type="date" className="input" name='birthdate' />
            
          </label>
        </div>  
        <label>
          <input required placeholder type="email" className="input" name='email' />
          <span>Email</span>
        </label> 
        <label>
          <input required placeholder type="password" className="input" name='password' />
          <span>Password</span>
        </label>
        <label>
          <input  required placeholder type="password" className="input" name='confirmPassword' />
          <span>Confirm password</span>
        </label>
        
        <button className="submit">Submit</button>
        <button  onClick={googleAuth}>
						<span className='text-white'>Sing up with Google</span>
					</button>
        <p className="signin">Already have an acount ? <Link to="/login">Signin</Link> </p>
      </Form>
    </StyledWrapper>
  );
}


const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 350px;
    background-image: ${({ imageUrl }) => `url(${imageUrl})`};
    padding: 20px;
    border-radius: 20px;
    position: relative;
  }

  .title {
    font-size: 28px;
    color: royalblue;
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;
  }

  .title::before,.title::after {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    border-radius: 50%;
    left: 0px;
    background-color: royalblue;
  }

  .title::before {
    width: 18px;
    height: 18px;
    background-color: royalblue;
  }

  .title::after {
    width: 18px;
    height: 18px;
    animation: pulse 1s linear infinite;
  }

  .message, .signin {
    color: white;
    font-size: 14px;
  }

  .signin {
    text-align: center;
  }

  .signin a {
    color: royalblue;
  }

  .signin a:hover {
    text-decoration: underline royalblue;
  }

  .flex {
    display: flex;
    width: 100%;
    gap: 6px;
  }

  .form label {
    position: relative;
  }

  .form label .input {
    width: 100%;
    padding: 10px 10px 20px 10px;
    outline: 0;
    border: 1px solid rgba(105, 105, 105, 0.397);
    border-radius: 10px;
  }

  .form label .input + span {
    position: absolute;
    left: 10px;
    top: 15px;
    color: grey;
    font-size: 0.9em;
    cursor: text;
    transition: 0.3s ease;
  }

  .form label .input:placeholder-shown + span {
    top: 15px;
    font-size: 0.9em;
  }

  .form label .input:focus + span,.form label .input:valid + span {
    top: 30px;
    font-size: 0.7em;
    font-weight: 600;
  }

  .form label .input:valid + span {
    color: green;
  }

  .submit {
    border: none;
    outline: none;
    background-color: royalblue;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    transform: .3s ease;
  }

  .submit:hover {
    background-color: rgb(56, 90, 194);
  }

  @keyframes pulse {
    from {
      transform: scale(0.9);
      opacity: 1;
    }

    to {
      transform: scale(1.8);
      opacity: 0;
    }
  }`;

export default FormSignUp;