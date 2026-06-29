export type ShoppingList = {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
};

export type ShoppingItem = {
  id: string;
  shopping_list_id: string;
  name: string;
  bought: boolean;
  created_at: string;
  updated_at: string;
};
