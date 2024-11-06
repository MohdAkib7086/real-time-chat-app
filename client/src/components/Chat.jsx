import React, { useState, useEffect, useRef } from "react";
import { BiEdit } from "react-icons/bi";
import { SlOptions } from "react-icons/sl";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { LuLogOut } from "react-icons/lu";

import "../static/style/components/chat.scss";
import ActiveFriend from "./ActiveFriend";
import { Friend } from "./Friend";
import { MainChat } from "./MainChat";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import toast, { Toaster } from "react-hot-toast";
import useSound from "use-sound";
import notifSound from "../static/audio/notification.mp3";
import sendSound from "../static/audio/sending.mp3";

import {
  chatSend,
  getChat,
  getReciever,
  imageChatSend,
} from "../store/actions/chatAction";
import { io } from "socket.io-client";
import { userLogout } from "../store/actions/authAction";
import { useNavigate } from "react-router-dom";

export const Chat = () => {
  const navigate = useNavigate();
  const [size, setSize] = useState(300);
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseMove = (e) => {
    if (isResizing) {
      const newSize = e.clientX;
      setSize(newSize);
    }
  };
  const handleMouseDown = () => {
    setIsResizing(true);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };
  const [notificationsPlay] = useSound(notifSound);
  const [sendingPlay] = useSound(sendSound);

  const scrollRef = useRef();

  const socket = useRef();

  const { recievers, chat } = useSelector((state) => state.chat);
  const { myInfo } = useSelector((state) => state.auth);

  const inputHandle = (e) => {
    setNewMsg(e.target.value);
    socket.current.emit("typing", {
      senderId: myInfo.id,
      recieverId: currentReciever._id,
      msg: e.target.value,
    });
  };

  const sendMessage = (e) => {
    if(!newMsg){
      return;
    }
    sendingPlay();
    e.preventDefault();
    const data = {
      senderName: myInfo.userName,
      recieverId: currentReciever._id,
      message: newMsg ? newMsg : "❤",
    };

    socket.current.emit("sendChat", {
      senderId: myInfo.id,
      senderName: myInfo.userName,
      recieverId: currentReciever._id,
      time: new Date(),
      message: {
        text: newMsg ? newMsg : "❤",
        image: "",
      },
    });
    socket.current.emit("typing", {
      senderId: myInfo.id,
      recieverId: currentReciever._id,
      msg: "",
    });

    dispatch(chatSend(data));
    setNewMsg("");
  };
  const [currentReciever, setCurrentReciever] = useState("");
  const [activeUser, setActiveUser] = useState([]);
  const [socketChat, setSocketChat] = useState({});
  const [typing, setTyping] = useState({});
  const funsetCurrentReciever = (item) => {
    setCurrentReciever(item);
    console.log(currentReciever);
  };
  const [newMsg, setNewMsg] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReciever());
  }, []);

  useEffect(() => {
    console.log(recievers, "34");
    if (recievers) {
      setCurrentReciever(recievers[0]);
    }
  }, [recievers]);
  useEffect(() => {
    dispatch(getChat(currentReciever._id));
  }, [currentReciever?._id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behaviour: "smooth",
    });
  }, [chat]);

  const emojiSend = (imoji) => {
    setNewMsg(`${newMsg}` + imoji);
    socket.current.emit("typing", {
      senderId: myInfo.id,
      recieverId: currentReciever._id,
      msg: imoji,
    });
  };

  useEffect(() => {
    socket.current = io("ws://localhost:8000");
    socket.current.on("getChat", (data) => {
      console.log(data, "data");
      setSocketChat(data);
      console.log(socketChat, "data");
    });

    socket.current.on("msgSeenResponse", (msg) => {
      dispatch({
        type: "SEEN_MESSAGE",
        payload: {
          msgInfo: msg,
        },
      });
    });

    socket.current.on("msgDelivaredResponse", (msg) => {
      dispatch({
        type: "DELIVARED_MESSAGE",
        payload: {
          msgInfo: msg,
        },
      });
    });

    socket.current.on("seenSuccess", (data) => {
      dispatch({
        type: "SEEN_ALL",
        payload: data,
      });
    });

    socket.current.on("typing", (data) => {
      setTyping(data);
    });
  }, []);
  useEffect(() => {
    if (
      socketChat.senderId === currentReciever?._id &&
      socketChat.recieverId === myInfo.id
    ) {
      dispatch({
        type: "SOCKET_CHAT",
        payload: {
          message: socketChat,
        },
      });
    }
    setSocketChat("");
  }, [socketChat]);
  useEffect(() => {
    socket.current.emit("addUser", myInfo.id, myInfo);
  }, []);

  useEffect(() => {
    socket.current.on("getUser", (user) => {
      const filterUser = user.filter((user) => user.id !== myInfo.id);
      setActiveUser(filterUser);
    });
  }, []);
  useEffect(() => {
    if (
      socketChat &&
      socketChat.senderId !== currentReciever?._id &&
      socketChat.recieverId === myInfo.id
    ) {
      notificationsPlay();
      toast.success(`${socketChat.senderName} send a new message`);
    }
    // });
  }, [socketChat]);

  useEffect(() => {
    if (!myInfo) {
      navigate("/login");
    }
  });

  const picSend = (e) => {
    if (e.target.files.length !== 0) {
      sendingPlay();
      const picName = e.target.files[0].name;
      const newPicName = Date.now() + picName;

      const formData = new FormData();
      formData.append("senderName", myInfo.userName);
      formData.append("picName", newPicName);

      formData.append("recieverId", currentReciever._id);
      formData.append("image", e.target.files[0]);
      dispatch(imageChatSend(formData));
      socket.current.emit("sendChat", {
        senderId: myInfo.id,
        senderName: myInfo.userName,
        recieverId: currentReciever._id,
        time: new Date(),
        message: {
          text: "",
          image: newPicName,
        },
      });
    }
  };

  const [hide, setHide] = useState(true);

  const logout = () => {
    const id = myInfo.id;
    dispatch(userLogout);
    socket.current.emit("logout", id);
  };

  return (
    <div className="chat">
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: "18px",
          },
        }}
      />
      <div
        className="row"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div
          className="col-3"
          style={{ width: `${size}px` }}
          onMouseDown={handleMouseDown}
        >
          <div className="left-side">
            <div className="top">
              <div className="image-name">
                <div className="image">
                  <img src={`./image/${myInfo.image}`} alt="" />
                </div>
                <div className="name">
                  <h3>{myInfo.userName}</h3>
                </div>
              </div>

              <div className="icons">
                <div onClick={() => setHide(!hide)} className="icon">
                  <SlOptions />
                </div>
                <div className="icon">
                  <BiEdit />
                </div>
                <div className={hide ? "theme-logout" : "theme-logout show"}>
                  <div className="logout" onClick={logout}>
                    <LuLogOut />
                    Logout
                  </div>
                </div>
              </div>
            </div>

            <div className="friend-search">
              <div className="search">
                <button>
                  {" "}
                  <BsFillSearchHeartFill />{" "}
                </button>
                <input
                  type="text"
                  placeholder="Search"
                  className="form-control"
                />
              </div>
            </div>
            <div className="friends">
              {recievers && recievers.length > 0
                ? recievers.map((item, idx) => (
                    <div
                      className={
                        currentReciever?._id === item?._id
                          ? "hover-friend active"
                          : "hover-friend"
                      }
                      key={idx}
                      onClick={() => funsetCurrentReciever(item)}
                    >
                      <Friend item={item} activeUser={activeUser} />
                    </div>
                  ))
                : "No Friend"}
            </div>
          </div>
        </div>
        {currentReciever ? (
          <MainChat
            item={currentReciever}
            inputHandle={inputHandle}
            newMsg={newMsg}
            sendMessage={sendMessage}
            chat={chat}
            scrollRef={scrollRef}
            emojiSend={emojiSend}
            picSend={picSend}
            activeUser={activeUser}
            typing={typing}
          />
        ) : (
          "Select reciever  to send"
        )}
      </div>
    </div>
  );
};
