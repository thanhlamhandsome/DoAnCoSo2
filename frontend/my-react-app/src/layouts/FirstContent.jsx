import arcadeImage from "../assets/arcade.png";
import imageWall from "../assets/imageWall.jpg";
function FirstContent(){
  return(
    <div className="h-[700px] relative  w-full bg-slate-950">
    <img
      className="h-[650px] rounded-[400px] mt-6 absolute right-0 mr-6 "
      src={arcadeImage}
      alt=""
    />
    <h1 className="font-press-start text-[50px] font-bold text-white z-10 absolute top-[17%] ml-20">
      Quick Play
    </h1>
    <img
      className="absolute top-[35%] rounded-3xl ml-12"
      src={imageWall}
      alt=""
    />
  </div>
  )
}
export default FirstContent;