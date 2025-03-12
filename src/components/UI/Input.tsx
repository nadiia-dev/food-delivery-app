import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

const Input = ({ id, label, ...props }: Props) => {
  return (
    <div className="my-2 mx-0 flex flex-col">
      <label htmlFor={id} className="font-bold mb-2">
        {label}
      </label>
      <input
        id={id}
        name={id}
        className="w-full max-w-[20rem] p-2 rounded-md border-1 border-stone-300 bg-stone-50"
        required
        {...props}
      />
    </div>
  );
};

export default Input;
