import { Link } from "raviger";
import { useState } from "react";
import { checkLoggedIn } from "../router/AppRouter";

function Navbar() {
  const [open, setOpen] = useState(false);

  const menuData = [
    {
      id: 1,
      name: "Home",
      link: "/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
          <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
        </svg>
      ),
    },
    // {
    //   id: 2,
    //   name: "Tasks",
    //   link: "/todos",
    //   icon: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       viewBox="0 0 24 24"
    //       fill="currentColor"
    //       className="w-5 h-5"
    //     >
    //       <path
    //         fillRule="evenodd"
    //         d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z"
    //         clipRule="evenodd"
    //       />
    //     </svg>
    //   ),
    // },
    {
      id: 3,
      name: checkLoggedIn() ? "Logout" : "Login",
      link: checkLoggedIn() ? "/logout" : "/login",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
          />
        </svg>
      ),
    },
  ];

  return (
    <div
      className={`bg-[#1E1F25] float-left min-h-screen ${
        open ? "w-72" : "w-16"
      } duration-500 text-gray-100 p-3 inline-block`}
    >
      <div className="py-3 flex justify-end" onClick={() => setOpen(!open)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>
      <div className="mt-4 flex flex-col gap-4 relative">
        {menuData.map((ele) =>
          ele.link === "/logout" ? (
            <Link
              className="group flex items-center text-sm gap-3.5 font-medium p-2 rounded-md hover:bg-[#37393f]"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
              }}
              href=""
              key={ele.id}
            >
              <div>{ele.icon}</div>
              <h2
                style={{ transitionDelay: `${ele.id + 3}00ms` }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {ele.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-[#272A30] font-semibold whitespace-pre text-gray-200 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:w-fit group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300`}
              >
                {ele.name}
              </h2>
            </Link>
          ) : (
            <Link
              className="group flex items-center text-sm gap-3.5 font-medium p-2 rounded-md hover:bg-[#37393f]"
              href={ele.link}
              key={ele.id}
            >
              <div>{ele.icon}</div>
              <h2
                style={{ transitionDelay: `${ele.id + 3}00ms` }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {ele.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-[#272A30] font-semibold whitespace-pre text-gray-200 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:w-fit group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300`}
              >
                {ele.name}
              </h2>
            </Link>
          )
        )}
      </div>
    </div>
  );
}

export default Navbar;
