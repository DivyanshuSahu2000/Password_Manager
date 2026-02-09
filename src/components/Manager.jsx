import React, { useRef, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { v4 } from "uuid";

const Manager = () => {
  const [form, setForm] = useState({
    site: "",
    username: "",
    password: "",
  });

  const ref = useRef();
  const passwordRef = useRef();
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);
  const savedPasswords = () => {
    toast("Password saved!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setPasswordArray([...passwordArray, { ...form, id: v4() }]);
    localStorage.setItem(
      "passwords",
      JSON.stringify([...passwordArray, { ...form, id: v4() }])
    );
    setForm({ site: "", username: "", password: "" });

    console.log([...passwordArray, form]);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const showPassword = () => {
    if (passwordRef.current.type === "password") {
      passwordRef.current.type = "text";
      ref.current.src = "icons/eyecross.png";
    } else {
      passwordRef.current.type = "password";
      ref.current.src = "icons/eye.png";
    }
  };
  const copyText = (text) => {
    toast.info("Copy in clipboard", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };
  const deletePassword = (id) => {
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
    localStorage.setItem(
      "passwords",
      JSON.stringify(passwordArray.filter((item) => item.id !== id))
    );
    toast("Password Deleted!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const editPassword = (id) => {
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
    setForm(passwordArray.find((item) => item.id == id));
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="  md:container md:px-25 md:py-8 md:mx-auto p-3 min-h-[88.2vh] ">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-700">&lt;</span>
          <span>PassWor</span>
          <span className="text-green-700">ld/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center dark:text-zinc-200 ">
          Your Password Manager
        </p>
        <div className="  flex flex-col p-4 text-black dark:text-amber-50 gap-5 items-center">
          <input
            onChange={handleChange}
            value={form.site}
            className="rounded-full border-2 border-green-400 w-full px-4 py-1"
            type="text"
            name="site"
            placeholder="Enter Websie URL"
          />
          <div className="flex  w-full gap-8 justify-between md:flex-row flex-col ">
            <input
              onChange={handleChange}
              value={form.username}
              className="rounded-full border-2 border-green-400 w-full px-4 py-1"
              type="text"
              name="username"
              placeholder="Enter Usernme"
            />
            <div className=" relative  ">
              <input
                value={form.password}
                onChange={handleChange}
                ref={passwordRef}
                className="rounded-full border-2 border-green-400 w-full px-4 py-1"
                type="password"
                name="password"
                placeholder="Enter Password"
              />
              <span
                className="absolute right-[4px] top-[4px] cursor-pointer  "
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="icons/eye.png"
                  alt=""
                />
              </span>
            </div>
          </div>
          <button
            disabled={!form.username || !form.site || !form.password}
            onClick={savedPasswords}
            className="flex justify-center cursor-pointer items-center bg-green-500 hover:bg-green-400 px-7 text-md font-medium  py-2 rounded-full w-fit gap-1  border-2 border-green-900"
          >
            <lord-icon
              style={{
                width: "25px",
                height: "25px",
              }}
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Add
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div> No passwords to show</div>}
          {passwordArray.length != 0 && (
            <>
              <div className="mobile dark:text-amber-50 md:hidden">
                <table className=" gap-1 flex flex-col table-auto border-collapse  w-full md:hidden">
                  {passwordArray.map((item, index) => (
                    <tbody key={index} className="dark:text-amber-50">
                      <tr>
                        <th className="bg-green-500 text-white dark:text-amber-50 px-4 py-2 border border-gray-300 text-left">
                          Site
                        </th>
                        <td className="py-2 px-1 border border-white text-center align-top">
                          <div className="flex items-center justify-between break-all ">
                            <a href={item.site} target="_blank">
                              {item.site}
                            </a>
                            <div
                              className="lordiconcopy size-7 cursor-pointer flex-shrink-0 "
                              onClick={() => {
                                copyText(item.site);
                              }}
                            >
                              <lord-icon
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                }}
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th className="bg-green-500 text-white px-4 py-2 border border-gray-300 text-left">
                          Username
                        </th>
                        <td className="py-2 px-1 dark:text-amber-50 border border-white text-center align-top">
                          <div className="flex items-center justify-between w-full break-all">
                            <span>{item.username}</span>
                            <div
                              className="lordiconcopy size-7 cursor-pointer flex-shrink-0 "
                              onClick={() => {
                                copyText(item.username);
                              }}
                            >
                              <lord-icon
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                }}
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th className="bg-green-500 text-white px-4 py-2 border border-gray-300 text-left">
                          Password
                        </th>
                        <td className="py-2 px-1 border border-white text-center align-top ">
                          <div className="flex items-center justify-between break-all ">
                            <span>{item.password}</span>
                            <div
                              className="lordiconcopy size-7 cursor-pointer flex-shrink-0 "
                              onClick={() => {
                                copyText(item.password);
                              }}
                            >
                              <lord-icon
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                }}
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th className="bg-green-500 text-white px-4 py-2 border border-gray-300 text-left">
                          Actions
                        </th>
                        <td className="justify-between py-2 border border-white  ">
                          <span
                            className="cursor-pointer mx-3"
                            onClick={() => {
                              editPassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/gwlusjdu.json"
                              trigger="hover"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </span>
                          <span
                            className="cursor-pointer mx-1"
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/skkahier.json"
                              trigger="hover"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
              {/* reponsiveTable above 768px */}
              <table className=" pc-sec table-auto w-full rounded-md overflow-hidden mb-10 hidden md:table">
                <thead className="bg-green-800  text-white">
                  <tr>
                    <th className="py-2">Site</th>
                    <th className="py-2">Username</th>
                    <th className="py-2">Password</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-green-100 dark:text-zinc-800">
                  {passwordArray.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="py-2 border border-white text-blue-900 text-center">
                          <div className="flex items-center justify-center ">
                            <a href={item.site} target="_blank">
                              {item.site}
                            </a>
                            <div
                              className="lordiconcopy size-7 cursor-pointer"
                              onClick={() => {
                                copyText(item.site);
                              }}
                            >
                              <lord-icon
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                }}
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 border border-white text-center">
                          <div className="flex items-center justify-center ">
                            <span>{item.username}</span>
                            <div
                              className="lordiconcopy size-7 cursor-pointer"
                              onClick={() => {
                                copyText(item.username);
                              }}
                            >
                              <lord-icon
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                }}
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 border border-white text-center">
                          <div className="flex items-center justify-center ">
                            <span>{item.password}</span>
                            <div
                              className="lordiconcopy size-7 cursor-pointer"
                              onClick={() => {
                                copyText(item.password);
                              }}
                            >
                              <lord-icon
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                }}
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="justify-center py-2 border border-white text-center">
                          <span
                            className="cursor-pointer mx-1"
                            onClick={() => {
                              editPassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/gwlusjdu.json"
                              trigger="hover"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </span>
                          <span
                            className="cursor-pointer mx-1"
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/skkahier.json"
                              trigger="hover"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
