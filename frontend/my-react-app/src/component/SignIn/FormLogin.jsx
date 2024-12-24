import ButtonLoginGoole from "./ButtonLoginGoole";
import FormLoginChild from "./FormLoginChild";

function FormLogin({onForgetPassword}) {
  const googleAuth = () => {
    // Đảm bảo rằng biến môi trường tồn tại
    // const apiUrl = "http://localhost:3000";

    // if (apiUrl) {
    //     window.open(`${apiUrl}/auth/google/callback`, "_self");
    // } else {
    //     console.error("API URL không được cấu hình đúng trong biến môi trường.");
    // }
};

  return (
    <>
      <div className=" mb-4 flex justify-center">
        <ButtonLoginGoole onClick={googleAuth} classname="" />
      </div>
      <div className="flex items-center my-4">
        <div className="border-t flex-grow border-gray-300" />
        <span className="mx-4 text-gray-500">OR</span>
        <div className="border-t flex-grow border-gray-300" />
      </div>
      <FormLoginChild onForgetPassword={onForgetPassword} />
    </>
  );
}
export default FormLogin;
