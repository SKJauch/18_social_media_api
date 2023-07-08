const {Thought,User} = require("../models")

const thoughtController = {
    async getThoughts(req,res) {
        try {
            const thoughts = await Thought.find() 
            res.json(thoughts)
        } catch (error) {
            res.status(500).json(error)
           
        }
    },

    async getSingleThought(req,res) {
        try {
            const thought = await Thought.findOne({
                _id: req.params.thoughtId
            })
            if (!thought) {
                return res.status(404).json("no thought found with that ID")
            }
            res.json(thought)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    async createThought(req,res) {
        try {
            const thought = await Thought.create(req.body)
            const user = await User.findOneAndUpdate({
                userName: req.body.userName
            }, {
                $push: {
                    thoughts: thought._id
                }
            }, {
                new: true
            })
             if (!user) {
                return res.status(404).json("thought created, no user found with that ID")
             }   
            res.json("thought created")

        } catch (error) {
            res.status(500).json(error)

        }
    },

    async updateThought(req,res) {
        try {
            const thought = await Thought.findOneAndUpdate({
              _id: req.params.thoughtId   
            },{
                $set: req.body
            },{
                runValidators: true,
                new: true
            })
            if (!thought) {
                return res.status(404).json("no thought with that ID")
            }
            res.json(thought)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}