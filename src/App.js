import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Header } from "./components";
import { Home, Watchlist, Portfolio } from "./pages";

function App() {
  // const theme = useSelector((state) => state.local.theme);

//   useEffect(() => {
//     if (theme === 'dark') {
//         document.body.setAttribute('data-theme', 'dark');
//     } else {
//         document.body.setAttribute('data-theme', 'light');
//     }
// }, [theme]);

useEffect(() => {
    // if (theme === 'dark') {
    //     document.body.setAttribute('data-theme', 'dark');
    // } else {
        document.body.setAttribute('data-theme', 'light');
    // }
}, []);

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
