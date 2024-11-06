const formidable = require("formidable");
const fs=require('fs');

const User = require("../model/authModel");
const Chat = require("../model/chatModel");

module.exports.getRecievers = async (req, res, next) => {
  try {
    // console.log(req.myId);
    const myId = req.myId;
    const recievers = await User.find({ _id: { $ne: myId } });
    res.status(200).json({
      success: true,
      recievers,
    });
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "Internal server error",
      },
    });
  }
};
module.exports.chatUploadDb = async (req, res, nex) => {
  const senderId = req.myId;
  const { senderName, recieverId, message } = req.body;

  try {
    const insertChat = await Chat.create({
      senderId: senderId,
      senderName: senderName,
      recieverId: recieverId,
      message: {
        text: message,
        image: "",
      },
    });
    console.log(insertChat);
    res.status(201).json({
      success: true,
      message: insertChat,
    });
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "Internal Server Error",
      },
    });
  }
};

module.exports.getChat = async (req, res) => {
  const myId = req.myId;
  const recieverId = req.params.id;
  try {
    let getAllChat = await Chat.find({
      $or: [
        { senderId: myId, recieverId: recieverId },
        { senderId: recieverId, recieverId: myId },
      ],
    });

    res.status(200).json({
      success: true,
      message: getAllChat,
    });
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "Internal Server Error",
      },
    });
  }
};

module.exports.sendImageChat = async (req, res, next) => {
    
  const senderId=req.myId;
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {

    const senderName=fields?.senderName&&fields?.senderName[0];
    const picName=fields?.picName&&fields?.picName[0];
    const recieverId=fields?.recieverId&&fields?.recieverId[0];
    files.image[0].originalFilename = picName;

    const newPath = __dirname + `/../../client/public/image/${picName}`;
    try {
      fs.copyFile(files.image[0].filepath, newPath, async (err) => {
        if (err) {
          res.status(500).json({
            error: {
              errorMessage: "internal server error",
            },
          });
        } else {
          const insertImageChat = await Chat.create({
            senderId: senderId,
            senderName: senderName,
            recieverId: recieverId,
            message: {
              text: "",
              image: files.image[0].originalFilename ,
            },
          });
          res.status(201).json({
            success:true,
            message:insertImageChat
          })
        }
      });
    } catch (error) {
        res.status(500).json({
          error: {
            errorMessage: "Internal Server Error",
          },
        });
    }
  });
};

module.exports.messageSeen = async (req,res) => {
  const messageId = req.body._id;

  await messageModel.findByIdAndUpdate(messageId, {
      status : 'seen' 
  })
  .then(() => {
       res.status(200).json({
            success : true
       })
  }).catch(() => {
       res.status(500).json({
            error : {
                 errorMessage : 'Internal Server Error'
            }
       })
  })
}
