import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  textOnly?: boolean;
  classes?: string;
}

const Button = ({ children, textOnly, classes, ...props }: Props) => {
  const textButton =
    "font-inherit cursor-pointer bg-transparent border-none text-yellow-400 hover:text-yellow-500";
  const regularButton =
    "font-inherit cursor-pointer bg-yellow-400 border border-yellow-400 text-gray-900 py-2 px-6 rounded-md hover:bg-yellow-500 hover:border-yellow-500";
  return (
    <button
      className={clsx(textOnly ? textButton : regularButton, classes)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
