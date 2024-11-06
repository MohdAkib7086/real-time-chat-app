import React from "react";
import { AiFillPhone } from "react-icons/ai";
import { AiTwotoneVideoCamera } from "react-icons/ai";
import { MdMore } from "react-icons/md";
import "../static/style/components/main_chat.scss";
import { ChatRecord } from "./ChatRecord";
import MessageSend from "./MessageSend";
import { RecieverInfo } from "./RecieverInfo";

export const MainChat = (prop) => {
  const {
    item,
    inputHandle,
    newMsg,
    sendMessage,
    chat,
    scrollRef,
    emojiSend,
    picSend,
    activeUser,
    typing
  } = prop;
  return (
    <div className="main-chat">
      <div className="row">
        <input type="checkbox" id="dot" />
        <div className="col-8">
          <div className="message-send-show">
            <div className="header">
              <div className="image-name">
                <div className="image">
                  <img src={`./image/${item.image}`} alt="" />
                  {activeUser && activeUser.length >0 && activeUser.some(u=>u.id===item._id)?<div className="active-icon"></div>:""}
                </div>
                <div className="name">
                  <h3> {item.userName} </h3>
                </div>
              </div>

              <div className="icons">
                <div className="icon">
                  <AiFillPhone />
                </div>

                <div className="icon">
                  <AiTwotoneVideoCamera />
                </div>

                <div className="icon">
                  <label htmlFor="dot">
                    <MdMore />
                  </label>
                </div>
              </div>
            </div>
            <ChatRecord
              chat={chat}
              currentReciever={item}
              scrollRef={scrollRef}
              typing={typing}
            />
            <MessageSend
              inputHandle={inputHandle}
              newMsg={newMsg}
              sendMessage={sendMessage}
              emojiSend={emojiSend}
              picSend={picSend}
            />
          </div>
        </div>

        <div className="col-4">
          <RecieverInfo item={item} activeUser={activeUser} chat={chat}/>
        </div>
      </div>
    </div>
  );
};
