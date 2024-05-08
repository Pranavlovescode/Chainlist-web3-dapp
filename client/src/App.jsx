import { useEffect, useState } from "react";
import Web3 from "web3";
import { DataContext } from "./context/DataContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SellArticle from "./components/sellArticle";
import GetArticle from "./components/getArticle";
import "./App.css";
// import SimpleStorage from "./contracts/SimpleStorage.json";
import ChainList from "./contracts/ChainList.json";

function App() {
  let web3 = new Web3();
  const [state, setState] = useState({ contract: null, web3: null });
  const [sellData, setSellData] = useState({
    add: null,
    price: null,
    name: null,
    desc: null,
  });

  useEffect(() => {
    const funcInteract = async () => {
      try {
        const web3 = new Web3("http://localhost:8545");
        const networkId = await web3.eth.net.getId();
        // const coinbase=await web3.eth.getCoinbase()
        // console.log('coinbase',coinbase)
        var deployedNetwork = ChainList.networks[networkId];
        var instance = new web3.eth.Contract(
          ChainList.abi,
          deployedNetwork && deployedNetwork.address
        );
        // console.log(ChainList.networks[networkId])
        // console.log(networkId)
        setState({ contract: instance, web3: web3 });
        console.log(instance);
      } catch (error) {
        console.error(error);
      }
    };
    funcInteract();
  }, []);
  useEffect(() => {
    // console.log(state)
    getArticle();
  }, [state]);
  const getArticle = async () => {
    const temp = state.contract;
    const result = await temp.methods.getArticle().call();
    const priceToEther = web3.utils.fromWei(result[3], "ether");
    setSellData({
      add: result[0],
      desc: result[2],
      price: priceToEther,
      name: result[1],
    });
    console.log(result);
  };
  

  return (
    <DataContext.Provider value={state.contract}>
      <Router>
        <h1 className="font-bold p-3 my-5">ChainList Crypto Market</h1>
        <Routes>
          <Route path="/sell-article" element={<SellArticle />} />
          <Route path="/" element={<GetArticle />} />
        </Routes>
      </Router>
    </DataContext.Provider>
  );
}

export default App;
