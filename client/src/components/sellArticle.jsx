import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";


import Web3 from "web3";
const Test = () => {
  const web3 = new Web3();
  const data = useContext(DataContext);
  const [sellData,setSellData]=useState({name_of_article:null,desc:null,price:null})
  console.log(data);
  

  const writeData = async () => {
    setSellData({
      name_of_article: document.getElementById("name").value,
      desc: document.getElementById("desc").value,
      price: document.getElementById("price").value,
    })
    const result = await data.methods
      .sellArticle(
        sellData.name_of_article,
        sellData.desc,
        web3.utils.toWei(sellData.price, "ether")
      )
      .send({
        from: "0x0f8fdAceAacf9077B28f02D344b9623bA181866D",
        gas: 5000000,
      });
    // setState({ contract: data, web3: web3 });
    window.location.reload();
    console.log(result);
  };
  return (
    <>
      <h1 className="font-bold">Sell Article Page</h1>
      <div className="flex flex-col">
        <input type="text" id="name" placeholder="Name of the Article" />
        <input type="text" id="desc" placeholder="Description of the Article" />
        <input type="number" id="price" placeholder="Price of the Article" />
        <div>
        <button onClick={writeData}>Sell the Article</button>
        </div>
      </div>
    </>
  );
};

export default Test;
