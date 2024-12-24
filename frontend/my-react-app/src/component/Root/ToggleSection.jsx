import { useSubmit } from "react-router-dom"
import ButtonLogout from "./ButtonLogout"
import Radio from "./Radio"

import { useDispatch } from "react-redux";
function ToggleSection(){ 
    const submit = useSubmit();
    function handleLogout(){
       submit(null,{action:'/logout',method:'post'})
    }

    const user = JSON.parse(localStorage.getItem('user'));
    const birthdate = new Date(user.birthdate); 
    
  
    return(
        <div className=" relative mt-10 z-50 h-96 w-56 right-3  bg-black rounded-2xl ">
            <div className="absolute top-4 ml-2">
                <h1 className="text-white text-base font-bold">{user.email}</h1>
                <h3 className="text-gray-400 text-sm font-bold">{birthdate.toDateString()}</h3>
            </div>
            <hr className="h-1 bg-gray-800 w-full absolute top-20" />
            <div className="top-24 absolute ">
            <Radio />
            <hr />
            </div>
            <div className="bottom-2 absolute ml-3">
                <ButtonLogout onLogout={handleLogout}  />
            </div>

        </div>
    )
}
export default ToggleSection