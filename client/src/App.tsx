import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";

function App() {
  return (
    <Router>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <h1 className="font-extrabold text-[#222328] text-[32px]">Creativize</h1>
        <div className="flex gap-4">
          <Link to="/" className="font-inter font-medium bg-purple-600 text-white px-4 py-2 rounded-md">
            Home
          </Link>
          <Link to="/create" className="font-inter font-medium bg-indigo-600 text-white px-4 py-2 rounded-md">
            Create
          </Link>
        </div>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9f8fe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
