import { use } from "react";
import { priceFormatter } from "../utils/priceFormatter";
import Modal from "./Modal";
import CartContext from "../store/CartContext";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const Checkout = () => {
  const apiUrl = import.meta.env.VITE_API_URI;
  const cartCtx = use(CartContext);
  const userProgressCtx = use(UserProgressContext);
  const { data, error, isLoading, sendRequest, clearData } = useHttp({
    url: `${apiUrl}/orders`,
    config: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
  });

  const cartTotal = cartCtx.items.reduce((acc, curValue) => {
    return acc + curValue.quantity * parseFloat(curValue.price);
  }, 0);

  const handleCloseCheckout = () => {
    userProgressCtx.closeCheckout();
  };

  const handleCreateOrder = (fd: FormData) => {
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  };

  const handleClose = () => {
    userProgressCtx.closeCheckout();
    cartCtx.clearCart();
    clearData();
  };

  let actions = (
    <>
      <Button
        textOnly
        type="button"
        onClick={handleCloseCheckout}
        classes="text-stone-900 hover:text-stone-800"
      >
        Close
      </Button>
      <Button>Submit order</Button>
    </>
  );

  if (isLoading) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleCloseCheckout}
      >
        <h2>Success!</h2>
        <p>Your order was successfully submitted</p>
        <p>We will get back to you with more details on email soon</p>
        <p className="flex justify-end gap-4">
          <Button textOnly type="button" onClick={handleClose}>
            Okay
          </Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={handleCloseCheckout}
    >
      <form action={handleCreateOrder}>
        <h2 className="my-4 mx-0 font-bold text-xl">Checkout</h2>
        <p className="my-2 mx-0 p-0">
          Total Amount: {priceFormatter.format(cartTotal)}
        </p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="E-mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />

        <div className="flex justify-start gap-4 ">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {error && <Error title="Failed to submit the order" message={error} />}
        <p className="flex justify-end gap-4">{actions}</p>
      </form>
    </Modal>
  );
};

export default Checkout;
