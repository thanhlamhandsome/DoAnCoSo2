import AdminLayout from "../component/Admin/AdminLayout";
import { defer, json } from "react-router-dom";
import { addUser ,updateUser} from "../component/Admin/UserLayout/FormAddUser";
import { addGame,updateGame } from "../component/Admin/GameLayout/FormAddGame";
import { addAdmin,updateAdmin } from "../component/Admin/AdminLayout/FormAddAdmin";
function AdminPage() {
  return (
    <>
      <AdminLayout />
    </>
  );
}

async function loaderUser() {
  const response = await fetch("http://localhost:3000/users");
  if (!response.ok) {
    throw json({ message: "Can not fetch User" });
  }
  let resData = await response.json();

  return processUser(resData);
}
async function loaderAdmin() {
  const response = await fetch("http://localhost:3000/admins");
  if (!response.ok) {
    throw json({ message: "Can not fetch User" });
  }
  let resData = await response.json();

  return processUser(resData);
}
const processUser = (resData) => {
  return resData.map((user) => {
    if (user.avatar) {
      const byteArray = Uint8Array.from(atob(user.avatar), (char) =>
        char.charCodeAt(0)
      );
      const blob = new Blob([byteArray], { type: "image/jpeg" });
      user.avatar = URL.createObjectURL(blob);
    }
    return user;
  });
};

const processGames = (resData) => {
  const updatedGames = resData.map((game) => {
    if (game.image && game.image.data) {
      const buffer = game.image.data;
      const blob = new Blob([new Uint8Array(buffer)], {
        type: "image/jpeg",
      });
      game.image = URL.createObjectURL(blob); // Tạo URL cho ảnh
    }

    return game; // Trả về từng game đã xử lý
  });

  return updatedGames; // Trả về danh sách game đã xử lý
};
async function loaderGame() {
  const response = await fetch("http://localhost:3000/store");
  if (!response.ok) {
    throw json({ message: "Can not fetch User" });
  }
  const resData = await response.json();
  return processGames(resData);
}

async function loaderTransaction() {
  const response = await fetch("http://localhost:3000/alltransaction");
  if (!response.ok) {
    throw json({ message: "Fetch Transaction failed " });
  }
  const resData = await response.json();
  return resData;
}

export function loader() {
  return defer({
    loaderAdmin: loaderAdmin(),
    loaderUser: loaderUser(),
    loaderGame: loaderGame(),
    loaderTransaction: loaderTransaction()
  });
}export async function action({ request }) {
  const formData = await request.formData();
  const actionType = formData.get("actionType");
  const url = formData.get('url'); // Check if it's a game
  const isUpdating = formData.get('isUpdating') === "true"; // Check if updating user
  const userId = formData.get('userId'); // Get userId for update
  const updateGame = formData.get('updateGame') === 'true'; 
  try {
    // Check if it's a game
    if (url) {
      await addGame(formData);
    } 
    // If updating user
    else if (isUpdating && userId) {
      await updateUser(formData);
    } else if(updateGame){
       await updateGame(formData)
    }else if (actionType ==='updateAdmin'){
      await updateAdmin(formData);
    }else if (actionType ==='addAdmin'){
      await addAdmin(formData);
    }
    // If adding new user
    else {
      await addUser(formData);
    }
    
    return { success: true }; // Return success after operation
  } catch (error) {
    console.error("Error handling action:", error);
    return json({ success: false, error: error.message }); // Handle errors gracefully
  }
}
export default AdminPage;
