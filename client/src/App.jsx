import { useEffect, useState } from "react";
import Web3 from "web3";
import {DataContext} from './context/DataContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Test from './components/sellArticle';
import GetArticle from "./components/getArticle";
import "./App.css";
// import SimpleStorage from "./contracts/SimpleStorage.json";
import ChainList from "./contracts/ChainList.json";

function App() {
  // let web3 = new Web3()
  const [state, setState] = useState({ contract: null, web3: null });
  
  useEffect(() => {
    const funcInteract = async () => {
      try {
        const web3 = new Web3("http://localhost:8545");
        const networkId = await web3.eth.net.getId();
        var deployedNetwork = ChainList.networks[networkId];
        var instance = new web3.eth.Contract(
          ChainList.abi,
          deployedNetwork && deployedNetwork.address
        );
        // console.log(ChainList.networks[networkId])
        // console.log(networkId)
        setState({ contract: instance, web3: web3 });
        // console.log(instance)
        
      } catch (error) {
        console.error(error);
      }
    };
    funcInteract();
  }, []);
  useEffect(() => {
    // console.log(state)
    
  }, [state]);
  const writeData = async () => {
    const { contract, web3 } = state;
    if (contract) {
      await contract.methods
        .sellArticle(
          "2 BHK Flat in Noida",
          "to buy 50 Ethers",
          web3.utils.toWei(100, "ether")
        )
        .send({ from: "0xa078a34cc63eB2BAA551Ea76e231aEf08d17E32f" ,gas: 5000000});
        // setData(real_data)
    }
    window.location.reload();
  };
  
  return(
    <DataContext.Provider value={state.contract}>      
        
        <Router>
          <Routes>
          <Route path="/sell-article" element={<Test/>}/>
          <Route path="/get-article" element={<GetArticle/>}/>
          </Routes>
        </Router>        
    </DataContext.Provider>
  )
}




export default App;
