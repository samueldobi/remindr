export const BILL_CATEGORIES = [
  { name: 'Utility', icon: 'flash-outline' },
  { name: 'Housing', icon: 'home-outline' },
  { name: 'Transport', icon: 'car-outline' },
  { name: 'Food', icon: 'restaurant-outline' },
  { name: 'Health', icon: 'medkit-outline' },
  { name: 'Insurance', icon: 'shield-outline' },
  { name: 'Subscription', icon: 'wifi-outline' },
  { name: 'Other', icon: 'receipt-outline' },
] as const;

export const CATEGORY_ICON_MAP: Record<string, string> = {};
for (const c of BILL_CATEGORIES) {
  CATEGORY_ICON_MAP[c.name] = c.icon;
}
