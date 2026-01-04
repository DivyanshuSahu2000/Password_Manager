import React from "react";

const Footer = () => {
  return (
    <div className="dark:bg-slate-800 bg-green-100 dark:text-white text-zinc-800 flex flex-col justify-center items-center   w-full">
      <div className="logo font-bold dark:text-white text-zinc-800 text-2xl">
        <span className="text-green-500"> &lt;</span>

        <span>PassWor</span>
        <span className="text-green-500">ld/&gt;</span>
      </div>
      <div className="flex justify-center items-center">
        {" "}
        Created with <img
          className="w-7 mx-2"
          src="icons/heart.png"
          alt=""
        />{" "}
        by Divyanshu Sahu{" "}
      </div>
    </div>
  );
};

export default Footer;
