"use client";

import Box from "@/components/Box";
import Button from "@/components/Button";
import Width from "@/components/Width";
import Footer from "@/modules/Footer";
import React from "react";
import { GELATO_RELAY_API_KEY, RPC_URL } from "@/config/gelato";
import { ethers } from "ethers";
import {
  CallWithERC2771Request,
  ERC2771Type,
  GelatoRelay,
} from "@gelatonetwork/relay-sdk";

export default function page() {
  const handleClick = async () => {
    // Create a provider
    const provider = new ethers.JsonRpcProvider(RPC_URL);

    // Create a signer
    const signer = new ethers.Wallet(
      process.env.NEXT_PUBLIC_PRIVATE_KEY as string,
      provider
    );

    // Create relay client
    const relay = new GelatoRelay();

    // function stuff
    const counter = "0x00172f67db60E5fA346e599cdE675f0ca213b47b";
    const abi = ["function increment()"];

    const user = await signer.getAddress();
    const chainId = (await provider.getNetwork()).chainId;

    // Generate the target payload
    const contract = new ethers.Contract(counter, abi, signer);
    const { data } = await contract.increment.populateTransaction();

    // Populate a relay request
    const request: CallWithERC2771Request = {
      chainId,
      target: counter,
      data: data as string,
      user: user as string,
    };

    const { struct, typedData } = await relay.getDataToSignERC2771(
      request,
      ERC2771Type.SponsoredCall,
      //@ts-ignore
      signer
    );

    const signature = await signer.signTypedData(
      typedData.domain,
      typedData.types,
      typedData.message
    );

    const response = await relay.sponsoredCallERC2771WithSignature(
      struct,
      signature,
      GELATO_RELAY_API_KEY!
    );

    console.log(`https://relay.gelato.digital/tasks/status/${response.taskId}`);
  };

  return (
    <div className="pt-8">
      <Width>
        <Box>
          <Button fullWidth color="black" onClick={handleClick}>
            Scan
          </Button>
        </Box>
      </Width>
      <Footer />
    </div>
  );
}
