const Error = ({ title, message }: { title: string; message: string }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-red-500 text-white rounded-md p-6 shadow-lg max-w-lg w-full text-center">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-lg">{message}</p>
      </div>
    </div>
  );
};

export default Error;
