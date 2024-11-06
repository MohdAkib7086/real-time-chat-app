import React from "react";
import { MdOutlineExpandMore } from "react-icons/md";
import "../static/style/components/reciever_info.scss";
export const RecieverInfo = (props) => {
  const { item, activeUser, chat } = props;
  return (
    <div className="reciever-info">
      <input type="checkbox" id="gallery" />
      <div className="image-name">
        <div className="image">
          <img src={`./image/${item.image}`} alt="" />
        </div>
        {activeUser &&
        activeUser.length > 0 &&
        activeUser.some((u) => u.id === item._id) ? (
          <div className="active-user">Active</div>
        ) : (
          ""
        )}

        <div className="name">
          <h4>{item.userName} </h4>
        </div>
      </div>

      <div className="others">
        <div className="custom-chat">
          <h3>Coustomise Chat </h3>
          <MdOutlineExpandMore />
        </div>

        <div className="privacy">
          <h3>Privacy and Support </h3>
          <MdOutlineExpandMore />
        </div>

        <div className="media">
          <h3>Shared Media </h3>
          <label htmlFor="gallery">
            {" "}
            <MdOutlineExpandMore />{" "}
          </label>
        </div>
      </div>

      <div className="gallery">
        {chat.map((m, idx) =>
          m.message.text === "" ? (
            <img src={`./image/${m.message.image}`} />
          ) : (
            ""
          )
        )}
        {/* <img src={`./image/7449aadhar.png`} alt="" />
        <img src={`./image/7449aadhar.png`} alt="" />
        <img src={`./image/7449aadhar.png`} alt="" />
        <img src={`./image/7449aadhar.png`} alt="" /> */}
      </div>
    </div>
  );
};
