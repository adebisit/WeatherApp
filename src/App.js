import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Forecast from "./pages/Forecast";
import Settings from "./pages/Settings";
import Navbar from "./components/layout/Navbar";
import { WeatherProvider } from "./context/weather/WeatherContext";
import { SearchProvider } from "./context/search/SearchContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <WeatherProvider>
        <SearchProvider>
          <Router >
            <div className="container mx-auto px-4 flex flex-col justify-between h-screen">
              <main className="py-6">
                <Routes>
                  <Route path='/*' element={<Home />} />
                  <Route path='/search' element={<Search />} />
                  <Route path='/forecast' element={<Forecast />} />
                  <Route path='/settings/*' element={<Settings />} />
                </Routes>
              </main>
            </div>
            <ToastContainer autoClose={8000} className="toastPopUp"/>
            <Navbar />
          </Router>
        </SearchProvider>
      </WeatherProvider>
    </>
  );
}

export default App;
