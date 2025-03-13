import { priceFormatter } from "../utils/priceFormatter";
import Modal from "./Modal";
import Input from "./UI/Input";
import Button from "./UI/Button";
import useHttp from "../hooks/useHttp";
import Error from "./Error";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { closeCheckout } from "../store/userProgressSlice";
import { clearCart } from "../store/cartSlice";
import { orderSchema } from "../utils/validation";
import { useState } from "react";
import { z } from "zod";

const Checkout = () => {
  const dispatch = useDispatch();
  const progress = useSelector(
    (state: RootState) => state.userProgress.progress
  );
  const items = useSelector((state: RootState) => state.cart.items);
  const [validationError, setValidationError] = useState<
    Record<string, string>
  >({});

  const { data, error, isLoading, sendRequest, clearData } = useHttp({
    url: "orders",
    config: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
  });

  const cartTotal = items.reduce((acc, curValue) => {
    return acc + curValue.quantity * parseFloat(curValue.price);
  }, 0);

  const handleCloseCheckout = () => {
    dispatch(closeCheckout());
  };

  const handleCreateOrder = (fd: FormData) => {
    const customerData = Object.fromEntries(fd.entries());

    try {
      orderSchema.parse(customerData);
      setValidationError({});

      sendRequest(
        JSON.stringify({
          order: {
            items: items,
            customer: customerData,
          },
        })
      );
    } catch (e) {
      if (e instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        e.errors.forEach((err) => {
          const field = err.path[0];
          newErrors[field] = err.message;
        });

        setValidationError(newErrors);
      }
    }
  };

  const handleClose = () => {
    dispatch(closeCheckout());
    dispatch(clearCart());
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
      <Modal open={progress === "checkout"} onClose={handleCloseCheckout}>
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
    <Modal open={progress === "checkout"} onClose={handleCloseCheckout}>
      <form action={handleCreateOrder}>
        <h2 className="my-4 mx-0 font-bold text-xl">Checkout</h2>
        <p className="my-2 mx-0 p-0">
          Total Amount: {priceFormatter.format(cartTotal)}
        </p>

        <Input
          label="Full Name"
          type="text"
          id="name"
          error={validationError.name}
        />

        <Input
          label="E-mail Address"
          type="email"
          id="email"
          error={validationError.email}
        />

        <Input
          label="Street"
          type="text"
          id="street"
          error={validationError.street}
        />

        <div className="flex justify-start gap-4 ">
          <Input
            label="Postal Code"
            type="text"
            id="postalCode"
            error={validationError.postalCode}
          />
          <Input
            label="City"
            type="text"
            id="city"
            error={validationError.city}
          />
        </div>

        {error && <Error title="Failed to submit the order" message={error} />}
        <p className="flex justify-end gap-4">{actions}</p>
      </form>
    </Modal>
  );
};

export default Checkout;
