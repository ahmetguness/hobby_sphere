import { User } from "./User";
import { Post } from "./db_models/Post";

export interface dbActionResponse {
  success: boolean;
  message: string;
  user?: User;
  post?: Post;
}
