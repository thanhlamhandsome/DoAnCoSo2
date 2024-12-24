const linkVideo1 = "https://www.youtube.com/embed/xYtr9Bcdtlc";
import VideoComponent from "../component/StorePage/VideoComponent";
function AllVideo() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white">All Videos</h1>
      <h5 className="text-gray-700">
        GET LUCKY COINS TO WIN THE SWEEPSTAKE{" "}
        <span className="text-pink-600 font-bold"> CASH PRIZE</span>
      </h5>
      <div className="flex  space-x-20 ">
      <VideoComponent src="https://www.youtube.com/embed/xYtr9Bcdtlc?si=F4CSDGATznVGaIz1&controls=0&modestbranding=1&showinfo=0" />
      <VideoComponent src="https://www.youtube.com/embed/3WJwYffHypQ?si=oa-Y5zMrs7ctB0eN" />
      <VideoComponent src="https://www.youtube.com/embed/H4YqGHkVcyY?si=G8wZ17zmDqrilwuy" />
      
      
      </div>
    </div>
  );
}
export default AllVideo;
