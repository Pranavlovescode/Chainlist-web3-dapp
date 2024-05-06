import React, { useContext, useEffect,useState } from "react";
import { DataContext } from "../context/DataContext";
import Web3 from "web3";
const getArticle = () => {
  const get_data = useContext(DataContext);
  const web3 = new Web3()
  console.log(get_data);
  const [data, setData] = useState({
    add: null,
    price: null,
    name: null,
    desc: null,
  });
  const getArticle = async () => {
    if (get_data) {
      const result = await get_data.methods.getArticle(0).call();
      const priceToEther = web3.utils.fromWei(result[3], "ether");
      setData({
        add: result[0],
        desc: result[2],
        price: priceToEther,
        name: result[1],
      });
      console.log(result);
    }
  };
  useEffect(() => {
    
  }, [get_data]);
  return (
    <>
      <button onClick={getArticle}>Click Me to Update</button>
      <p>
        {data.add} ,{data.desc} ,{data.price} (ETH), {data.name}
      </p>
    </>
  );
};

export default getArticle;
