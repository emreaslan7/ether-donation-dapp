import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import { useState, useEffect } from 'react'

function ConnectWallet() {
  
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
  });
  
  const connectWallet = async () => {

    if(typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'){
        try{
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setWalletAddress(accounts[0]);
            console.log(accounts[0]);
        }
        catch(error){
            console.log(error);
        }

    }else{
        alert('Please install Metamask');;
    }

  }
    
  const getCurrentWalletConnected = async () => {
    if(typeof window!== 'undefined' && typeof window.ethereum!== 'undefined'){
        try{
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if(accounts.length > 0){
                setWalletAddress(accounts[0]);
                console.log(accounts[0]);
            }else{
                console.log('connect to metamask using connect button');
            }
        }
        catch(error){
            console.log(error);
        }
    }
  }

  const addWalletListener = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
        setWalletAddress("");
      alert("Please install Metamask");
    }
  };

  


  return (
    <Box position={{md:'absolute'}}>
        <Button bgColor={'red.700'}  color={'white'} _hover={{}} 
        onClick={connectWallet}>
            {
                walletAddress && walletAddress.length > 0 ? 
                    `${walletAddress.substring(0,6)}... ${walletAddress.substring(38)}`
                : 'Connect Wallet'
            }
        </Button>
    </Box>
  )
}

export default ConnectWallet