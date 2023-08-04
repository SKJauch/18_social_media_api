const { Schema, Types } = require("mongoose");
const dateFormat = require("../utils/date-format");
const { type } = require("util");
const reactionSchema = new Schema(
  {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },

    reactionBody: {
      type: String,
      required: true,
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

  },

  {
    toJSON: {
      getters: true,
    },
    id: false,
    _id: false,
  }
);

module.exports = reactionSchema;