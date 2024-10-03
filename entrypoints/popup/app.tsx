function App() {
  return (
    <div className="flex flex-col items-center justify-center w-fit h-fit p-4 bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Welcome to ChatGtp Writer!
      </h1>
      <p className="text-gray-600 mb-4">
        Use AI on any website with ChatGtp Writer.
      </p>
      <a
        href="https://www.linkedin.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition duration-300"
      >
        Go to LinkedIn
      </a>
    </div>
  );
}

export default App;
