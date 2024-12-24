import { useSelector, useDispatch } from "react-redux";
import { uiAction } from "../../store/ui-slice";
import { Form } from "react-router-dom";
function CheckoutBalen() {
    const user = JSON.parse(localStorage.getItem('user'));
    const balance = user.balance
    const items = useSelector((state)=>state.cart.items); 
    const totalPrice = useSelector((state)=>state.cart.totalPrice)
  const totalAmount = totalPrice; // Lấy số tiền cần thanh toán từ Redux
  const accountBalance = balance; // Lấy số dư tài khoản từ Redux
  const dispatch = useDispatch();

  const handleCheckout = (e) => {
   
    if (accountBalance >= totalAmount) {
     const updatedUser = { ...user, balance: accountBalance - totalAmount };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      alert("Thanh toán thành công bằng số dư tài khoản!");
    //   window.location.reload();
    } else {
      dispatch(
        uiAction.setShowHiddenDiv({
          status: "error",
          message: "Số dư tài khoản không đủ ",
        })
      );
    }
  };

  return (
    <Form method="post" action='/store' className="bg-gray-800 rounded-lg p-6 shadow-lg text-center">
      <h3 className="text-lg font-bold mb-4 text-white">
        Thanh toán bằng số dư tài khoản
      </h3>
      <p className="text-white mb-4">Số dư hiện tại: ${accountBalance}</p>
      <p className="text-white mb-4">Số tiền cần thanh toán: ${totalAmount}</p>
      <button
        onClick={handleCheckout}
        className="py-2 px-4 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition"
      >
        Thanh toán
      </button>
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
         <input
        type="hidden"
        name="checkoutBalance"
        value={true} // Chuyển items thành chuỗi JSON
      />
    </Form>
  );
}

export default CheckoutBalen;
