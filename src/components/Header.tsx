import logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { showCart } from "../store/userProgressSlice";
import { RootState } from "../store/store";

const Header = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  const totalCrtItems = items.reduce((acc, curValue) => {
    return acc + curValue.quantity;
  }, 0);

  const handleOpenCart = () => {
    dispatch(showCart());
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
