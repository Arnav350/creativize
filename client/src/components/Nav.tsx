import { Link } from "react-router-dom";

function Nav() {
  return (
    <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <h1 className="font-extrabold text-[#222328] text-[36px]">Creativize</h1>
      <div className="flex gap-4">
        <Link
          to="/"
          className="text-white bg-purple-600 font-semibold rounded-md text-sm w-full px-5 py-2.5 text-center"
        >
          Home
        </Link>
        <Link
          to="/create"
          className="text-white bg-indigo-600 font-semibold rounded-md text-sm w-full px-5 py-2.5 text-center"
        >
          Create
        </Link>
      </div>
    </header>
  );
}

export default Nav;
