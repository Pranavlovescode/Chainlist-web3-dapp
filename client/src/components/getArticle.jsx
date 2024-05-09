import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Web3 from "web3";
import { DataContext } from "../context/DataContext";

const getArticle = () => {
  const get_data = useContext(DataContext);
  const location = useLocation();
  const add = location.pathname.split("/")[1];
  // console.log(id);
  const web3 = new Web3("http://localhost:8545");
  // console.log("DataContext", get_data);
  const [data, setData] = useState([]);
  const [balance, setBalance] = useState(0);
  const [recipt, setRecipt] = useState([]);
  // Debugging purposes
  // const filteredData = data.filter((index) => index.sender_add !== id);
  // console.log("filteredData:", filteredData);
  // const tableRows = filteredData.map((index) => {
  //   console.log("Checking:", index.seller_add, id);
  //   return index.sender_add !== id;
  // })
  // console.log('tableRows:', tableRows);
  const getArticleFunc = async () => {
    if (get_data) {
      const articleIds = await get_data.methods.getArticlesForSale().call();
      if (articleIds.length === 0) {
        console.log("No articles for sale");
        return;
      }
      // console.log(articleIds);
      const articles = await Promise.all(
        articleIds.map((id) => get_data.methods.articles(id).call())
      );
      // console.log(articles);

      setData(
        articles.map((article) => ({
          seller_add: article[1],
          buyer_add: article[2],
          desc: article[4],
          price: web3.utils.fromWei(article[5], "ether"),
          name: article[3],
        }))
      );
    }
  };
  const buyArticle = async (id) => {
    console.log(data[id - 1].price);
    console.log(add);
    const transaction = await get_data.methods.buyArticle(id).send({
      from: add,
      gas: 5000000,
      value: web3.utils.toWei(data[id - 1].price, "ether"),
    });
    setRecipt(transaction);
    alert("Article has been bought successfully");
    console.log(recipt);
    window.location.reload();
    // if (data && data.price) {

    // } else {
    //   console.error("data or data.price is not defined");
    // }
  };
  const getBalance = async () => {
    const bal = await web3.eth.getBalance(add);
    const to_ether = web3.utils.fromWei(bal, "ether");
    setBalance(to_ether);
    // window.location.reload();
    return to_ether;
  };
  getBalance();
  useEffect(() => {
    getArticleFunc();
  }, [get_data, balance]);

  // console.log(data);

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 my-10 sm:p-5">
        <section className="flex justify-evenly items-center m-5 ">
          <div className="w-full flex flex-row items-center justify-start">
            <h1 className="font-bold  text-2xl">Articles for Sale</h1>
          </div>
          <div className="w-25">
            <p>
              <span>Your Address</span> : {add} (You)
            </p>
            <p>
              <span>Your Balance</span> : {balance} (ETH)
            </p>
          </div>
        </section>
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Article name
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Description
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Address of Seller
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Address of Buyer
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((article, num) => {
                    console.log(num);
                    return (
                      <tr key={num} className="border-b dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {article.name}
                        </th>
                        <td className="px-4 py-3">{article.desc}</td>
                        <td className="px-4 py-3">{article.price} (ETH)</td>
                        {article.seller_add === add ? (
                          <td className="px-4 py-3">You</td>
                        ) : (
                          <td className="px-4 py-3">{article.seller_add}</td>
                        )}
                        {article.buyer_add === add ? (
                          <td className="px-4 py-3">You</td>
                        ) : article.buyer_add ===
                          "0x0000000000000000000000000000000000000000" ? (
                          <td className="px-4 py-3">No Buyer yet</td>
                        ) : (
                          <td className="px-4 py-3">{article.buyer_add}</td>
                        )}

                        <td className="px-4 py-3 flex items-center justify-start">
                          {article.buyer_add !==
                          "0x0000000000000000000000000000000000000000" ? (
                            <p>No action</p>
                          ) : article.seller_add === add ? (
                            <p>You cannot buy this Article</p>
                          ) : (
                            <button
                              onClick={() => buyArticle(num + 1)}
                              className="text-white bg-primary-600  hover:bg-blue-500 ease-in-out 
            duration-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                              type="button"
                            >
                              Buy
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <nav
              className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
              aria-label="Table navigation"
            >
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Showing
                <span className="font-semibold text-gray-900 dark:text-white">
                  {" "}
                  1-10{" "}
                </span>
                of
                <span className="font-semibold text-gray-900 dark:text-white">
                  {" "}
                  1000
                </span>
              </span>
              <ul className="inline-flex items-stretch -space-x-px">
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 
                    hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewbox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight 
                    text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 
                    hover:text-gray-700 
                    dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight 
                    text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 
                    hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    2
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    aria-current="page"
                    className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  >
                    3
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight 
                    text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 
                    hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    ...
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 
                    hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    100
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewbox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
      <div className="flex justify-center">
        <Link to={`/${add}/sell-article`}>
          <button className="text-white bg-primary-600 hover:bg-blue-500 ease-in-out duration-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            Sell an Article
          </button>
        </Link>
      </div>
    </>
  );
};

export default getArticle;
