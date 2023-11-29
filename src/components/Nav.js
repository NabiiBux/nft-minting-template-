import React from "react";
import {
  Button,
  HStack,
  useToast,
} from "@chakra-ui/react";

function Nav({ connectWallet, disconnectWallet, ethAddress }) {
  const toast = useToast();

  return (
    <div class="Aligner-item Aligner-item--top">

      <HStack flexDirection="column"  >
        {ethAddress !== "" ? (
          <Button
            onClick={() => {
              navigator.clipboard.writeText(ethAddress).then(
                toast({
                  description: "Address copied.",
                  status: "success",
                  duration: 1000,
                })
              );
            }}
          >
            {ethAddress.slice(0, 6)}...
            {ethAddress.slice(ethAddress.length - 4, ethAddress.length)}
          </Button>
        ) : (
          ""
        )}
        {ethAddress !== "" ? (
          <Button
            color="white"
            fontWeight="bold"
            fontSize="1.5rem"
            maxWidth="100%"
            colorScheme='teal' size='lg' onClick={() => disconnectWallet()}>disconnect</Button>
        ) : (
          <Button colorScheme='teal' size='lg' onClick={() => connectWallet()}>connect</Button>
        )}

      </HStack>
    </div >
  );
}

export default Nav;
