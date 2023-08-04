const { Thought, User } = require("../models");

const thoughtController = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      });
      if (!thought) {
        return res.status(404).json("no thought found with that ID");
      }
      res.json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        {
          userName: req.body.userName,
        },
        {
          $push: {
            thoughts: thought._id,
          },
        },
        {
          new: true,
        }
      );
      if (!user) {
        return res
          .status(404)
          .json("thought created, no user found with that ID");
      }
      res.json("thought created");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        {
          _id: req.params.thoughtId,
        },
        {
          $set: req.body,
        },
        {
          runValidators: true,
          new: true,
        }
      );
      if (!thought) {
        return res.status(404).json("no thought with that ID");
      }
      res.json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async deleteThought(req, res) {
    try {
      
      const thought = await Thought.findOneAndUpdate(
        { user: req.params.thoughtId },
        { $pull: { user: req.params.thoughtId } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({
          message: "No thought found",
        });
      }

      res.json({ message: "Thought successfully deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  async addReaction(req, res) {
    try {
      console.log("You have added a reaction");
      console.log(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { reaction: req.body } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with that ID" });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  
  async removeReaction(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { reaction: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with that ID" });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = thoughtController;
