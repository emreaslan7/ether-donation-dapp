import { Box, Image, ChakraProvider, Flex, Button} from "@chakra-ui/react";
import theme from "@chakra-ui/theme";
import artifact from "./artifacts/contracts/Donation.sol/Donation.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Footer from "./components/Footer/footer";
import DonateEth from "./components/DonateEth/donateeth";
import DonationStats from "./components/DonationStats/DonationStats";


function App() {

  const [walletAddress, setWalletAddress] = useState("");
  const [totalDonate, setTotalDonate] = useState("");
  const contractAddress = '0x3fBca885fdc8B565E37DFa09094951eFe7c9920c';
  const contractABI = artifact.abi;

  useEffect(() => {
    getTotalDonate();
  });

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
  }, [walletAddress]);

  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* MetaMask is installed */
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          console.log(accounts[0]);
        } else {
          console.log("Connect to MetaMask using the Connect button");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setWalletAddress("");
      console.log("Please install MetaMask");
    }
  };
  
  const sendDonation = async (amount) => {
    try {
      const {ethereum} = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        // const contract = new ethers.Contract(
        //   contractAddress,
        //   contractABI,
        //   signer
        // );

        console.log("donating ether..",amount)
        const donateTx = await signer.sendTransaction(
          { 
            to : contractAddress,
            value: ethers.utils.parseEther(amount)
          }
        );

        // await donateTx.wait();

        console.log("mined ", donateTx);

        console.log("donated... congratulations ", donateTx.hash);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalDonate = async () => {
    if (typeof window!= "undefined" && typeof window.ethereum!= "undefined") {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const result = await contract.getTotalDonations();
        console.log(ethers.utils.formatEther(result.toString()));
        setTotalDonate(ethers.utils.formatEther(result.toString()));
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
  }

  return (
    <ChakraProvider theme={theme}>
      <Box
        bgGradient="linear(155deg, rgba(255, 0, 0, 1) 0%, rgba(255, 192, 203, 1) 100%)"
        h="100vh"
      >
        <Flex
          p={2}
          justifyContent={{ base: "space-between", md: "flex-end" }}
          alignItems={"center"}
        >
          <Image
            src="/assets/hearthHue_logos.png"
            h={{ base: "30px", md: "40px" }}
            mx={{ md: "auto" }}
          />
          
          {/* connect wallet button */}
          <Box position={{ md: "absolute" }}>
            <Button
              bgColor={"red.700"}
              color={"white"}
              _hover={{}}
              onClick={connectWallet}
            >
              {walletAddress && walletAddress.length > 0 ? `${walletAddress.substring(0,6)}... ${walletAddress.substring(38)}` : "Connect Wallet"}
            </Button>
          </Box>
        </Flex>

        <Flex
          h={{md:'80%'}}
          flexDirection={{base:'column', md:'row'}}
          alignItems={{base:'center',md:'center'}}
          justifyContent={'center'}
          gap={3}>
          <DonateEth sendDonation={sendDonation} />
          <DonationStats totalDonate={totalDonate} />
        </Flex>


                
 
        <Footer />
      </Box>
    </ChakraProvider>
  );
}

export default App;
