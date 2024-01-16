const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose)

const noteSchema = new mongoose.Schema(
  {
    user: {
      //needs to refer back to user
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true } //both created at and updated at
);

noteSchema.plugin(autoIncrement,{
  inc_field:"ticket",
  id:"ticketNums", //creates sepearate collection counter
  start_seq:500
})
module.exports = mongoose.model("User", noteSchema);
