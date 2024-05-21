import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";
import Web3 from "web3";
import { useNavigate, useLocation } from "react-router-dom";

const Test = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[1];
  const web3 = new Web3(window.ethereum);
  const data = useContext(DataContext);
  const [sellData, setSellData] = useState({
    name_of_article: null,
    desc: null,
    price: null,
  });
  console.log(data);

  const writeData = async () => {
    try {
      const result = await data.methods
        .sellArticle(
          sellData.name_of_article,
          sellData.desc,
          web3.utils.toWei(sellData.price, "ether")
        )
        .send({
          from: id,
          gas: 5000000,
        });
      // setState({ contract: data, web3: web3 });
      alert("Article has been sold successfully");
      navigate(`/${id}`);
      window.location.reload();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-2 mx-auto md:h-screen lg:py-0">
          <p
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900
           dark:text-white"
          >
            <p className="font-bold">Sell Article Page</p>
          </p>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Name of Article
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={sellData.name_of_article}
                  onChange={(e) =>
                    setSellData({
                      ...sellData,
                      name_of_article: e.target.value,
                    })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="XYZ"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Price of the Article (in ETH)
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={sellData.price}
                  onChange={(e) =>
                    setSellData({ ...sellData, price: e.target.value })
                  }
                  placeholder="0.1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Description
                </label>
                <input
                  type="text"
                  name="desc"
                  id="desc"
                  value={sellData.desc}
                  onChange={(e) =>
                    setSellData({ ...sellData, desc: e.target.value })
                  }
                  placeholder="Description of the article"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                  dark:focus:border-blue-500"
                  required
                />
              </div>

              <button
                onClick={writeData}
                className="w-full text-white bg-primary-600 hover:bg-blue-500 ease-in-out duration-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 
                dark:focus:ring-primary-800"
              >
                Sell Article
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Test;
