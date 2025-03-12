import { createContext, ReactNode, useState } from "react";

interface Store {
  progress: string;
  showCart: () => void;
  closeCart: () => void;
  showCheckout: () => void;
  closeCheckout: () => void;
}

const UserProgressContext = createContext<Store>({
  progress: "",
  showCart: () => {},
  closeCart: () => {},
  showCheckout: () => {},
  closeCheckout: () => {},
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [userProgress, setUserProgress] = useState("");

  function showCart() {
    setUserProgress("cart");
  }

  function closeCart() {
    setUserProgress("");
  }

  function showCheckout() {
    setUserProgress("checkout");
  }
  function closeCheckout() {
    setUserProgress("");
  }

  const context = {
    progress: userProgress,
    showCart,
    closeCart,
    showCheckout,
    closeCheckout,
  };

  return <UserProgressContext value={context}>{children}</UserProgressContext>;
};

export default UserProgressContext;
