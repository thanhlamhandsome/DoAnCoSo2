import ToggleSection from './ToggleSection';
import Avatar from '../Root/Avatar'
import { useState } from 'react';
function UserProfile(){
  const [isDivVisible,setIsDivVisible]= useState(false)
  const user = JSON.parse(localStorage.getItem('user')); 
  function handleshowToggleSection(){
     setIsDivVisible(!isDivVisible);
  }
    return <> 
      <div onClick={handleshowToggleSection} className='flex mt-2 items-center space-x-3 ml-3'>
        <div>
        <Avatar />
        </div>
        <div>
            <h2>{user.name}</h2>
        </div>
      </div>
      {isDivVisible && <ToggleSection />}
      
    </>
}
export default UserProfile;