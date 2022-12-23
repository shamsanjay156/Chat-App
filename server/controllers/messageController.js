const Messages = require('../models/messageModel')

module.exports.addMessages = async (req, res) => {
    try {
        const { from, to, message } = req.body
        const data = await Messages.create({
            message: { text: message },
            users: [from, to],
            sender: from,
        })
        if (!data)
            return res.status(400).json({
                message: 'Failed to add message'
            })
        return res.status(200).json({
            message: "Message added successfully."
        })


    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'internal server error'
        })
    }


}
module.exports.getMessgaes = async (req, res) => {
    try {
        const { from, to } = req.body;
        console.log(from, to)
        await Messages.find({
            users: {
                $all: [from, to],
            },
        }).sort({ updatedAt: 1 }).exec((err, response) => {
            if (!err)
                console.log('messages', response)
            const projectedMessages = response.map((msg) => {
                return {
                    fromSelf: msg.sender.toString() === from,
                    message: msg.message.text,
                };
            });
            res.status(200).json({messages:projectedMessages});
        })

    } catch (er) {
        console.log(err)
        res.status(500).json({
            message: 'internal server error'
        })
    }
}
