import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navbar, Header } from "./components";
import { Watchlist, Portfolio, Settings, Share } from "./pages";

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
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/share" element={<Share />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
