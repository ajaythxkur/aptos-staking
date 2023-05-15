import React, {useState, useEffect} from 'react'
import Connect from '../components/Connect.jsx'
import Header from '../components/Header.jsx';
const Home = () => {
  const [isConnected, setisConnected] = useState(false);
  const [account, setAccount] = useState(null); //obj
  useEffect(()=>{
      var acc = localStorage.getItem('account');
      if(acc != null){
        acc = JSON.parse(acc)
        setAccount(acc)
        setisConnected(true)
      }else{
        setisConnected(false)
      }
    
  },[isConnected]);
  return (
    <>
    {isConnected ? 
      <>
        <Header account={account} setisConnected={setisConnected}/>
      </>
      : 
      <Connect setisConnected={setisConnected}/>
    }
    </>
  )
}

export default Home