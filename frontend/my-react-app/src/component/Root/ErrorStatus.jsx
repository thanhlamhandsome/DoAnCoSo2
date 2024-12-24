function ErrorStatus({ message, onClose }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-50">
      {/* Lớp nền mờ */}
      <div className="bg-opacity-50 bg-gray-800 w-full h-full absolute"></div>

      {/* Hộp thông báo */}
      <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white flex flex-col justify-center items-center rounded-xl shadow-2xl  relative w-full h-full max-w-lg ">
        {/* Nút Close nằm ở góc trên bên phải */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 px-4 py-1 bg-white text-gray-800 hover:bg-gray-100 font-semibold rounded-full shadow-lg text-lg transform transition-all duration-300 hover:scale-110"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Nội dung thông điệp lỗi */}
        <div className="bg-white p-6 rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105 mt-8">
          <p className="text-base font-bold text-center text-gray-800 break-words">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ErrorStatus;
