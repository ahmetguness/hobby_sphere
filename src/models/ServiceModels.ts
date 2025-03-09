import { User } from "./User";
import { Post } from "./db_models/Post";
import { Comment } from "./db_models/Comment";

export interface dbActionResponse {
  success: boolean;
  message: string;
  user?: User;
  post?: Post;
  posts?: Post[];
  comment?: Comment;
  comments?: Comment[];
}
