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

export default function Leaderboard() {
  const [scores, setScores] = useState<any>(undefined);
  const [ensDomains, setEnsDomains] = useState<any>({});

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
            <Text className="text-center">Fetching the leaderboards...</Text>
          </Box>
        )}

        {scores && (
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
        )}
      </Width>
      <Footer back />
    </>
  );
}
