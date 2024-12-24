import { useSelector } from 'react-redux'
import Image1 from '../assets/SignUpImage/Image1.jpg'
import Image2 from '../assets/SignUpImage/Image2.jpg'
import Image3 from '../assets/SignUpImage/Image3.jpg'
import Image4 from '../assets/SignUpImage/Image4.jpg'
import Image5 from '../assets/SignUpImage/Image5.jpg'
import Image6 from '../assets/SignUpImage/Image6.jpg'
import Image7 from '../assets/SignUpImage/Image7.jpg'
import FormSignUp from '../component/SignUp/FormSignUp'
import HiddenDiv from '../component/Root/HiddenDiv'
import { useState } from 'react'


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
const images=[Image1,Image2,Image3,Image4,Image5,Image6,Image7]
function SignUpPage(){


const shuffledImages = shuffleArray(images);
return (
  <>
 <HiddenDiv />
    <section className="w-[99vw] h-[100vh] relative  ">
      <div className='absolute w-full h-full'>
      <img className='absolute h-full w-full opacity-[0.8]  ' src={shuffledImages[0]} alt="" />
      </div>
      <div className='w-96 h-[470px] flex justify-center  z-10 absolute top-[26%] left-[40%]'>
          <FormSignUp imageUrl={shuffledImages[0]}></FormSignUp>
      </div>
    </section>
    </>
)
}

export async  function action({request}){
  const form = await request.formData();
  const password = form.get('password'); 
  const confirmPassword = form.get('confirmPassword') ;
  console.log({password,confirmPassword}) 
  const formData = Object.fromEntries(form); 
  { if(password !== confirmPassword){
    return {status : 'error' , message: 'Confilm Password Failed'}
  } }
  const response = await fetch('http://localhost:3000/signup',{
    method :'post', 
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  }); 
  const  resData = await response.json(); 
  if(!response.ok){
    console.log('Error'); 
    return{status: 'error' , message : resData.message }
  } 
  
  return{status: 'success' , message : resData.message }  ;
}
 
export default SignUpPage