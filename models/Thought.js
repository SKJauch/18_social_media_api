const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/date-format");
const reactionSchema = require("./Reaction");
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: ts => dateFormat(ts),
    },

    userName: {
        type: String,
        req: true,
    },

    reactions: [
      reactionSchema,
    ],

  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function(){
    return this.reactions.length
})
const Thought = model("thought", thoughtSchema);

module.exports = Thought;