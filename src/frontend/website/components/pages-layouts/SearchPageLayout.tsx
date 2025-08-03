export const SearchPageLayout = () => {
  return (
    <div className="px-5 py-10">
      <form className="flex  items-center max-w-sm mx-auto">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <input
            type="text"
            id="search"
            className="border border-gray-900 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-primary block w-full ps-10 p-2.5"
            placeholder="Search ..."
            required
          />
        </div>
        <button
          type="submit"
          className="cursor-pointer p-2.5 ms-2 text-sm font-medium text-white bg-primary rounded-lg border border-primary  focus:ring-4 focus:outline-none focus:ring-primary/55"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </form>
    </div>
  );
};
