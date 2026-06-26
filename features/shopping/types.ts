export type ShoppingItem = {
  id: string;
  name: string;
  bought: boolean;
};

export type ShoppingList = {
  id: string;
  title: string;
  items: ShoppingItem[];
  createdAt: string;
};
