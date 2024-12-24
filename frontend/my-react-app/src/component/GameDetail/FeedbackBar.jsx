import LikeButton from "./LikeButton"
 import DislikeButton from "./DislikeButton" 
 import SaveButton from "./SaveButton"
function FeedbackBar({game}){

    return (
      <div className="w-full h-12 bg-blue-400 bottom-0">
        <div className="  flex flex-row  justify-end space-x-8 items-center mr-36 ">
             <div>
                <LikeButton like={game.like} gameId={game._id}  />
              </div>
              <div>
                <DislikeButton dislike = {game.dislike}  gameId={game._id} />
              </div>
              <div>
                <SaveButton gameId ={game._id} />
              </div>
        </div>
        </div>
    )
}

export default FeedbackBar