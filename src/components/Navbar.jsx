import React from "react";

const Navbar = ({ theme, toggleTheme }) => {
  return (
    <>
      {" "}
      <nav className="bg-green-100 dark:bg-gray-900 text-white dark:text-zinc-900 md:px-10 ">
        <div className="container mx-auto flex justify-between items-center px-4 py-5 h-14">
          <div className="logo font-bold dark:text-white  text-zinc-900 text-2xl">
            <span className="text-green-500"> &lt;</span>

            <span className=" text-zinc-900 dark:text-white ">PassWor</span>
            <span className="text-green-500">ld/&gt;</span>
          </div>
          <button onClick={toggleTheme} className="p-2 mx-2 rounded-full ">
            <span className="text-xl">{theme === "light" ? "🌙" : "☀️"}</span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
