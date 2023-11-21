import Comment from "../entities/Comment";
import users from "./users";

const comments: Comment[] = [];

for (let i = 0; i < 20; i++) {
  const newComment: Comment = {
    _id: `comment${i}`,
    text: `This is comment ${i + 1}`,
    userId: `${users[i]?._id}`,
    entryId: `entry_${i}`,
    likes: [],
    timestamp: new Date(),
  };

  comments.push(newComment);
}

export default comments;
