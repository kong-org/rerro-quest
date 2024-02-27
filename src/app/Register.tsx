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
import isUsed from "./_helpers/isUsed";

interface IProps {
  registerActive: boolean;
  setRegisterActive(scanActive: boolean): void;
}

export default function Register({
  registerActive,
  setRegisterActive,
}: IProps) {
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

    const transaction: any = {
      to: contract.address,
      value: 0,
      gas: ethers.utils.hexlify(1000000), // gas limit
      deadline: ethers.utils.hexlify(Math.floor(Date.now() / 1000) + 60 * 1440), // 1 day
      salt: ethers.utils.hexlify(ethers.utils.randomBytes(32)),
      data: contract.interface.encodeFunctionData("claimOwnership", [address]),
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

      // Already used
      const ownerId = await contract.chipIdOwner(chipAddress);
      const used = isUsed(ownerId);

      console.log({ ownerId, used });

      if (used) {
        setError("This chip has already been registered.");
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
          setStep(1);
          setError("");
        } catch (error) {
          console.error("Failed to post transaction:", error);
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
      data: contract.interface.encodeFunctionData(
        "claimOwnershipWithSignature",
        [address, cert]
      ),
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
    setStep(1);
    setCert("");
    setRegisterActive(false);
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
            setError("Invalid ens domain.");
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

  return (
    <>
      <Popup
        active={registerActive}
        onClose={handleClose}
        className="text-center"
      >
        {step === 1 && (
          <>
            <Text className="mb-8">
              Register your item before the event to get rewards when this item
              gets scanned.
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
              Register Item
            </Button>

            {error && (
              <p className="text-danger text-sm text-center mt-3">{error}</p>
            )}
          </>
        )}

        {step === 2 && (
          <>
            <Text className="mb-8">
              Register your item before the event to get rewards when this item
              gets scanned.
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
          <Heading className="mt-4 mb-5" tag="h2" size={1}>
            Yay!
          </Heading>

          <Text size="lg">Your item has been registered.</Text>
        </MaxWidth>
      </Overlay>
    </>
  );
}
