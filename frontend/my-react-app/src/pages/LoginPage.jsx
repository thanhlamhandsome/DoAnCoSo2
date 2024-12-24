import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/autoplay'; // Import CSS cho autoplay
import 'swiper/css/effect-coverflow'; // Import thêm nếu cần hiệu ứng
import 'swiper/css/pagination'; // Import nếu cần phân trang
import 'swiper/css/navigation'; // Import nếu cần điều hướng

import Image1 from '../assets/ImageLogin/Image1.png';
import Image2 from '../assets/ImageLogin/Image2.png';
import Image3 from '../assets/ImageLogin/Image3.png';
import Image4 from '../assets/ImageLogin/Image4.png';
import Image5 from '../assets/ImageLogin/Image5.png';
import Image6 from '../assets/ImageLogin/Image6.jpg';
import Image7 from '../assets/ImageLogin/Image7.jpg';
import FormLogin from "../component/SignIn/FormLogin";
import ForgetPassword from "../component/SignIn/ForgetPassword";
import { useState } from "react";
function LoginPage() {
  const [forgetPassword,setForgetPassword] = useState(false) ; 
  function onForgetPassword (){
    console.log("Forget Password clicked!")
    setForgetPassword(true)
  }
  return (
    <>
      <section className="w-[99vw] h-[100vh] bg-white relative">
        <div className="w-full h-full absolute bg-fuchsia-100">
          <Swiper
            direction="vertical"
            loop={true}
            slidesPerView={1} // Sửa lại từ slidesPreView thành slidesPerView
            speed={2000}
            autoplay={{
              delay: 3000, // Thời gian giữa các lần chuyển (3 giây)
              disableOnInteraction: false,
            }}
           
            className="w-full h-full z-0 absolute"
            modules={[EffectCoverflow, Pagination, Autoplay]}
          >
            
            <SwiperSlide className="absolute w-full h-full">
              <img className=" opacity-[0.8] w-full h-full" src={Image1} alt="Slide 1" />
            </SwiperSlide>
            <SwiperSlide>
              <img className=" opacity-[0.8] w-full h-full" src={Image2} alt="Slide 2" />
            </SwiperSlide>
            <SwiperSlide>
              <img className=" opacity-[0.8] w-full h-full" src={Image3} alt="Slide 3" />
            </SwiperSlide>
            <SwiperSlide>
              <img className=" opacity-[0.8] w-full h-full" src={Image4} alt="Slide 4" />
            </SwiperSlide>
            <SwiperSlide>
              <img className=" w-full h-full" src={Image5} alt="Slide 5" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="opacity-[0.8] w-full h-full" src={Image6} alt="Slide 6" />
            </SwiperSlide>
            <SwiperSlide>
              <img className=" opacity-[0.8] w-full h-full" src={Image7} alt="Slide 7" />
            </SwiperSlide>
          </Swiper>
        </div>
        <h1 className="z-10 text-4xl w-[38%] text-center h-[100px]  text-white font-bold absolute left-[32%] top-20 ">Join a growing communnity of creator and gamers from around the world</h1>
        <div className="absolute w-96  z-10 left-[37%] top-60 h-[450px] ">
        {forgetPassword ? <ForgetPassword /> : <FormLogin onForgetPassword={onForgetPassword} />}
        </div>
      </section>
    </>
  );
}

export default LoginPage;
