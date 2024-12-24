import { useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { uiAction } from '../../store/ui-slice';

function UserDetail() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user.avatar)
  const byteArray = Uint8Array.from(atob(user.avatar), (char) =>
    char.charCodeAt(0)
  );
  const blob = new Blob([byteArray], { type: "image/jpeg" });
  user.avatar = URL.createObjectURL(blob); 
  const [avatar, setAvatar] = useState(user.avatar || ''); 


  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Convert the file to a binary buffer
      const buffer = await file.arrayBuffer();
      const base64Avatar = btoa(
        String.fromCharCode(...new Uint8Array(buffer))
      );
  
      // Dispatch the buffer (or base64 string) to your action
      dispatch(uiAction.setUpdateAvatar({ avatar:file }));
  
      // Optionally update the avatar in the UI using a URL
      const newAvatar = URL.createObjectURL(file);
      setAvatar(newAvatar);
    }
  };
  

  return (
    <div className="relative top-5">
      <div className="h-36 w-36 bg-slate-200 rounded-full ml-7 overflow-hidden relative z-10">
        <label htmlFor="avatarInput" className="cursor-pointer w-full h-full">
          <img
            className="w-full h-full object-cover"
            src={avatar}
            alt="User Avatar"
          />
        </label>
        {/* Input file được ẩn */}
        <input
          id="avatarInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange} // Xử lý sự kiện khi chọn ảnh
        />
      </div>
    </div>
  );
}

export default UserDetail;
