import image from '../assets/homeImage.png';
function EndImage(){
  return(
    <div className="w-full flex  space-x-6 mt-20">
        <div className='ml-20 '>
            <img className='rounded-3xl' src={image} alt="" />
        </div>
        <div className=' w-[47%] relative'>
              <h1 className='top-[30%] font-bold text-nowrap absolute text-4xl text-white'>ARE YOU A GAME <span className='bg-gradient-to-r from-[#FC5C7D] to-[#6A82FB] bg-clip-text text-transparent font-press-start text-3xl '>
  DEVELOPER?
</span>
</h1>
              <h1 className='top-[60%] absolute text-4xl text-white font-bold'>PLAY WITH LK GAMES </h1>
        </div>

    </div>
  )
}
export default EndImage