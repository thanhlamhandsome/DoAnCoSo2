import { json, redirect } from "react-router-dom";

 export async function action (){
   await logout (); 
    localStorage.removeItem('token'); 
    localStorage.removeItem('expiration'); 
    localStorage.removeItem('user'); 
    localStorage.removeItem('likes');
    localStorage.removeItem('authennicateUser'); 
    return redirect('/') ; 
    async function logout () {
        const token = localStorage.getItem('token');  
        const response = await fetch('http://localhost:3000/loggout',{
         method : 'post' , 
         headers:{
            'Content-Type' : 'application/json', 
            Authorization : 'Bearer ' + token 
         }
        }) ; 
        if(!response.ok){
         throw json('Logout Fail') ; 
        }
        const resData = await response.json(); 
        console.log(resData)
        return resData ;
      
        
    }
 } 