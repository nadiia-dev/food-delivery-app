import Cart from "./components/Cart";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./store/CartContext";
import { UserContextProvider } from "./store/UserProgressContext";

function App() {
  return (
    <CartContextProvider>
      <UserContextProvider>
        <Header />
        <Meals />
        <Cart />
      </UserContextProvider>
    </CartContextProvider>
  );
}

export default App;
