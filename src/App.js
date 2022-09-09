import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navbar, Header } from "./components";
import { Watchlist, Portfolio, Settings, ShareWatchlist, SharePortfolio, About } from "./pages";

function App() {
  const theme = useSelector((state) => state.local.theme);

  useEffect(() => {
    if (theme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    } else {
        document.body.setAttribute('data-theme', 'light');
    }
}, [theme]);

  return (
    <Router>
      <Navbar/>
      <Header/> 
      <div className="content">
        <Routes>
          <Route path="/" element={<Watchlist />} />
          <Route path="/watchlist/share" element={<ShareWatchlist />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/share" element={<SharePortfolio />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
