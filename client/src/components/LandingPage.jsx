import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const LandingPage = () => {
  const [acc, setAcc] = useState([]);
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
  return (
    <>
      <section class="bg-white dark:bg-gray-900">
        <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div class="mr-auto place-self-center lg:col-span-7">
            <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              Best Place to Sell and Buy the Articles.
            </h1>
            <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Companies around the world use ChainList Crypto Market to get their articles.
            </p>
            <Link
              onClick={getMetaMaskAccounts}
              to={'/'}
              class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              <div className="px-2">Connect MetaMask</div>
              <svg
                version="1.1"
                baseProfile="basic"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 33.9 31.3"
                xml:space="preserve"
                style={{ width: '25px', height: 'auto' }}
              >
                <path
                  fill="#E17726"
                  stroke="#E17726"
                  stroke-width="0.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M32.1,0.1L18.9,9.8
	l2.4-5.7L32.1,0.1z"
                />
                <path
                  fill="#E27625"
                  stroke="#E27625"
                  stroke-width="0.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M1.8,0.1l13,9.8
	l-2.3-5.8L1.8,0.1z"
                />
                <path
                  fill="#E27625"
                  stroke="#E27625"
                  stroke-width="0.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M27.4,22.7L23.9,28
	l7.5,2.1l2.1-7.3L27.4,22.7z"
                />
                <path
                  fill="#E27625"
                  stroke="#E27625"
                  stroke-width="0.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M0.4,22.8l2.1,7.3
	L10,28l-3.5-5.3L0.4,22.8z"
                />
                <path
                  fill="#E27625"
                  stroke="#E27625"
                  stroke-width="0.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.6,13.6l-2.1,3.1
	l7.4,0.3l-0.2-8L9.6,13.6z"
                />
                <path
                  fill="#E27625"
                  stroke="#E27625"
                  stroke-width="0.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M24.3,13.6l-5.2-4.6
	l-0.2,8.1l7.4-0.3L24.3,13.6z"
                />
                <path
                  fill="#E27625"
                  stroke="#E27625"
                  stroke-width="0.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10,28l4.5-2.2
	l-3.9-3L10,28z"
                />
                <path
                  fill="#E27625"
                  stroke="#E27625"
                  stroke-width="0.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.4,25.8l4.5,2.2
	l-0.6-5.2L19.4,25.8z"
                />
                <path
                  fill="#D5BFB2"
                  stroke="#D5BFB2"
                  stroke-width="0.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M23.9,28l-4.5-2.2
	l0.4,2.9l0,1.2L23.9,28z"
                />
                <path
                  fill="#D5BFB2"
                  stroke="#D5BFB2"
                  stroke-width="0.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10,28l4.2,2l0-1.2
	l0.4-2.9L10,28z"
                />
                <path
                  fill="#233447"
                  stroke="#233447"
                  stroke-width="0.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.2,20.9l-3.7-1.1
	l2.6-1.2L14.2,20.9z"
                />
                <path
                  fill="#233447"
                  stroke="#233447"
                  stroke-width="0.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.6,20.9l1.1-2.3
	l2.6,1.2L19.6,20.9z"
                />
                <path
                  fill="#CC6228"
                  stroke="#CC6228"
                  stroke-width="0.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10,28l0.6-5.3
	l-4.1,0.1L10,28z"
                />
                <path
                  fill="#CC6228"
                  stroke="#CC6228"
                  stroke-width="0.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M23.2,22.7l0.6,5.3
	l3.5-5.2L23.2,22.7z"
                />
                <path
                  fill="#CC6228"
                  stroke="#CC6228"
                  stroke-width="0.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M26.4,16.8l-7.4,0.3
	l0.7,3.8l1.1-2.3l2.6,1.2L26.4,16.8z"
                />
                <path
                  fill="#CC6228"
                  stroke="#CC6228"
                  stroke-width="0.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.5,19.8l2.6-1.2
	l1.1,2.3l0.7-3.8l-7.4-0.3L10.5,19.8z"
                />
                <path
                  fill="#E27525"
                  stroke="#E27525"
                  stroke-width="0.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7.5,16.8l3.1,6.1
	l-0.1-3L7.5,16.8z"
                />
                <path
                  fill="#E27525"
                  stroke="#E27525"
                  stroke-width="0.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M23.4,19.8l-0.1,3
	l3.1-6.1L23.4,19.8z"
                />
                <path
                  fill="#E27525"
                  stroke="#E27525"
                  stroke-width="0.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.9,17.1l-0.7,3.8
	l0.9,4.5l0.2-5.9L14.9,17.1z"
                />
                <path
                  fill="#E27525"
                  stroke="#E27525"
                  stroke-width="0.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M18.9,17.1l-0.4,2.4
	l0.2,5.9l0.9-4.5L18.9,17.1z"
                />
                <path
                  fill="#F5841F"
                  stroke="#F5841F"
                  stroke-width="0.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.6,20.9l-0.9,4.5
	l0.6,0.4l3.9-3l0.1-3L19.6,20.9z"
                />
                <path
                  fill="#F5841F"
                  stroke="#F5841F"
                  stroke-width="0.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.5,19.8l0.1,3
	l3.9,3l0.6-0.4l-0.9-4.5L10.5,19.8z"
                />
                <path
                  fill="#C0AC9D"
                  stroke="#C0AC9D"
                  stroke-width="0.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.7,30l0-1.2
	l-0.3-0.3h-5l-0.3,0.3l0,1.2L10,28l1.5,1.2l2.9,2h5.1l3-2l1.4-1.2L19.7,30z"
                />
                <path
                  fill="#161616"
                  stroke="#161616"
                  stroke-width="0.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.4,25.8l-0.6-0.4
	h-3.7l-0.6,0.4l-0.4,2.9l0.3-0.3h5l0.3,0.3L19.4,25.8z"
                />
                <path
                  fill="#763E1A"
                  stroke="#763E1A"
                  stroke-width="0.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M32.6,10.5l1.1-5.4
	l-1.7-5L19.4,9.5l4.9,4.1l6.9,2l1.5-1.8L32,13.4l1.1-1l-0.8-0.6l1.1-0.8L32.6,10.5z"
                />
                <path
                  fill="#763E1A"
                  stroke="#763E1A"
                  stroke-width="0.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M0.1,5.1l1.1,5.4
	L0.5,11l1.1,0.8l-0.8,0.6l1.1,1l-0.7,0.5l1.5,1.8l6.9-2l4.9-4.1L1.8,0.1L0.1,5.1z"
                />
                <path
                  fill="#F5841F"
                  stroke="#F5841F"
                  stroke-width="0.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M31.2,15.6l-6.9-2
	l2.1,3.1l-3.1,6.1l4.1-0.1h6.1L31.2,15.6z"
                />
                <path
                  fill="#F5841F"
                  stroke="#F5841F"
                  stroke-width="0.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.6,13.6l-6.9,2
	l-2.3,7.1h6.1l4.1,0.1l-3.1-6.1L9.6,13.6z"
                />
                <path
                  fill="#F5841F"
                  stroke="#F5841F"
                  stroke-width="0.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M18.9,17.1l0.4-7.6
	l2-5.4h-8.9l2,5.4l0.4,7.6l0.2,2.4l0,5.9h3.7l0-5.9L18.9,17.1z"
                />
              </svg>
            </Link>
            {/* <a
              href="#"
              class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Speak to Sales
            </a> */}
          </div>
          <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
              alt="mockup"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
