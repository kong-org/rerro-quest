import Box from "@/components/Box";
import Heading from "@/components/Heading";
import MaxWidth from "@/components/MaxWidth";
import TableCell from "@/components/TableCell";
import TableHeader from "@/components/TableHeader";
import TableRow from "@/components/TableRow";
import Text from "@/components/Text";
import TinyBadge from "@/components/TinyBadge";
import Width from "@/components/Width";
import Footer from "@/modules/Footer";
import Header from "@/modules/Header";
import Hero from "@/modules/Hero";
import Image from "next/image";

const scores = [
  {
    player: "0x219382423439482348234",
    score: 9999999,
  },
  {
    player: "0x219382423439482348234",
    score: 9999999,
  },
  {
    player: "Robbyk.eth",
    score: 9999999,
  },
  {
    player: "0x219382423439482348234",
    score: 9999999,
  },
  {
    player: "0x219382423439482348234",
    score: 9999999,
  },
  {
    player: "0x219382423439482348234",
    score: 9999999,
  },
  {
    player: "0x219382423439482348234",
    score: 9999999,
  },
  {
    player: "0x219382423439482348234",
    score: 9999999,
  },
  {
    player: "0x219382423439482348234",
    score: 9999999,
  },
  {
    player: "0x219382423439482348234",
    score: 9999999,
  },
  {
    player: "0x219382423439482348234",
    score: 9999999,
  },
  {
    player: "0x219382423439482348234",
    score: 9999999,
  },
];

export default function page() {
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

          {scores.map((score, i) => {
            return (
              <div className="pt-1 pb-1 pr-3 pl-3">
                <TableRow highlighted={i === 2}>
                  <TableCell size="s">
                    <TinyBadge>{i + 1}</TinyBadge>
                  </TableCell>
                  <TableCell size="m">
                    <Text size="xs" className="uppercase">
                      {score.player.length > 10
                        ? score.player.slice(0, 8) + "..."
                        : score.player}
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
      </Width>
      <Footer />
    </>
  );
}
