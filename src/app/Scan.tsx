"use client";

// @ts-ignore
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web";
import Image from "next/image";
import MaxWidth from "./_components/MaxWidth";
import { Overlay } from "./_modules/Overlay";
import Tab from "./_modules/Tab";
import Heading from "./_components/Heading";
import Text from "./_components/Text";
import PlainBadge from "./_components/PlainBadge";
import Popup from "./_modules/Popup";
import Field from "./_components/Field";
import Button from "./_components/Button";
import { useState } from "react";
import buildEIP712TypedData from "./_helpers/buildEIP712TypedData";
import { ethers } from "ethers";
import abi from "@/app/_config/abi.json";

export default function Scan() {
  const [address, setAddress] = useState("");
  const [scanActive, setScanActive] = useState(false);
  const [successActive, setSuccessActive] = useState(false);

  const handleScan = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_INFURA_URI!
    );

    const rerroToken = new ethers.Contract(
      process.env.NEXT_PUBLIC_RERRO_ADDRESS!,
      abi,
      provider
    );

    const transaction: any = {
      to: rerroToken.address,
      value: 0,
      gas: ethers.utils.hexlify(1000000), // gas limit
      deadline: ethers.utils.hexlify(Math.floor(Date.now() / 1000) + 60 * 1440), // 1 day
      salt: ethers.utils.hexlify(ethers.utils.randomBytes(32)),
      data: rerroToken.interface.encodeFunctionData("mint", [address]),
      chainId: process.env.NEXT_PUBLIC_CHAIN_ID!,
    };

    const typedData = buildEIP712TypedData(
      process.env.NEXT_PUBLIC_CHAIN_ID!,
      process.env.NEXT_PUBLIC_FORWARDER_ADDRESS!,
      transaction
    );

    try {
      // Get sign data
      const chipSig = await execHaloCmdWeb({
        name: "sign",
        typedData: {
          domain: typedData.domain,
          types: typedData.types,
          value: typedData.value,
        },
        keyNo: 1,
      });

      // Send it!
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_ACTION_WEBHOOK_URL!,
          {
            method: "POST",
            body: JSON.stringify({
              request: {
                ...transaction,
                from: chipSig.etherAddress,
              },
              signature: {
                r: "0x" + chipSig.signature.raw.r,
                s: "0x" + chipSig.signature.raw.s,
                v: chipSig.signature.raw.v,
              },
            }),
            headers: { "Content-Type": "application/json" },
          }
        );

        // Assuming the server responds with JSON
        const responseData = await response.json();
        console.log("Transaction posted successfully:", responseData);
      } catch (error) {
        console.error("Failed to post transaction:", error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Tab onClick={() => setScanActive(true)}>Start scanning</Tab>

      <Popup
        active={scanActive}
        onClose={() => setScanActive(false)}
        className="text-center"
      >
        <Text className="mb-8">
          Short description on scanning items two rows tops lorem ipsum dolor
          sit
        </Text>

        <Field
          className="text-center mb-2"
          name="address"
          placeholder="Enter your address"
          onChange={(_, v) => setAddress(v)}
          value={address}
        />

        <Button
          disabled={!ethers.utils.isAddress(address)}
          fullWidth
          shadow
          color="orange-gradient"
          onClick={handleScan}
        >
          Scan Item
        </Button>
      </Popup>

      <Overlay active={successActive} onClose={() => setSuccessActive(false)}>
        <MaxWidth size="350" className="text-center">
          <Image
            className="image"
            width="350"
            height="200"
            src="/images/congrats.png"
            alt="Join forces with The Guardians of Kong"
          />
          <Heading className="mt-4 mb-5" tag="h2" size={1}>
            Congratulations!
          </Heading>
          <Text size="lg">
            You earned <PlainBadge className="ml-3 mr-3">25</PlainBadge> $RERROs
          </Text>
        </MaxWidth>
      </Overlay>
    </>
  );
}
