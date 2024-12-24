import { useState } from "react";
import qrImage from "../assets/qr.jpg";
import { useSelector } from "react-redux";
import { Form, useActionData } from "react-router-dom";
function CheckoutQR() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const totalPrice  = useSelector(state => state.cart.totalPrice);
  const items = useSelector(state => state.cart.items)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        console.log("File content:", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Form method="post"  action="/store"  encType="multipart/form-data">
    <div className="flex flex-col items-center bg-gray-100 px-4 rounded-lg shadow-md max-w-xs mx-auto mt-2">
      <h1 className="text-xl font-semibold text-gray-800 mb-2">
        Vui lòng chuyển khoản {totalPrice}$ 
      </h1>

      {/* Hiển thị QR code */}
      <div className="mb-2">
        <img className="h-56 w-40 object-cover rounded-lg"  src={qrImage} alt="QR Code" />
      </div>

      {/* Input chọn file */}
      <label className="block text-gray-700 text-sm font-medium mb-2">Upload hóa đơn:</label>
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleFileChange}
        className="border border-gray-300 p-2 rounded-lg mb-4 w-full text-sm"
      />
      <input
              type="hidden"
              name="items"
              value={JSON.stringify(items)} // Chuyển items thành chuỗi JSON
            />
            <input
              type="hidden"
              name="totalPrice"
              value={JSON.stringify(totalPrice)} // Chuyển items thành chuỗi JSON
            />

      {/* Hiển thị thông tin file upload nếu có */}
      {uploadedFile && (
        <div className="text-center mt-2 mb-2">
          <p className="text-xs text-gray-600">File đã chọn:</p>
          <p className="text-sm text-gray-800 font-medium">{uploadedFile.name}</p>
        </div>
      )}

      {/* Nút xác nhận */}
      <button className="bg-red-500 text-white py-3 px-8 rounded-lg hover:bg-red-600 transition mb-2">
        Xác nhận
      </button>
    </div>
    </Form>
  );
}

export default CheckoutQR;
