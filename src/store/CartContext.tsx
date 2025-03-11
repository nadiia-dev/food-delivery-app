import { createContext, ReactNode, useReducer } from "react";
import { Meal } from "../components/Meals";

export interface CartItem extends Meal {
  quantity: number;
}

export interface Store {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
}

const CartContext = createContext<Store>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
});

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; item: CartItem }
  | { type: "REMOVE_ITEM"; id: string };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  if (action.type === "ADD_ITEM") {
    const itemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const prevItems = [...state.items];

    if (itemIndex != -1) {
      const existingItem = state.items[itemIndex];
      const newItem = { ...existingItem, quantity: existingItem.quantity + 1 };
      prevItems[itemIndex] = newItem;
    } else {
      prevItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: prevItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const itemIndex = state.items.findIndex((item) => item.id === action.id);
    const existingItem = state.items[itemIndex];

    const updatedItems = [...state.items];

    if (itemIndex != -1) {
      if (existingItem.quantity === 1) {
        updatedItems.splice(itemIndex, 1);
      } else {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        };
        updatedItems[itemIndex] = updatedItem;
      }
    }
    return { ...state, items: updatedItems };
  }

  return state;
};

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  function addItem(item: CartItem) {
    dispatch({ type: "ADD_ITEM", item });
  }
  function removeItem(id: string) {
    dispatch({ type: "REMOVE_ITEM", id });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
  };

  return <CartContext value={cartContext}>{children}</CartContext>;
};

export default CartContext;
