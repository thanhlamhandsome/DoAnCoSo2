function VideoComponent ({src}){
    return (
        <div className="w-80 h-64 flex flex-col  ">
        <div className="w-[90%] rounded-xl bg-[#1E2834] h-40 ml-4 mt-3 ">
          <iframe
            className="ml-3 mt-2 rounded-xl"
            width="90%"
            height="90%"
            src={src}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <h1 className="text-white mt-4 text-lg font-bold ml-4">
          Starts Wars Lego Game
        </h1>
        <p className=" ml-4 text-sm text-gray-400">
          Your position <span className="text-white font-bold">#14th</span>{" "}
        </p>
      </div>
    )
}
export default VideoComponent