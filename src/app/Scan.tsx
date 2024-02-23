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
import { ethers, hexlify, randomBytes } from "ethers";
import abi from "@/app/_config/abi.json";
import { InterfaceAbi } from "ethers";
import { JsonRpcApiProvider } from "ethers";
import { JsonRpcProvider } from "ethers";

export default function Scan() {
  const [address, setAddress] = useState("");
  const [scanActive, setScanActive] = useState(false);
  const [successActive, setSuccessActive] = useState(false);

  const handleScan = async () => {
    // Need this
    let provider = new JsonRpcProvider(process.env.NEXT_PUBLIC_INFURA_URI!);

    const rerroToken = new ethers.Contract(
      process.env.NEXT_PUBLIC_RERRO_ADDRESS!,
      abi,
      provider
    );

    const deadline = Math.floor(Date.now() / 1000) + 60 * 1440;

    const transaction = {
      to: rerroToken.address,
      value: 0,
      gas: hexlify("1000000"),
      deadline: hexlify(deadline.toString()),
      salt: hexlify(randomBytes(32)),
      data: rerroToken.interface.encodeFunctionData("mint", [address]),
      chainId: process.env.NEXT_PUBLIC_CHAIN_ID!,
    };

    const typedData = buildEIP712TypedData(
      process.env.NEXT_PUBLIC_CHAIN_ID!,
      process.env.NEXT_PUBLIC_FORWARDER_ADDRESS!,
      transaction
    );

    const res = await execHaloCmdWeb({
      name: "sign",
      typedData: {
        domain: typedData.domain,
        types: typedData.types,
        value: typedData.value,
      },
      keyNo: 1,
    });

    console.log(res);
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

        <Button fullWidth shadow color="orange-gradient" onClick={handleScan}>
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
