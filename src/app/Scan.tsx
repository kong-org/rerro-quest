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
import { useEffect, useState } from "react";
import buildEIP712TypedData from "./_helpers/buildEIP712TypedData";
import { ethers } from "ethers";
import getSignatureForAddress from "./_helpers/getSignatureForAddress";
import contract from "@/lib/contract";
import isValidEthDomain from "./_helpers/validateEthDomain";
import provider, { providerMain } from "@/lib/provider";

interface IProps {
  scanActive: boolean;
  setScanActive(scanActive: boolean): void;
}

export default function Scan({ scanActive, setScanActive }: IProps) {
  const [busy, setBusy] = useState(false);
  const [address, setAddress] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const [step, setStep] = useState(1);
  const [cert, setCert] = useState("");
  const [chipAddress, setChipAddress] = useState("");
  const [successActive, setSuccessActive] = useState(false);

  const handleScan = async () => {
    setBusy(true);

    const transaction: any = {
      to: contract.address,
      value: 0,
      gas: ethers.utils.hexlify(1000000), // gas limit
      deadline: ethers.utils.hexlify(Math.floor(Date.now() / 1000) + 60 * 1440), // 1 day
      salt: ethers.utils.hexlify(ethers.utils.randomBytes(32)),
      data: contract.interface.encodeFunctionData("mint", [address]),
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

      // Store chip address
      const chipAddress = chipSig.etherAddress;
      setChipAddress(chipAddress);

      // Store certificate
      const cert = await getSignatureForAddress(chipAddress);
      setCert(cert);

      // Check if seeded
      const isSeeded = await contract.seededChips(chipAddress);

      // If it's not seeded we go to second step
      if (!isSeeded) {
        setStep(2);
      }
      // Otherwise it's single step and we can finish
      else {
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

          setSuccessActive(true);
        } catch (error) {
          console.error("Failed to post transaction:", error);
        }
      }
    } catch (err) {
      console.log(err);
    }

    setBusy(false);
  };

  const handleSecondScan = async () => {
    // Ste button busy
    setBusy(true);

    // Create transaction
    const transaction: any = {
      to: contract.address,
      value: 0,
      gas: ethers.utils.hexlify(1000000), // gas limit
      deadline: ethers.utils.hexlify(Math.floor(Date.now() / 1000) + 60 * 1440), // 1 day
      salt: ethers.utils.hexlify(ethers.utils.randomBytes(32)),
      data: contract.interface.encodeFunctionData("mintWithSignature", [
        address,
        cert,
      ]),
      chainId: process.env.NEXT_PUBLIC_CHAIN_ID!,
    };

    // Create typed data
    const typedData = buildEIP712TypedData(
      process.env.NEXT_PUBLIC_CHAIN_ID!,
      process.env.NEXT_PUBLIC_FORWARDER_ADDRESS!,
      transaction
    );

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

    // Send it off
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

      setSuccessActive(true);
    } catch (error) {
      console.error("Failed to post transaction:", error);
    }

    setBusy(false);
  };

  const handleClose = () => {
    setBusy(false);
    setAddress("");
    setStep(1);
    setCert("");
    setScanActive(false);
    setSuccessActive(false);
  };

  useEffect(() => {
    // Valid eth domain
    if (isValidEthDomain(addressInput)) {
      providerMain
        .resolveName(addressInput)
        .then((res) => {
          if (res) setAddress(res);
          else setAddress("");
        })
        .catch((err) => {
          setAddress("");
        });
    }
    // Valid address
    else if (ethers.utils.isAddress(addressInput)) {
      setAddress(addressInput);
    } else {
      setAddress("");
    }
  }, [addressInput]);

  return (
    <>
      <Tab onClick={() => setScanActive(true)}>Register Item</Tab>

      <Popup active={scanActive} onClose={handleClose} className="text-center">
        {step === 1 && (
          <>
            <Text className="mb-8">Blah blah blah scan your chip</Text>

            <Field
              className="text-center mb-2"
              name="address"
              placeholder="Enter your address"
              onChange={(_, v) => setAddressInput(v)}
              value={addressInput}
            />

            <Button
              disabled={
                (!ethers.utils.isAddress(address) &&
                  !isValidEthDomain(address)) ||
                busy
              }
              fullWidth
              shadow
              color="orange-gradient"
              onClick={handleScan}
              loading={busy}
            >
              Scan Item
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <Text className="mb-8">We need to finalize your transactions.</Text>
            <Button
              disabled={
                (!ethers.utils.isAddress(address) &&
                  !isValidEthDomain(address)) ||
                busy
              }
              fullWidth
              shadow
              color="orange-gradient"
              onClick={handleSecondScan}
              loading={busy}
            >
              Finalize
            </Button>
          </>
        )}
      </Popup>

      <Overlay active={successActive} onClose={handleClose}>
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

          <Text size="lg">You earned $RERROs!</Text>
        </MaxWidth>
      </Overlay>
    </>
  );
}
