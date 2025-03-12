import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error";
import Loader from "./Loader";

export interface Meal {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
}

const Meals = () => {
  const apiUrl = import.meta.env.VITE_API_URI;

  const {
    data: meals,
    isLoading,
    error,
  } = useHttp({
    url: `${apiUrl}/meals`,
  });

  if (isLoading) return <Loader />;
  if (error) return <Error title="Failed to fetch meals" message={error} />;

  return (
    <ul className="w-[90%] max-w-[70rem] m-8 mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {meals && meals.map((meal) => <MealItem key={meal.id} meal={meal} />)}
    </ul>
  );
};

export default Meals;
