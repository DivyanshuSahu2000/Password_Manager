import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
import Footer from "./components/Footer";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

function App() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <div
        className="bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]
       dark:bg-gray-700
  bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),
      linear-gradient(to_bottom,#8080800a_1px,transparent_1px)]
  dark:bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),
          linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)]
  bg-[size:14px_24px]
  dark:text-amber-100
      
      "
      >
        <Manager />
      </div>
      <Footer />
    </>
  );
}

export default App;
