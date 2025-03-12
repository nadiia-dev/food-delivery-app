import { priceFormatter } from "../utils/priceFormatter";

interface Props {
  name: string;
  price: string;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

const CartItem = ({ name, price, quantity, onAdd, onRemove }: Props) => {
  return (
    <li className="flex justify-between items-center my-2 mx-0">
      <p className="m-0">
        {name} - {quantity} X {priceFormatter.format(parseFloat(price))}
      </p>
      <div className="flex items-center gap-4">
        <button
          onClick={onRemove}
          className="text-lg w-[1.5rem] h-[1.5rem] rounded-full bg-stone-600 text-yellow-400 flex justify-center items-center hover:bg-stone-800 hover:text-yellow-600"
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          onClick={onAdd}
          className="text-lg w-[1.5rem] h-[1.5rem] rounded-full bg-stone-600 text-yellow-400 flex justify-center items-center hover:bg-stone-800 hover:text-yellow-600"
        >
          +
        </button>
      </div>
    </li>
  );
};

export default CartItem;
