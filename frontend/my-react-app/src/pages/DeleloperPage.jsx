import HiddenDiv from '../component/Root/HiddenDiv'
import { useSelector } from "react-redux";
import FormAddGame from "../component/Developer/FormAddGame"; 

function DeveloperPage() {
  const isVisible  = useSelector((state)=>state.ui.showHiddenDiv);
    return (
      <>
      {isVisible && <HiddenDiv />}
      <div className=" bg-black flex flex-col justify-center items-center relative">
      
        <h2 className="mb-12 text-6xl font-extrabold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
          Update your Game
        </h2>
        <FormAddGame />
      </div>
      </>
    );
  }
  // export async function action({request,params}) {
  //     const form = await request.formData(); 
  //     const formData = Object.fromEntries(form);
  //     console.log(formData)
  // }
  export default DeveloperPage;