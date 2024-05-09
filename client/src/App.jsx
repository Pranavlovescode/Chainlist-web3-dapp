import { useEffect, useState } from "react";
import Web3 from "web3";
import { DataContext } from "./context/DataContext";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SellArticle from "./components/sellArticle";
import GetArticle from "./components/getArticle";
import Navbar from "./components/Navbar";
import "./App.css";
import ChainList from "./contracts/ChainList.json";

function App() {
  const web3 = new Web3("http://localhost:8545");
  const [state, setState] = useState({ contract: null, web3: null });
  const [acc, setAcc] = useState([]);

  // const getAllAccounts = async () => {
  //   const accounts = await web3.eth.getAccounts();
  //   setAcc(accounts);
  // };

  useEffect(() => {
    const funcInteract = async () => {
      try {
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
    // getAllAccounts();
  }, [state]);

  return (
    <DataContext.Provider value={state.contract}>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/sell-article" element={<SellArticle />} />
          <Route path="/" element={<GetArticle />} />
        </Routes>
      </Router>
    </DataContext.Provider>
  );
}

export default App;
