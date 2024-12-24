import { redirect } from "react-router-dom";

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  const experateDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = experateDate.getTime() - now.getTime();

  return duration;
} // tính thời gian hết hạn của token

export function getAuthtoken() {
  const token = localStorage.getItem("token");
  if (!token) {
    return ;
  }
  const Tokenduration = getTokenDuration();
  if (Tokenduration < 0) {
    return "EXPIRIED";
  }
  return token;
} // check nếu tgian hết hạn return lại "EXPERIED" còn chưa hết return lại token

export function tokenLoader() {
  const token = getAuthtoken();
  return token || null; // Trả về `null` nếu token không tồn tại
}
// để trang root mỗi lần load lại trang thì sẽ kiểm tra token

export function checkAuthLoader() {
  const token = getAuthtoken();
  if (!token) {
    console.log("No token found. Redirecting to login.");
    return redirect("/login"); 
  }
  return null;
}
