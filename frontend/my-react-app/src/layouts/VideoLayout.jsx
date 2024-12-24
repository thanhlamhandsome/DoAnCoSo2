import videoSrc from "../assets/video2.mp4";
import CoverflowSwiper from "../component/HomePage/CoverflowSwiper";
function VideoLayout({games}){
    return (
        <section className="w-[99vw] h-[99vh] flex justify-center items-center relative overflow-x-hidden">
        <video
          loop
          autoPlay
          muted
          playsInline
          className="w-[99vw] h-[99vh] object-cover absolute z-[-1] opacity-[0.9]"
        >
          <source
            src={videoSrc} // Đảm bảo video nằm trong thư mục public
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 flex justify-center items-center z-10">
          <div className="w-[99vw] h-96 max-w-[100%] max-h-[90%] ">
            <CoverflowSwiper games={games} />
          </div>
        </div>
      </section>
    )
}
export default VideoLayout ; 