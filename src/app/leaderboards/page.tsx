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
                    <PlainBadge>{i + 1}</PlainBadge>
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
