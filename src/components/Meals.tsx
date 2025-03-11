import { useEffect, useState } from "react";

interface Meal {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
}

const Meals = () => {
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    async function fetchMeals() {
      try {
        const res = await fetch("http://localhost:3000/meals");
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
    <ul className="w-[90%] max-w-[70rem] m-8 mx-auto p-4 grid grid-cols-auto-fit min-[20rem] gap-4">
      {meals.map((meal) => (
        <li key={meal.id}>{meal.name}</li>
      ))}
    </ul>
  );
};

export default Meals;
