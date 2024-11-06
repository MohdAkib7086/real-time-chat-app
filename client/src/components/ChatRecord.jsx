import React from "react";
import "../static/style/components/chat_record.scss";
import { useSelector } from "react-redux";
import { FaMonument } from "react-icons/fa6";
import { CiCircleCheck } from "react-icons/ci";

export const ChatRecord = ({ chat, currentReciever, scrollRef, typing }) => {
  console.log(typing, "hello");
  console.log(chat,"chat");
  const { myInfo } = useSelector((state) => state.auth);
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    console.log(`${day} ${month} ${year}`,inputDate)

    return `${day} ${month} ${year}`;
  }

  const formattedDate = formatDate();
  return (
    <>
      <div className="chat-record">
        {chat && chat.length > 0 ? (
          chat.map((m, idx) =>
            m.senderId === myInfo.id ? (
              <div key={idx} ref={scrollRef} className="my-message">
                <div className="image-message">
                  <div className="my-text">
                    <p className="message-text">
                      {" "}
                      {m.message.text === "" ? (
                        <img src={`./image/${m.message.image}`} />
                      ) : (
                        m.message.text
                      )}{" "}
                    </p>
                    {idx === chat.length - 1 && m.senderId === myInfo.id ? (
                      m.status === "seen" ? (
                        <img
                          className="img"
                          src={`./image/${currentReciever.image}`}
                          alt=""
                        />
                      ) : m.status === "delivared" ? (
                        <span>
                          {" "}
                          <CiCircleCheck />{" "}
                        </span>
                      ) : (
                        <span>
                          {" "}
                          <CiCircleCheck />{" "}
                        </span>
                      )
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="time">{formatDate(m.createdAt)}</div>
              </div>
            ) : (
              <div key={idx} ref={scrollRef} className="fd-message">
                <div className="image-message-time">
                  <img src={`./image/${currentReciever.image}`} alt="" />

                  <div className="message-time">
                    <div className="fd-text">
                      <p className="message-text">
                        {" "}
                        {m.message.text === "" ? (
                          <img src={`./image/${m.message.image}`} />
                        ) : (
                          m.message.text
                        )}{" "}
                      </p>
                    </div>
                    <div className="time">{formatDate(m.createdAt)}</div>
                  </div>
                </div>
              </div>
            )
          )
        ) : (
          <div className="friend_connect">
            <img src={`./image/${currentReciever.image}`} alt="" />
            <h3>{currentReciever.userName} Connect You</h3>
          </div>
        )}
      </div>
      {typing && typing.message && typing.senderId === currentReciever._id ? (
        <div className="typing-message">
          <div className="fd-message">
            <div className="image-message-time">
              <img src={`./image/${currentReciever.image}`} alt="" />

              <div className="message-time">
                <div className="fd-text">
                  <p className="message-text">Typing Message....</p>
                </div>
                {/* <div className="time">{formatDate(m.createdAt)}</div> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
