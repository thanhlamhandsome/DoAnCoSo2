import { useSelector } from "react-redux";
import SuccessStatus from "./SuccesStatus";
import ErrorStatus from "./ErrorStatus";
import { useDispatch } from "react-redux";
import { uiAction } from "../../store/ui-slice";
function HiddenDiv() {
   
   const isVisible = useSelector((state)=>state.ui.showHiddenDiv)
   const status = useSelector((state)=> state.ui.status) ; 
   const message  = useSelector((state)=> state.ui.message);
   const dispatch = useDispatch(); 
   function handleClose() {
    dispatch(uiAction.hiddenHiddenDiv());
  }
  return (
    <div
    className={`fixed inset-0 z-50 flex items-center justify-center ${
      isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
    } transition-opacity duration-300`}
  >
    <div className="w-72 h-44   relative">

        {status ==='success' &&  <SuccessStatus message={message} onClose={handleClose}></SuccessStatus>}
        {status=== 'error'&& <ErrorStatus message={message} onClose={handleClose}  /> }  
    </div>
  </div>)
  ;
}

export default HiddenDiv;
