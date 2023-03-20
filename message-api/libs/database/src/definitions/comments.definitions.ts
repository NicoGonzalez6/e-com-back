export interface commentsModelI {
  id?: number;
  product_id: number;
  user_id: string;
  responded: boolean;
  comment_state: 'enabled' | 'disabled';
  message: string;
}
