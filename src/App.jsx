import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import abi from './contractJson/OrganicProductLifeCycle.json'

import { Route, Routes } from 'react-router-dom';
 import Home from '../pages/Home';
 import Farmer_Register from '../pages/Farmer_Register';
 import Manufacturer_Register from '../pages/Manufacturer_Register';
 import Customer_Register from '../pages/Customer_Register';
 import Add_RawMaterial from '../pages/Add_RawMaterial';
 import Products from '../pages/View_RawMaterials';
 import Farmer_RawMaterial from '../pages/Farmer_RawMaterial';
 import Purchase_RawMaterial from '../pages/Purchase_RawMaterials';
 import Purchased_RawMaterials from '../pages/Purchased_RawMaterials';
 import Add_Product from '../pages/Add_Product';
 import MyProducts from '../pages/ViewMyProducts';
 import TrackProducts from '../pages/TrackProducts';



function App() {

  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  })

  const [account, setAccount] = useState('Not connected')

  useEffect(() => {
    const template = async () => {
      const contractAddress = "0x9B6652F1e61EC1dAFDC52EC4079F6C1ba333999a";
      const contractABI = abi.abi;

      try {
        const { ethereum } = window;
        await ethereum.request({
          method: "eth_requestAccounts"
        })

        const provider = new ethers.BrowserProvider(ethereum);

        const accounts = await provider.listAccounts();
        setTimeout(() => {
          setAccount(accounts[0].address);
        }, 2000);

        window.ethereum.on("accountsChanged", async () => {
          const accounts = await provider.listAccounts();
          setAccount(accounts[0].address);
        })
        console.log(account);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        )

        setTimeout(() => {
          setState({ provider: provider, signer: signer, contract: contract, account: account })
        }, 2000);
      } catch (err) {
        alert(err)
        console.log(err)
      }  
    }
    template();
  }, [account])


  return (
     <Routes>
       <Route path='/' element={state.account ? <Home state={state} /> : <p>Loading...</p>}></Route>
       <Route path='/farmer' element={state.account ? <Farmer_Register state={state} /> : <p>Loading...</p>}></Route>
       <Route path='/manufacturer' element={state.account ? <Manufacturer_Register state={state} /> : <p>Loading...</p>}></Route>
       <Route path='/customer' element={state.account ? <Customer_Register state={state} /> : <p>Loading...</p>}></Route>
       <Route path='/addRawMaterial' element={state.account ? <Add_RawMaterial state={state} /> : <p>Loading...</p>}></Route>
       <Route path='/allRawMaterials' element={state.account ? <Products state={state} /> : <p>Loading...</p>}></Route>
       <Route path='/viewMyRawMaterials' element={state.account ? <Farmer_RawMaterial state={state} /> : <p>Loading...</p>}></Route>
       <Route path='/purchaseRawMaterials' element={state.account ? <Purchase_RawMaterial state={state} /> : <p>Loading...</p>}></Route>
       <Route path='/purchasedRawMaterials' element={state.account ? <Purchased_RawMaterials state={state} /> : <p>Loading...</p>}></Route>
       <Route path='/addProducts' element={state.account ? <Add_Product state={state} /> : <p>Loading...</p>}></Route>
       <Route path='/myProducts' element={state.account ? <MyProducts state={state} /> : <p>Loading...</p>}></Route>
       <Route path='/trackProducts' element={state.account ? <TrackProducts state={state} /> : <p>Loading...</p>}></Route>
      
     </Routes>
    
  )          
}        
 
export default App


     



































