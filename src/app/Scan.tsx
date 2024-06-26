"use client";

// @ts-ignore
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web";

import {
  haloRecoverPublicKey,
  haloConvertSignature,
  SECP256k1_ORDER,
  //@ts-ignore
} from "@arx-research/libhalo/api/common.js";

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
import isUsed from "./_helpers/isUsed";
import Link from "next/link";
import findValidPublicKey from "./_helpers/findValidPublicKey";

interface IProps {
  scanActive: boolean;
  setScanActive(scanActive: boolean): void;
}

export default function Scan({ scanActive, setScanActive }: IProps) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [address, setAddress] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const [step, setStep] = useState(1);
  const [cert, setCert] = useState("");
  const [chipAddress, setChipAddress] = useState("");
  const [successActive, setSuccessActive] = useState(false);

  const handleScan = async () => {
    setBusy(true);

    const isPaused = await contract.mintPaused();

    if (isPaused) {
      setError("Minting is currently paused.");
      setBusy(false);
      return;
    }

    // Build transaction
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
        legacySignCommand: true,
      });

      // Get address
      const publicKeys = await haloRecoverPublicKey(
        chipSig.input.digest,
        chipSig.signature.der,
        SECP256k1_ORDER
      );

      let foundKey = await findValidPublicKey(publicKeys);
      let chipAddress = foundKey.address;

      // Store chip address
      setChipAddress(chipAddress);

      // Convert signature
      const sig = await haloConvertSignature(
        chipSig.input.digest,
        chipSig.signature.der,
        foundKey.publicKey,
        SECP256k1_ORDER
      );

      // Check the owner id
      const ownerId = await contract.chipIdOwner(chipAddress);

      if (isUsed(ownerId) && ownerId == address) {
        setError("You cannot claim your own chip.");
        setBusy(false);
        return;
      }

      // Store certificate
      const cert = await getSignatureForAddress(chipAddress);
      setCert(cert);

      // Already used
      const scannedRaw = localStorage.getItem("scanned") || "{}";
      const scanned = JSON.parse(scannedRaw);

      if (scanned[chipAddress]) {
        setError("You've already scanned this chip.");
        setBusy(false);
        return;
      }

      // Check if seeded
      const isSeeded = await contract.seededChips(chipAddress);

      // If it's not seeded we go to second step
      if (!isSeeded) {
        setStep(2);
        setError("");
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
                  from: chipAddress,
                },
                signature: {
                  r: "0x" + sig.raw.r,
                  s: "0x" + sig.raw.s,
                  v: sig.raw.v,
                },
              }),
              headers: { "Content-Type": "application/json" },
            }
          );
          // Assuming the server responds with JSON
          const responseData = await response.json();

          // Save in storage
          scanned[chipAddress] = true;
          localStorage.setItem("scanned", JSON.stringify(scanned));

          localStorage.setItem("address", address);
          localStorage.setItem("addressInput", addressInput);

          setSuccessActive(true);
          setError("");
        } catch (error) {
          console.log(error);
          setError("Something went wrong.");
        }
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong.");
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
      legacySignCommand: true,
    });

    // Get address
    const publicKeys = await haloRecoverPublicKey(
      chipSig.input.digest,
      chipSig.signature.der,
      SECP256k1_ORDER
    );

    let foundKey = await findValidPublicKey(publicKeys);
    let chipAddress = foundKey.address;

    // Convert signature
    const sig = await haloConvertSignature(
      chipSig.input.digest,
      chipSig.signature.der,
      foundKey.publicKey,
      SECP256k1_ORDER
    );

    // Send it off
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_ACTION_WEBHOOK_URL!,
        {
          method: "POST",
          body: JSON.stringify({
            request: {
              ...transaction,
              from: chipAddress,
            },
            signature: {
              r: "0x" + sig.raw.r,
              s: "0x" + sig.raw.s,
              v: sig.raw.v,
            },
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      // Assuming the server responds with JSON
      const responseData = await response.json();

      // Save in storage
      const scannedRaw = localStorage.getItem("scanned") || "{}";
      const scanned = JSON.parse(scannedRaw);
      scanned[chipAddress] = true;
      localStorage.setItem("scanned", JSON.stringify(scanned));

      localStorage.setItem("address", address);
      localStorage.setItem("addressInput", addressInput);

      setSuccessActive(true);
    } catch (error) {
      console.error("Failed to post transaction:", error);
    }

    setBusy(false);
  };

  const handleClose = () => {
    setBusy(false);
    setStep(1);
    setCert("");
    setScanActive(false);
    setSuccessActive(false);
  };

  useEffect(() => {
    // Valid eth domain
    if (isValidEthDomain(addressInput)) {
      setBusy(true);

      providerMain
        .resolveName(addressInput)
        .then((res) => {
          if (res) {
            setError("");
            setAddress(res);
          } else {
            setError("Failed to look up ENS name.");
            setAddress("");
          }

          setBusy(false);
        })
        .catch((err) => {
          setAddress("");
          setBusy(false);
        });
    }
    // Valid address
    else if (ethers.utils.isAddress(addressInput)) {
      setAddress(addressInput);
      setBusy(false);
    } else {
      setAddress("");
      setBusy(false);
    }
  }, [addressInput]);

  useEffect(() => {
    const address = localStorage.getItem("addressInput");
    if (address) setAddressInput(address);
  }, []);

  return (
    <>
      <Tab onClick={() => setScanActive(true)}>Start scanning</Tab>

      <Popup active={scanActive} onClose={handleClose} className="text-center">
        {step === 1 && (
          <>
            <Text className="mb-8">
              Enter the address where you want to claim $RERROs
            </Text>

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

            {error && (
              <p className="text-danger text-sm text-center mt-3">{error}</p>
            )}
          </>
        )}

        {step === 2 && (
          <>
            <Text className="mb-8">
              You're the first scanner of this chip! Scan again to finalize.
            </Text>
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

            {error && (
              <p className="text-danger text-sm text-center mt-3">{error}</p>
            )}
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
          <Heading className="mt-4 mb-5 font-expanded" tag="h2" size={1}>
            Congratulations!
          </Heading>

          <Text size="lg">You earned $RERROs!</Text>

          <Button
            className="mt-5"
            color="line-black"
            size="s"
            href="/leaderboard"
          >
            View leaderboard
          </Button>
        </MaxWidth>
      </Overlay>
    </>
  );
}
