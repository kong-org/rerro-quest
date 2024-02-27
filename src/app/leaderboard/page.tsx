"use client";

import Box from "@/app/_components/Box";
import Heading from "@/app/_components/Heading";
import MaxWidth from "@/app/_components/MaxWidth";
import TableCell from "@/app/_components/TableCell";
import TableHeader from "@/app/_components/TableHeader";
import TableRow from "@/app/_components/TableRow";
import Text from "@/app/_components/Text";
import PlainBadge from "@/app/_components/PlainBadge";
import Width from "@/app/_components/Width";
import Footer from "@/app/_modules/Footer";
import Header from "@/app/_modules/Header";
import Hero from "@/app/_modules/Hero";
import Image from "next/image";
import { useEffect, useState } from "react";
import identifyTopMinters from "../_helpers/leaderboard";
import { providerMain } from "@/lib/provider";
import Field from "../_components/Field";
import Button from "../_components/Button";
import { ethers } from "ethers";
import isValidEthDomain from "../_helpers/validateEthDomain";
import contract from "@/lib/contract";

export default function Leaderboard() {
  const [scores, setScores] = useState<any>(undefined);
  const [ensDomains, setEnsDomains] = useState<any>({});
  const [address, setAddress] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [balance, setBalance] = useState("");

  useEffect(() => {
    identifyTopMinters(process.env.NEXT_PUBLIC_RERRO_ADDRESS!)
      .then((res) => {
        setScores(res);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (scores && scores.length > 0) {
      Promise.all(
        scores.map((s: any) => providerMain.lookupAddress(s.player))
      ).then((res) => {
        const domains: any = {}; // Initialize an empty object for the domains

        res.forEach((item, i) => {
          if (item && typeof item === "string") {
            domains[scores[i].player] = item; // Assign the domain to the player's address as key
          }
        });

        setEnsDomains(domains);
      });
    }
  }, [scores]);

  const handleAnother = async () => {
    setBusy(false);
    setAddress("");
    setError("");
    setBalance("");
  };

  const handleCheck = async () => {
    setBusy(true);

    // Copy address
    let address2 = address;

    // If eth domain resolve it
    if (isValidEthDomain(address)) {
      try {
        const res = await providerMain.resolveName(address);

        if (res) {
          address2 = res;
        } else {
          setError("Failed to look up ENS name.");
          setBusy(false);
          return;
        }
      } catch (err) {
        setError("Failed to look up ENS name.");
        setBusy(false);
        return;
      }
    }

    // Validate address2 after
    if (!ethers.utils.isAddress(address2)) {
      setError("Invalid address.");
      setBusy(false);
      return;
    }

    // ERC20 Token ABI with only the "balanceOf" function
    try {
      const balance = await contract.balanceOf(address2);
      setBalance(ethers.utils.formatEther(balance).toString());
      setBusy(false);
      setError("");
    } catch (err) {
      setError("Invalid address.");
      setBusy(false);
    }
  };

  return (
    <>
      <Header showBack />

      <Hero padding="tight">
        <MaxWidth size="400">
          <h1>
            <Image
              width="730"
              height="220"
              src="/images/logo.png"
              alt="Leaderboards"
              layout="responsive"
            />
          </h1>
        </MaxWidth>
      </Hero>

      <Width padding="tight">
        {!scores && (
          <Box>
            <Text className="text-center">Fetching the leaderboard...</Text>
          </Box>
        )}

        {scores && (
          <>
            <Box className="mb-5 pt-5 pb-5">
              {!balance && (
                <>
                  <Heading
                    tag="h1"
                    size={6}
                    className="mb-3 uppercase text-orange"
                  >
                    Check your score
                  </Heading>

                  <div className="leaderboard-header__flex">
                    <Field
                      value={address}
                      name="address"
                      onChange={(k, v) => setAddress(v)}
                      placeholder="Address"
                      className="flex-1"
                    />
                    <Button
                      color="orange-gradient"
                      size="s"
                      onClick={handleCheck}
                      disabled={
                        (!ethers.utils.isAddress(address) &&
                          !isValidEthDomain(address)) ||
                        busy
                      }
                    >
                      Check
                    </Button>
                  </div>

                  {error && (
                    <p className="text-danger text-sm text-center mt-3">
                      {error}
                    </p>
                  )}
                </>
              )}

              {balance && (
                <div className="text-center">
                  <Heading className="special-text" tag="h2" size={2}>
                    <strong>{address.slice(0, 8)}</strong> has a balance of{" "}
                    <strong>{balance}&nbsp;$RERROs</strong>
                  </Heading>
                  <Button
                    onClick={handleAnother}
                    className="mt-5"
                    color="orange-gradient"
                    size="s"
                  >
                    Check another
                  </Button>
                </div>
              )}
            </Box>

            <Box padding="none">
              <TableHeader>
                <TableCell size="s">
                  <Heading
                    tag="h2"
                    size={6}
                    className="uppercase"
                    color="orange"
                    bold
                  >
                    Position
                  </Heading>
                </TableCell>
                <TableCell size="m">
                  <Heading
                    tag="h2"
                    size={6}
                    className="uppercase"
                    color="orange"
                    bold
                  >
                    Player
                  </Heading>
                </TableCell>
                <TableCell size="m" className="text-right">
                  <Heading
                    tag="h2"
                    size={6}
                    className="uppercase"
                    color="orange"
                    bold
                  >
                    $RERROs
                  </Heading>
                </TableCell>
              </TableHeader>

              {scores.map((score: any, i: number) => {
                return (
                  <div className="pt-1 pb-1 pr-3 pl-3" key={i}>
                    <TableRow>
                      <TableCell size="s">
                        <PlainBadge size="small">{i + 1}</PlainBadge>
                      </TableCell>
                      <TableCell size="m">
                        <Text size="xs" className="uppercase">
                          {ensDomains[score.player] ? (
                            <>{ensDomains[score.player]}</>
                          ) : (
                            <>
                              {score.player.length > 10
                                ? score.player.slice(0, 8) + "..."
                                : score.player}
                            </>
                          )}
                        </Text>
                      </TableCell>
                      <TableCell size="m" className="text-right">
                        <Text size="xs">{score.score.toLocaleString()}</Text>
                      </TableCell>
                    </TableRow>
                  </div>
                );
              })}
            </Box>
          </>
        )}
      </Width>
      <Footer back />
    </>
  );
}
