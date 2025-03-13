import { use } from "react";
import { priceFormatter } from "../utils/priceFormatter";
import { Meal } from "../types/meals";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";

const MealItem = ({ meal }: { meal: Meal }) => {
  const apiUrl = import.meta.env.VITE_API_URI;
  const cartCtx = use(CartContext);

  const handleAddMeal = (meal: Meal) => {
    cartCtx.addItem({ ...meal, quantity: 1 });
  };

  return (
    <li className="bg-stone-950 rounded-md overflow-hidden text-center shadow-md">
      <article className="h-full flex flex-col justify-between">
        <img
          src={`${apiUrl}/${meal.image}`}
          alt={meal.name}
          className="w-full h-[20rem] object-cover"
        />
        <div>
          <h3 className="text-xl font-bold my-3">{meal.name}</h3>
          <p className="inline-block bg-stone-900 text-yellow-400 text-sm font-bold py-2 px-8 rounded-md">
            {priceFormatter.format(parseFloat(meal.price))}
          </p>
          <p className="m-4">{meal.description}</p>
        </div>
        <p className="mb-[1.5rem]">
          <Button onClick={() => handleAddMeal(meal)}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
};

export default MealItem;
