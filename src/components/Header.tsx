import logo from "../assets/logo.jpg";
import Button from "./UI/Button";

const Header = () => {
  return (
    <header className="flex justify-between items-center py-[3rem] px-[10%]">
      <div className="flex items-center gap-[1rem]">
        <img
          src={logo}
          alt="A restaurant"
          className="w-[4rem] h-[4rem] object-contain rounded-full border-2 border-yellow-400"
        />
        <h1>React Food</h1>
      </div>
      <nav>
        <Button textOnly>Cart</Button>
      </nav>
    </header>
  );
};

export default Header;
