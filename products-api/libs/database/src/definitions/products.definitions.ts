export interface productsI {
  id?: number;
  user_id?: string;
  product_name: string;
  product_description?: string;
  product_price: string;
  product_state_id?: number;
  product_category_id: number;
  product_subcategory_id: number;
  product_images?: any;
}
