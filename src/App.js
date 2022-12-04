import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Forecast from "./pages/Forecast";
import Settings from "./pages/Settings";
import Navbar from "./components/layout/Navbar";
import { HomeProvider } from "./context/HomeContext";


function App() {
  return (
    <>
      <HomeProvider>
        <Router >
          <div className="container mx-auto px-4 flex flex-col justify-between h-screen">
            <main className="py-6">
              <Routes>
                <Route path='/*' element={<Home />} />
                <Route path='/search' element={<Search />} />
                <Route path='/forecast' element={<Forecast />} />
                <Route path='/settings' element={<Settings />} />
              </Routes>
            </main>
          </div>
          <Navbar />
        </Router>
      </HomeProvider>
    </>
  );
}

export default App;
