const { User, Thought } = require("../models");

const userController = {
  async getUser(req, res) {
    try {
      const user = await User.find();
      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select("-__v")
        .lean();

      if (!user) {
        return res.status(404).json({ message: "No user found with that ID" });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({
        _id: req.params.userId,
      });

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }

      const thought = await Thought.findOneAndUpdate(
        { user: req.params.userId },
        { $pull: { user: req.params.userId } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({
          message: "Student deleted, but no thoughts found",
        });
      }

      res.json({ message: "User successfully deleted" });
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
