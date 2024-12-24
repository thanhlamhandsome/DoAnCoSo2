import { Form } from "react-router-dom" ;
import InputScrible from "./InputScrible";
function handleSubmit(event){
   event.preventDefault();
}
function FormScrible(){
    return(
        <>
        <Form onClick={handleSubmit} className=" absolute bottom-32 left-[40%]">
          <InputScrible />
        </Form></>
    )
}
export default FormScrible