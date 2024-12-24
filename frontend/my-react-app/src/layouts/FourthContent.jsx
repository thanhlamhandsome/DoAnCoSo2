import FormScrible from "../component/HomePage/FormScrible";
function FourthContent() {
  return (
    <div className="h-[450px] relative bg-slate-950 ">
      <h1 className="absolute text-[50px] font-bold  text-wrap mt-6 text-white w-[700px] text-center left-[25%]">
        Subcrible Our Newsletter For Upadate About Games
      </h1>
      <p className="absolute text-center top-44 left-[32%] text-xl text-gray-400 w-[520px]">
        Various trending news will be reset week. Don't miss the best news every
        week
      </p>
      <FormScrible />
    </div>
  );
}
export default FourthContent