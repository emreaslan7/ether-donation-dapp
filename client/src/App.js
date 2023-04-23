import { Box, Image, Heading, Text, ChakraProvider, Flex} from "@chakra-ui/react";
import theme from "@chakra-ui/theme";
import artifact from "./artifacts/contracts/Donation.sol/Donation.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Footer from "./components/Footer/footer";
import DonateEth from "./components/DonateEth/donateeth";
import ConnectWallet from "./components/ConnectWallet/connectWallet";

function App() {

  const [provider, setProvider] = useState(undefined)
  const [signer, setSigner] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [amount, setAmount] = useState(0);
  const [donations, setDonations] = useState([]);

  useEffect(() =>{
    

    const init = async () =>{

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      setProvider(provider);

      const contract = new ethers.Contract(
        "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        artifact.abi,
        signer
      );
      setContract(contract);

      await contract.connect(provider).getDonations()
      .then((result) => {
          const donations = result.map(donation => [donation[0], ethers.utils.formatEther(donation[1]).toString]);
          setDonations(donations);
        })

    }
 
    init();
  },[]);

  const isConnected = () => ( signer !== undefined );

  const getSigner = async (provider) => {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log(signer);
    setSigner(signer);
  }

  const connect = async () => {
    await getSigner(provider);
  }

  const sendDonation = async() => {

    await signer.sendTransaction({
      to: contract.address,
      value: ethers.utils.parseEther(amount.toString())
    })

    setAmount('0');
  };


  return (
    <ChakraProvider theme={theme}>
      <Box
        bgGradient="linear(155deg, rgba(255, 0, 0, 1) 0%, rgba(255, 192, 203, 1) 100%)"
        h="100vh"
      >
        <Flex p={2} justifyContent={{base:'space-between', md:'flex-end'}} alignItems={'center'}>
          <Image src="/assets/hearthHue_logos.png"  h={{base:'30px', md:'40px'}} mx={{md: 'auto'}}/>
          <ConnectWallet />
        </Flex>
        
        {/* <ConnectWallet /> */}
        <DonateEth />







        <Footer />
      </Box>
    {/* <div className="App">
      <header className="App-header">
        <div className="row" style={{width: '800px'}}>

          <div className="col-md-4">
            <div className="row">
              <div className="col-md-12">
                <h1 className="donateHeader">Donate ETH</h1>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 amountButtonLeft">
                <a
                onClick={ () => setAmount('0.1') }
                className={"amountButton " + (amount === '0.1' ? 'amountClicked' : '')}>
                  0.1
                </a>
              </div>
              <div className="col-md-6 amountButtonRight">
                <a
                onClick={ () => setAmount('0.5') }
                className={"amountButton " + (amount === '0.5' ? 'amountClicked' : '')}>
                  0.5
                </a>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 amountButtonLeft">
                <a
                onClick={ () => setAmount('1') }
                className={"amountButton " + (amount === '1' ? 'amountClicked' : '')}>
                  1
                </a>
              </div>
              <div className="col-md-6 amountButtonRight">
                <a
                onClick={ () => setAmount('2') }
                className={"amountButton " + (amount === '2' ? 'amountClicked' : '')}>
                  2
                </a>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <a
                onClick={ () => sendDonation() }
                className="amountButton">Donate</a>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                {isConnected() ? (
                  <>
                    <span className="dot greenDot"></span>
                    <p style={{fontSize: '25px'}}>Connected</p>
                  </>
                ) : (
                  <>
                    <span className="dot redDot"></span>
                    <p style={{fontSize: '25px'}}>Not connected</p>
                    <button onClick={connect} className="btn btn-primary">Connect Wallet</button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-2">
          </div>

          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12">
                <h1 className="donateHeader">Recent Donations</h1>
              </div>
            </div>
            {donations.map((ds,idx) => (
              <>
                <div className="donationBubbleLeft">
                  <span className="paddingLeft">
                    {ds[1]} ETH
                    &nbsp;
                    <span className="byAddress">by {ds[0]?.substring(0,14)}...</span>
                  </span>
                </div>

              </>
            ))}
          </div>
        </div>
      </header>
    </div> */}
    </ChakraProvider>
  );
}

export default App;
