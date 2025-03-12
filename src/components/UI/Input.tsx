const Input = ({ id, label, ...props }: { id: string; label: string }) => {
  return (
    <div className="my-2 mx-0 flex flex-col">
      <label htmlFor={id} className="font-bold mb-2">
        {label}
      </label>
      <input
        id={id}
        name={id}
        className="w-full max-w-[20rem] p-2 rounded-md border-1 border-gray-300"
        required
        {...props}
      />
    </div>
  );
};

export default Input;
