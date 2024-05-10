import { useEffect, useState } from "react";
import Web3 from "web3";
import { DataContext } from "./context/DataContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SellArticle from "./components/sellArticle";
import GetArticle from "./components/getArticle";
import Navbar from "./components/Navbar";
import "./App.css";
import ChainList from "./contracts/ChainList.json";
import LandingPage from "./components/LandingPage";

function App() {
  const web3 = new Web3(window.ethereum);
  const [state, setState] = useState({ contract: null, web3: null });
  const [acc, setAcc] = useState([]);
  // const getAllAccounts = async () => {
  //   const accounts = await web3.eth.getAccounts();
  //   setAcc(accounts);
  // };
  // console.log(acc);
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

    // getting the accounts from metamask

  }, []);
  useEffect(() => {
    getMetaMaskAccounts();
    // getAllAccounts();
  }, [state]);

  return (
    <DataContext.Provider value={state.contract}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/:id/sell-article" element={<SellArticle />} />
          <Route path={`/`} element={<LandingPage />} />
          <Route path="/:id" element={<GetArticle />} />
        </Routes>
      </Router>
    </DataContext.Provider>
  );
}

export default App;
