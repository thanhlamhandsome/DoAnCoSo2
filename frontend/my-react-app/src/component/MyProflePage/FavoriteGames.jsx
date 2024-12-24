import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ButtonDelete from './ButtonDelete';
import { json } from 'react-router-dom';
import { BlobifyImages } from '../../pages/MyProfile';
export default function FavoriteGames({ games }) {
 const [favouriteGame,removeFavouriteGame] = React.useState(); 
 async function handleRemoveFavouriteGame(gameId){
  const token = localStorage.getItem('token'); 
      const responese = await fetch('http://localhost:3000/removefavouritegame',{
        method : 'post' , 
        headers : {
          'Content-Type' : 'application/json', 
          Authorization : 'Bearer ' + token
        }
        ,
        body : JSON.stringify({id:gameId})
      })
      if(!responese.ok){
        throw json('Remove Favourite Game Fail'); 
      }
      let resData = await responese.json(); 
      resData = BlobifyImages(resData);
      return removeFavouriteGame(resData);
  }
  return (
    <div className="h-screen flex justify-center items-start bg-slate-600">
      <List
        sx={{
          width: '100%',
          maxWidth: 500,
          bgcolor: 'background.paper',
          marginTop: '20px',
          
        }}
      >
        {(favouriteGame && favouriteGame.length > 0 ? favouriteGame : games).map((game,index) => (
          <ListItem
            key={index}
            sx={{
              padding: '20px', // Tăng padding
              fontSize: '1.5rem', // Tăng kích thước tổng thể
            }}
          >
            <ListItemAvatar>
              <Avatar
                src={game.image}
                sx={{
                  width: 80, // Tăng kích thước Avatar
                  height: 80,
                  marginRight : 1.5
                }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={game.name}
              secondary="Jan 9, 2014"
              sx={{
                '& .MuiTypography-root': {
                  fontSize: '1.2rem', // Tăng kích thước text
                },
              }}
            />
            <ButtonDelete onClick={()=>handleRemoveFavouriteGame(game._id)} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
