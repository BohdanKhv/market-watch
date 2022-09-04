import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Header } from "./components";
import { Home, Watchlist, Portfolio } from "./pages";

function App() {
  return (
    <Router>
      <Navbar/>
      <Header/> 
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
