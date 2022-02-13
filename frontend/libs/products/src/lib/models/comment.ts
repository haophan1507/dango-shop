import { User } from "@frontend/users";
import { Product } from "./product";

export class Comment {
  id?: string;
  product?: Product;
  user?: User;
  description?: string;
  rating?: number;
  dateCreated?: string;
}