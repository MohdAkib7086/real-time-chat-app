import React from "react";
import "../static/style/components/active_friend.scss";

const ActiveFriend = ({ activeUser,setCurrentReciever }) => {
  console.log(activeUser);
  return (
    <div className="active-friend" >
      <div className="image-active-icon">
        {activeUser.map((user,idx) => 
          <div className="image" key={idx} onClick={()=>setCurrentReciever({
            _id:user.userInfo.id,
            email:user.userInfo.email,
            image:user.userInfo.image,
            userName:user.userInfo.userName
          })}>
            <img src={`./image/${user.userInfo.image}`} alt="" />
            <div className="active-icon"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveFriend;
