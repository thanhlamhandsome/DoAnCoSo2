import bCoint from "../assets/bcoin.png";
function SecondContent(){
    return(
        <div className="h-[700px] relative bg-slate-950 ">
        <h1 className=" left-60 text-white  whitespace-nowrap font-bold absolute text-[62px]">
          We are our games with one goal
        </h1>
        <h1 className="font-bold text-[62px] absolute top-20 left-[29%]">
          Your
          <span className="bg-gradient-to-r from-[#16bffd] to-[#cb3066] bg-clip-text text-transparent">
            Entertainment
          </span>
        </h1>
        <p className="text-gray-400 text-lg absolute top-44 mx-auto text-center   w-[70%] left-60">
          We create our games with one goal. your entertainment. we want you to
          be rewarded for your skills while you play the games you love. Beat
          you opponents earn{" "}
        </p>
        <img
          src={bCoint}
          className="w-full h-[55%] mb-10  absolute bottom-0 "
          alt=""
        />
      </div>
    )
}
export default SecondContent