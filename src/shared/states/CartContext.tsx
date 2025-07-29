import { createContext, ReactNode, useReducer } from 'react';

// Define types for the CartItem
interface CartItem {
  imdbID: string;
  name: string;
  price: number;
  quantity: number;
}

// Define the context value type
export interface CartContextType {
  items: CartItem[];
  addItemToCart: (imdbID: string, title: string, price: number) => void;
  updateItemQuantity: (imdbID: string, amount: number) => void;
}

// Define the action type for reducer
interface CartAction {
  type: 'ADD_ITEM' | 'UPDATE_ITEM';
  payload: { imdbID: string; title?: string; price?: number; amount?: number };
}

// Default context value
const defaultContextValue: CartContextType = {
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
};

export const CartContext = createContext<CartContextType>(defaultContextValue);

// Reducer function to handle actions
function cartReducer(state: { items: CartItem[] }, action: CartAction) {
  const { type, payload } = action;
  if (type === 'ADD_ITEM') {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.imdbID === payload.imdbID
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      // Update quantity if item exists
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // Add new item to cart
      updatedItems.push({
        imdbID: payload.imdbID,
        name: payload.title as string,
        price: payload.price as number,
        quantity: 1,
      });
    }

    return {
      ...state,
      items: updatedItems,
    };
  } else if (type === 'UPDATE_ITEM') {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.imdbID === payload.imdbID
    );

    const updatedItem = { ...updatedItems[updatedItemIndex] };
    updatedItem.quantity += payload.amount || 0; // Fallback to 0 if amount is undefined

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems,
    };
  }
  return state;
}

// CartContextProvider component to provide the context
interface CartContextProviderProps {
  children: ReactNode;
}

export default function CartContextProvider({ children }: CartContextProviderProps) {
  const [shoppingCartState, setShoppingCartReducer] = useReducer(cartReducer, {
    items: [],
  });

  function handleAddItemToCart(imdbID: string, title: string, price: number) {
    setShoppingCartReducer({
      type: 'ADD_ITEM',
      payload: { imdbID, title, price },
    });
  }

  function handleUpdateCartItemQuantity(imdbID: string, amount: number) {
    setShoppingCartReducer({
      type: 'UPDATE_ITEM',
      payload: { imdbID, amount },
    });
  }

  const cartCtx = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={cartCtx}>{children}</CartContext.Provider>
  );
}
