import { Product } from "./product";

export class Comment {
  id?: string;
  product?: Product;
  user?: any;
  description?: string;
  rating?: number;
  dateCreated?: string;
}