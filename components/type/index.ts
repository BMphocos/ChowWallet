type Screen = "dashboard" | "marketplace" | "history" | "profile";

interface Transaction {
  id: number;
  vendor: string;
  type: "debit" | "credit";
  amount: number;
  time: string;
  icon: string;
}

interface Vendor {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  minOrder: number;
  tags: string[];
  image: string;
  featured?: boolean;
  items: FoodItem[];
}

interface FoodItem {
  id: number;
  name: string;
  price: number;
  vendorId: number;
}
