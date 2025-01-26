import { User } from "./User";

export interface dbActionResponse {
  success: boolean;
  message: string;
  user?: User;
}
