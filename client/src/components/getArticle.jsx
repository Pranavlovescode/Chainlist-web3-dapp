import React, { useContext, useEffect,useState } from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";
import { DataContext } from "../context/DataContext";
const getArticle = () => {
  const get_data = useContext(DataContext);
  const web3 = new Web3()
  console.log("DataContext",get_data);
  const [data, setData] = useState({
    add: null,
    price: null,
    name: null,
    desc: null,
  });
  const getArticleFunc = async () => {
    if (get_data) {
      const result = await get_data.methods.getArticle().call();
      const priceToEther = web3.utils.fromWei(result[3], "ether");
      setData({
        add: result[0],
        desc: result[2],
        price: priceToEther,
        name: result[1],
      });
      console.log("Result after reading getArticle()",result);
    }
  };
  useEffect(() => {
    getArticleFunc()
  }, [get_data]);
  return (
    <>
      {/* <button onClick={getArticle}>Click Me to Update</button> */}
      <p className="pb-4 ">
        {data.add} ,{data.desc} ,{data.price} (ETH), {data.name}
      </p>
      <Link to="/sell-article">
        <button>Sell an Article</button>
      </Link>
      
    </>
  );
};

export default getArticle;
