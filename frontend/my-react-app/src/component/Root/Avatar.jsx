import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
export default function ImageAvatars() {
  const user = JSON.parse(localStorage.getItem('user')); 
    const byteArray = Uint8Array.from(atob(user.avatar), (char) =>
      char.charCodeAt(0)
    );
    const blob = new Blob([byteArray], { type: "image/jpeg" });
    user.avatar = URL.createObjectURL(blob); 
    const [avatar, setAvatar] = useState(user.avatar || ''); 
  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt="Remy Sharp" src={avatar} />
    </Stack>
  );
}
