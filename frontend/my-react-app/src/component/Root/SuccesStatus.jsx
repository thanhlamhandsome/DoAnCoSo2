function SuccessStatus({ message, onClose }) {
    return (
      <div className="w-full h-full bg-gradient-to-r from-green-400 via-teal-400 to-blue-500 text-white flex flex-col justify-center items-center rounded-xl shadow-2xl p-6 relative">
        {/* Phần nội dung chính với nền sáng, phân tách rõ ràng */}
        <div className="w-full bg-white bg-opacity-80 rounded-lg p-4 shadow-lg">
          {/* Nút Close nằm ở góc trên bên phải */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 px-3 py-1 bg-gray-200 text-gray-800 hover:bg-gray-300 font-medium rounded-full shadow-sm text-sm"
            aria-label="Close"
          >
            ✕
          </button>
  
          {/* Nội dung thông điệp */}
          <p className="text-xl font-semibold text-center text-gray-800 drop-shadow-lg">
            {message}
          </p>
        </div>
      </div>
    );
  }
  
  export default SuccessStatus;
  