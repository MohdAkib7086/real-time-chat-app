import React from 'react'
import "../static/style/components/friend.scss"
export const Friend = ({item,activeUser}) => {
     console.log(activeUser,item,"activeuser");

  return (
    <div className='friend'>
            <div className='friend-image'>
                 <div className='image'>
                 <img src={`./image/${item.image}`} alt="" />
                 {
                    activeUser&& activeUser.length>0 && activeUser.some(u=>u.id===item._id)?<div className='active_icon'></div>:""
                 }
                 </div>
            </div>

            <div className='friend-name-seen'>
                 <div className='friend-name'>
                      <h4>{item.userName}</h4>
                 </div>

            </div>

       </div>
  )
}
