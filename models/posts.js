import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  username: { type: String }, 
  text: { type: String },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
