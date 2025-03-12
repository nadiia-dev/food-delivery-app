import { use } from "react";
import logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

const Header = () => {
  const cartCtx = use(CartContext);
  const userProgressCtx = use(UserProgressContext);
  const totalCrtItems = cartCtx.items.reduce((acc, curValue) => {
    return acc + curValue.quantity;
  }, 0);

  const handleOpenCart = () => {
    userProgressCtx.showCart();
  };

  return (
    <header className="flex justify-between items-center py-[3rem] px-[10%]">
      <div className="flex items-center gap-[1rem]">
        <img
          src={logo}
          alt="A restaurant"
          className="w-[4rem] h-[4rem] object-contain rounded-full border-2 border-yellow-400"
        />
        <h1>React Food</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleOpenCart}>
          Cart({totalCrtItems})
        </Button>
      </nav>
    </header>
  );
};

export default Header;
