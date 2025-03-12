import { useEffect, useState } from "react";
import MealItem from "./MealItem";

export interface Meal {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
}

const Meals = () => {
  const apiUrl = import.meta.env.VITE_API_URI;
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    async function fetchMeals() {
      try {
        const res = await fetch(`${apiUrl}/meals`);
        const loadedMeals = await res.json();
        setMeals(loadedMeals);
      } catch (e) {
        if (e instanceof Error) {
          throw new Error(e.message);
        } else {
          throw new Error("Unexpected error");
        }
      }
    }
    fetchMeals();
  }, []);

  return (
    <ul className="w-[90%] max-w-[70rem] m-8 mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {meals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
};

export default Meals;
