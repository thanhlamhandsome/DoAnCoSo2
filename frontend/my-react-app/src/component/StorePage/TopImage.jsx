function TopImage({ imageUrl }) {
  return (
    <div className="w-full h-full bg-slate-800 flex items-center justify-center">
      <img
        src={imageUrl}
        className="h-full w-full "
        alt=""
      />
    </div>
  );
}

export default TopImage;
