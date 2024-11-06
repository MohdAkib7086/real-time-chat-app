import React from 'react'
import { GrAddCircle } from "react-icons/gr";
import { AiOutlineFileAdd } from "react-icons/ai";
import { AiFillGift } from "react-icons/ai";
import { MdEmojiEmotions } from "react-icons/md";
import { FaPaperPlane } from "react-icons/fa6";
import "../static/style/components/message_send.scss"

 const MessageSend = (props) => {
     const {inputHandle,newMsg,sendMessage,emojiSend,picSend}=props;
    const emojis = [
    '😀', '😃', '😄', '😁',
    '😆', '😅', '😂', '🤣',
    '😊', '😇', '🙂', '🙃',
    '😉', '😌', '😍', '😝',
    '😜', '🧐', '🤓', '😎',
    '😕', '🤑', '🥴', '😱'
]


return (

<div className='msd-send-field'>
    <input type="checkbox" id='emoji' />
       {/* <div className='file hover-attachment'>
            <div className='add-attachment'>
                   Add Attachment
            </div>
            <GrAddCircle />
            </div>   */}

    <div className='file hover-image'>
         <div className='add-image'>
              Add Image 
         </div>
         <input type='file' id='pic' className='form-control' onChange={picSend}/>
         <label htmlFor='pic'> <AiOutlineFileAdd/> </label>
    </div>

    {/* <div className='file hover-gift'>
         <div className='add-gift'>
              Add gift
         </div>
         <AiFillGift />
    </div> */}

<div className='message-type'>
    <input type="text" onChange={inputHandle} name='message' id='message' placeholder='Aa' className='form-control' value={newMsg}/>

    <div className='file hover-gift'>
         <label htmlFor='emoji'> <MdEmojiEmotions/> </label>
    </div>
</div>

<div onClick={sendMessage} className='file'>
<FaPaperPlane/>
</div>

<div className='emoji-section'>
    <div className='emoji'>
         {
              emojis.map((e,idx)=> <span key={idx} onClick={()=>emojiSend(e)}>{e}</span>)
         }

    </div>

</div>


</div>

)
};

export default MessageSend;