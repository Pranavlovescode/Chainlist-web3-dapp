import { useEffect, useState } from "react";
import Web3 from "web3";
import {DataContext} from './context/DataContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Test from './components/sellArticle';
import "./App.css";
// import SimpleStorage from "./contracts/SimpleStorage.json";
import ChainList from "./contracts/ChainList.json";

function App() {
  // let web3 = new Web3()
  const [state, setState] = useState({ contract: null, web3: null });
  const [data, setData] = useState({
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
        var deployedNetwork = ChainList.networks[networkId];
        var instance = new web3.eth.Contract(
          ChainList.abi,
          deployedNetwork && deployedNetwork.address
        );
        // console.log(ChainList.networks[networkId])
        // console.log(networkId)
        setState({ contract: instance, web3: web3 });
        // console.log(instance)
        var getArticle = await instance.methods.getArticle().call();
        
        // console.log("In Wei",in_wei)
        const price_in_eth = web3.utils.fromWei(getArticle[3], "ether");
        // console.log("In Ethers",price_in_eth)
        setData({
          add: getArticle[0],
          price: price_in_eth.toString(),
          name: getArticle[1],
          desc: getArticle[2],
        });
        // setData(getArticle);
        console.log(getArticle);
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
        <button onClick={writeData}>Click Me to Update</button>
        <p>{data.add} ,{data.desc} ,
        {data.price && data.price} (ETH), {data.name} </p>
        <Router>
          <Routes>
          <Route path="/sell-article" element={<Test/>}/>
          </Routes>
        </Router>        
    </DataContext.Provider>
  )
}




export default App;
