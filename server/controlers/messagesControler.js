const messageModel = require("../model/messageModel");

module.exports.addMessage = async (req, res, next) => {
    try{
        const {from, to , message} = req.body;

        if (!message || !message.text) {
            return res.status(400).json({ error: "Message text is required" });
          }
        const data = await messageModel.create({
            message: {text: message.text},
            users: [from, to],
            sender: from,
        })
        if(data) return res.json({msg: "Message added successfully"});
        return res.json({msg: "Failed to add message to the database."})
    }catch(ex){
        next(ex)
    }
};
module.exports.getAllMessage = async (req, res, next) => {
    try{
        const {from, to} = req.body;
        const messages = await messageModel.find({
            users: {
                $all: [from, to],
            },
        })
        .sort({updatedAt: 1});
        const projectedMessages = messages.map((mes)=>{
            return{
                fromSelf: mes.sender.toString() === from,
                messages: mes.message.text,
            };
        });
        res.json(projectedMessages)
    }catch(ex){
        next(ex);
    }
};
