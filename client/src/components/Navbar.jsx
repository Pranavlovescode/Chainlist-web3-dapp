import { useState, useEffect } from "react";
import React from "react";
import { Link,useLocation } from "react-router-dom";
import Web3 from "web3";
const pp = '../assets/profile-picture-5.jpg'
const Navbar = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[1]; // split the URL by '/' and get the second part
  // console.log(id);
  const web3 = new Web3("https://linea-sepolia.public.blastapi.io");
  const [acc, setAcc] = useState([]);
  const [acc1, setAcc1] = useState([]);
  const getAllAccounts = async () => {
    const accounts = await web3.eth.getAccounts();
    setAcc(accounts);
  };
  
  useEffect(() => {
    getAllAccounts();
  }, []);

  return (
    <>
      <header className="">
        <nav className="bg-white border-gray-200 px-4 lg:px-6 dark:bg-gray-800 py-3">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex justify-start items-center">
              <span className=" px-3 self-center text-2xl whitespace-nowrap dark:text-white font-bold">
                ChainList Crypto Market
              </span>
            </div>
            <button
              type="button"
              class="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="dropdown"
              >
                {/* <div className="px-2">{id}</div> */}
              <span class="sr-only">Open user menu</span>
              <img
                class="w-8 h-8 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="user photo"
                />
            </button>
            
            <div
              class="hidden z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
              id="dropdown"
            >
              {acc.map((id) => (
                <div  className="py-3 px-4" key={id}>                   
                  <Link onClick={()=>setAcc1(id)} to={`/${id}`}>
                    <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                      Ganache
                    </span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                      {id}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
