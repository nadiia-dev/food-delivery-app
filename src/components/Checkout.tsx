import { use } from "react";
import { priceFormatter } from "../utils/priceFormatter";
import Modal from "./Modal";
import CartContext from "../store/CartContext";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";

const Checkout = () => {
  const apiUrl = import.meta.env.VITE_API_URI;
  const cartCtx = use(CartContext);
  const userProgressCtx = use(UserProgressContext);

  const cartTotal = cartCtx.items.reduce((acc, curValue) => {
    return acc + curValue.quantity * parseFloat(curValue.price);
  }, 0);

  const handleCloseCheckout = () => {
    userProgressCtx.closeCheckout();
  };

  const handleCreateOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    const customerData = Object.fromEntries(fd.entries());

    fetch(`${apiUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      }),
    });
  };

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={handleCloseCheckout}
    >
      <form onSubmit={handleCreateOrder}>
        <h2 className="my-4 mx-0 font-bold text-xl">Checkout</h2>
        <p className="my-2 mx-0 p-0">
          Total Amount: {priceFormatter.format(cartTotal)}
        </p>

        <Input label="Full Name" type="text" id="full-name" />
        <Input label="E-mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />

        <div className="flex justify-start gap-4 ">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        <p className="flex justify-end gap-4">
          <Button
            textOnly
            type="button"
            onClick={handleCloseCheckout}
            classes="text-stone-900 hover:text-stone-800"
          >
            Close
          </Button>
          <Button>Submit order</Button>
        </p>
      </form>
    </Modal>
  );
};

export default Checkout;
