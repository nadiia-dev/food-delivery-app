import { use } from "react";
import Modal from "./Modal";
import CartContext from "../store/CartContext";
import { priceFormatter } from "../utils/priceFormatter";
import Button from "./UI/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { closeCart, showCheckout } from "../store/userProgressSlice";
import { RootState } from "../store/store";

const Cart = () => {
  const dispatch = useDispatch();
  const progress = useSelector(
    (state: RootState) => state.userProgress.progress
  );
  const cartCtx = use(CartContext);

  const cartTotal = cartCtx.items.reduce((acc, curValue) => {
    return acc + curValue.quantity * parseFloat(curValue.price);
  }, 0);

  const handleCloseCart = () => {
    dispatch(closeCart());
  };

  const handleGoToCheckout = () => {
    dispatch(showCheckout());
  };

  return (
    <Modal
      open={progress === "cart"}
      onClose={progress === "cart" ? handleCloseCart : null}
    >
      <h2 className="my-4 mx-0 text-xl font-bold">Your Cart</h2>
      <ul className="my-2 mx-0 p-0">
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            {...item}
            onAdd={() => cartCtx.addItem(item)}
            onRemove={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="flex justify-end mx-0 my-[2rem] text-lg font-bold text-stone-600">
        {priceFormatter.format(cartTotal)}
      </p>
      <p className="flex justify-end gap-4">
        <Button
          textOnly
          onClick={handleCloseCart}
          classes="text-stone-900 hover:text-stone-800"
        >
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
};

export default Cart;
