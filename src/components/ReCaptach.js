import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Web3 from "web3";

import MintingContract from "../MintingContract.json";
import {
    Center,
    Box,
    Head,
    Image,
    Button,
    HStack,
    VStack,
    Heading,
    Flex,


    Link,
    Card,
    CardBody,
    StackDivider,
    Stack,
    useToast,
    Text,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,


    ModalCloseButton,

    useMediaQuery,
    Progress,

} from "@chakra-ui/react";
const ReCaptach = () => {
    const [verfied, setVerifed] = useState(false);

    //recaptcha function
    function onChange(value) {
        console.log("Captcha value:", value);
        setVerifed(true);
    }

    let ethWindow = window.ethereum;
    const CONTRACT_ADDRESS = "0x77C9e7733550026AcE28950e973681C0F74191E3";
    const [contract, setContract] = useState(undefined);
    const [ethAddress, setEthAddress] = useState("");
    const [totalSupply, setTotalSupply] = useState(0);
    const [mintAmount, setMintAmount] = useState(1);
    const [latestTx, setlatestTx] = useState("");
    const [nftUrl, setNftUrl] = useState("");
    const [osLink, setOsLink] = useState("");
    const totalNfts = 8888;
    const { isOpen, onOpen, onClose } = useDisclosure();

    // metamask related function




    const connectWallet = async () => {
        let provider = window.ethereum;

        if (typeof provider !== "undefined") {
            // MetaMask is installed

            provider
                .request({ method: "eth_requestAccounts" })
                .then((accounts) => {
                    setEthAddress(accounts[0]);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const disconnectWallet = () => {
        setEthAddress("");
        alert("disconnected");
    };

    const loadBlockchain = async () => {
        let provider = window.ethereum;
        const web3 = new Web3(provider);

        const contract = new web3.eth.Contract(
            MintingContract.abi,
            CONTRACT_ADDRESS
        );
        setContract(contract);
    };


    const buyFlys = (number) => {
        if (contract !== undefined && ethAddress !== "") {
            var value = number * 20000000;

            contract.methods
                .buyFlys(number)
                .send({ from: ethAddress, value: value })
                .then((tx) => {
                    console.log(tx);
                    setlatestTx(tx.transactionHash);
                    setOsLink(
                        "https://opensea.io/assets/" +
                        tx.to +
                        "/" +
                        tx.events.Transfer.returnValues.tokenId
                    );
                    console.log(osLink);
                    onOpen();

                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    const mintGiveawayFlys = (number) => {
        if (contract !== undefined && ethAddress !== "") {
            var value = number * 20000000;

            contract.methods
                .GiveawayFlys(number)
                .send({ from: ethAddress, value: value })
                .then((tx) => {
                    console.log(tx);
                    setlatestTx(tx.transactionHash);
                    setOsLink(
                        "https://opensea.io/assets/" +
                        tx.to +
                        "/" +
                        tx.events.Transfer.returnValues.tokenId
                    );
                    console.log(osLink);
                    onOpen();

                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (

        <div className="container,display">
            <ReCAPTCHA
                sitekey="6Ld4vh4pAAAAAFZ6Mw4U_W4yED0KiaUOUlmTDbEv"
                onChange={onChange}
            />

            <div id="wrapper"  >

                <Flex className="mintbutton"  >

                    <Stack spacing={4}  >
                        <Button colorScheme='teal' size='lg' onClick={() => buyFlys(mintAmount)} >       <Text



                        ></Text> Mint</Button> </Stack>
                    <Button disabled={!verfied} colorScheme='teal' size='lg' onClick={() => mintGiveawayFlys(mintAmount)} >  Whitelist Mint</Button>
                    <HStack></HStack>
                </Flex>





            </div>
        </div>

    );


}




export default ReCaptach;