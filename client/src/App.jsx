import { useEffect, useState } from "react";
import Web3 from "web3";
// import "./App.css";
import SimpleStorage from "./contracts/SimpleStorage.json";
import ChainList from "./contracts/ChainList.json";

function App() {
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
        setData({
          add: getArticle[0],
          price: getArticle[3],
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
          "Iphone 15 Pro Max",
          "to buy New Iphone 15 Pro Max",
          web3.utils.toWei("1.5", "ether")
        )
        .send({ from: "0xa078a34cc63eB2BAA551Ea76e231aEf08d17E32f" ,gas: 5000000});
        // setData(real_data)
    }
    window.location.reload();
  };
  return(
    <>
        <button onClick={writeData}>Click Me to Update</button>
        <p>{data.add} ,{data.desc} ,
        {data.price && data.price.toString()}, {data.name} </p>
    </>
  )
}




export default App;