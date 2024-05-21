import { useState, useEffect } from "react";
import React from "react";
import { Link,useLocation } from "react-router-dom";
import Web3 from "web3";
const pp = '../assets/profile-picture-5.jpg'
const Navbar = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[1]; // split the URL by '/' and get the second part
  // console.log(id);
  const web3 = new Web3();
  const [acc, setAcc] = useState([]);
  const [acc1, setAcc1] = useState([]);
  const getMetaMaskAccounts = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        // console.log(accounts);
        setAcc(accounts);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("MetaMask is not installed");
    }
  };
  
  useEffect(() => {
    // getMetaMaskAccounts();
  }, []);

  return (
    <>
      <header className="">
        <nav className="bg-white border-gray-200 px-4 lg:px-6 dark:bg-gray-800 py-3">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex justify-start items-center">
              <Link to={'/'}>
              <span className=" px-3 self-center text-2xl whitespace-nowrap dark:text-white font-bold">
                ChainList Crypto Market
              </span>
              </Link>
            </div>
            <button
              onClick={getMetaMaskAccounts}
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
              class="hidden z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100
              shadow dark:bg-gray-700 dark:divide-gray-600"
              id="dropdown"
            >
              {acc.map((id,index) => (
                <div  className="py-3 px-4" key={id}>                   
                  <Link onClick={()=>setAcc1(id)} to={`/${id.toLowerCase()}`}>
                    <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                      Account {index+1}
                    </span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                      {id.toLowerCase()}
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
