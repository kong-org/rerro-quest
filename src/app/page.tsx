"use client";

import Badge from "@/app/_components/Badge";
import Box from "@/app/_components/Box";
import ByKongland from "@/app/_components/ByKongland";
import Heading from "@/app/_components/Heading";
import Marquee from "@/app/_components/Marquee";
import MaxWidth from "@/app/_components/MaxWidth";
import Text from "@/app/_components/Text";
import Width from "@/app/_components/Width";
import FAQQuestion from "@/app/_modules/FAQQuestion";
import Footer from "@/app/_modules/Footer";
import Header from "@/app/_modules/Header";
import Hero from "@/app/_modules/Hero";
import TokenBlock from "@/app/_modules/TokenBlock";
import AzukiIcon from "@/app/_svg/AzukiIcon";
import CoolcatsIcon from "@/app/_svg/CoolcatsIcon";
import KrauseIcon from "@/app/_svg/KrauseIcon";
import MetaIcon from "@/app/_svg/MetaIcon";
import Image from "next/image";
import Link from "next/link";
import Scan from "./Scan";
import JubmojiIcon from "./_svg/JubmojiIcon";
import OcrIcon from "./_svg/OcrIcon";
import KonglandIcon from "./_svg/KonglandIcon";
import { useState } from "react";
import Register from "./Register";

const prizes = [
  {
    url: "/images/prize-1.png",
    alt: "prize!",
    width: 253,
    height: 300,
    maxWidth: 253,
  },
  {
    url: "/images/prize-2.png",
    alt: "prize!",
    width: 175,
    height: 150,
    maxWidth: 150,
  },
  {
    url: "/images/prize-3.png",
    alt: "prize!",
    width: 284,
    height: 300,
    maxWidth: 284,
  },
  {
    url: "/images/prize-4.png",
    alt: "prize!",
    width: 166,
    height: 150,
    maxWidth: 166,
  },
  {
    url: "/images/prize-5.png",
    alt: "prize!",
    width: 365,
    height: 300,
    maxWidth: 365,
  },
  {
    url: "/images/prize-6.png",
    alt: "prize!",
    width: 180,
    height: 150,
    maxWidth: 180,
  },
  {
    url: "/images/prize-7.png",
    alt: "prize!",
    width: 370,
    height: 300,
    maxWidth: 370,
  },
  {
    url: "/images/prize-8.png",
    alt: "prize!",
    width: 112,
    height: 150,
    maxWidth: 112,
  },
  {
    url: "/images/prize-9.png",
    alt: "prize!",
    width: 220,
    height: 300,
    maxWidth: 220,
  },
  {
    url: "/images/prize-10.png",
    alt: "prize!",
    width: 178,
    height: 300,
    maxWidth: 178,
  },
];

export default function Home() {
  const [scanActive, setScanActive] = useState(false);
  const [registerActive, setRegisterActive] = useState(false);

  return (
    <>
      <Header onStart={() => setRegisterActive(true)} />

      <Hero>
        <MaxWidth size="700">
          <h1>
            <Image
              width="730"
              height="220"
              className="image"
              src="/images/logo.png"
              alt="$RERRO Quest"
            />
          </h1>
          <ByKongland className="mt-8" />
        </MaxWidth>
      </Hero>

      <Width>
        <Marquee
          fade
          speed={5}
          className="pt-6 pb-6"
          repeats={8}
          color="light"
          isText
        >
          28th February @ethdenver
        </Marquee>

        <div className="space-y-1.25">
          <Box padding="none" className="pt-6 pb-6">
            <div className="pl-6 pr-6">
              <MaxWidth size="510">
                <div className="video-placeholder">
                  <video
                    autoPlay
                    loop
                    playsInline
                    muted
                    poster="/images/orbs.mp4"
                  >
                    <source src="/videos/orbs.mp4" />
                  </video>
                </div>
              </MaxWidth>

              <MaxWidth size="430">
                <h2>
                  <Image
                    className="image"
                    width="430"
                    height="100"
                    src="/images/guardians.png"
                    alt="Join forces with The Guardians of Kong"
                  />
                </h2>
              </MaxWidth>

              <MaxWidth size="640" className="mt-12">
                <Text className="text-center">
                  <p>
                    Embark on the <strong>$RERRO QUEST</strong> for your chance
                    to win prizes and glory! Your journey starts in KONG Land, a
                    cryptostate where the fabric of reality weaves through the
                    known and the unimaginable.
                  </p>

                  <p>
                    Rally alongside new adventurers under the banner of the
                    Guardians to restore order. Your secret weapon?{" "}
                    <strong>$RERROs</strong> - the ambrosia of KONG Land's
                    inhabitants (IYKYK) - renowned for their 'up only' vitality.
                  </p>
                </Text>
              </MaxWidth>

              <Heading
                className="text-center uppercase mt-12 mb-8"
                tag="h3"
                size={6}
              >
                Scan products by these companies
              </Heading>
            </div>

            <Marquee color="dark" className="mb-8" speed={20}>
              <AzukiIcon className="ml-5 mr-5" />
              <JubmojiIcon className="ml-5 mr-5" />
              <CoolcatsIcon className="ml-5 mr-5" />
              <MetaIcon className="ml-5 mr-5" />
              <OcrIcon className="ml-5 mr-5" />
              <KonglandIcon className="ml-5 mr-5" />
              <KrauseIcon className="ml-5 mr-5" />
              <div className="ml-5 mr-5" style={{ width: 73 }}>
                <Image
                  width="146"
                  height="120"
                  className="image"
                  src="/images/house.png"
                  alt="House of Guccheetah"
                />
              </div>
            </Marquee>
          </Box>

          <Box>
            <MaxWidth size="320" className="mt-8">
              <Image
                className="image"
                width="320"
                height="60"
                src="/images/quest.png"
                alt="Start your quest"
              />
            </MaxWidth>

            <MaxWidth size="640" className="mt-12 mb-12">
              <Text className="text-center">
                <Badge tag="h3">Premise</Badge>

                <p>
                  Chaos has erupted: the Digiphysical Man has absconded
                  with invaluable artifacts (chipped merch), disrupting the
                  harmony between physical and digital realms.
                </p>

                <p>
                  Begin by collecting <strong>$RERROs</strong> scattered across
                  the event. These tokens can be found throughout ETHDenver and
                  only champions charged with enough <strong>$RERRO</strong>{" "}
                  energy will be able to confront the Digiphysical Man and recover the
                  pilfered artifacts.
                </p>

                <Badge tag="h3">Tokens</Badge>

                <p>
                  Each claim will power you up the leaderboard. There are three
                  ways to collect <strong>$RERROs</strong>:
                </p>
              </Text>
            </MaxWidth>

            <div className="grid grid-cols-3 gap-1.25">
              <TokenBlock
                iconSrc="/images/rerro-badge.png"
                heading="$RERRO Drop Points"
                text="Hidden in plain sight"
                buttonText="1,000 TOKENS"
              />
              <TokenBlock
                iconSrc="/images/halo-badge.png"
                heading="HaLo Chipped Items"
                text="Worn around the event"
                buttonText="250-500 TOKENS"
              />
              <TokenBlock
                iconSrc="/images/orb-badge.png"
                heading="The Colossal $RERRO Orb"
                text="Held by the Digiphysical Man"
                buttonText="3,000 TOKENS"
              />
            </div>

            <MaxWidth size="640" className="mt-12 mb-8">
              <Text className="text-center">
                <Badge tag="h3">How to play</Badge>
                <p>
                  Scan any HaLo by tapping "Start Scanning" below. This could a
                  chipped hoodie from Cool Cats, an OCR record, a Jubmoji card
                  -- really, any HaLo made after 2022 works! Enter in your
                  address or ENS and the claim will be processed for free; no
                  gas needed to claim and you don't need to connect your wallet.
                </p>

                <p>
                  <strong>$RERROs</strong> are on the Base network. Each item
                  can be scanned once by a given wallet for its{" "}
                  <strong>$RERROs</strong>.
                </p>

                <p>
                  It&apos;s time to scan your way to adventure -- let the quest
                  begin.
                </p>
              </Text>
            </MaxWidth>
          </Box>

          <Box padding="none" className="pt-6 pb-6">
            <MaxWidth size="180" className="mt-8">
              <Image
                className="image"
                width="366"
                height="120"
                src="/images/receive-prizes.png"
                alt="Start your quest"
              />
            </MaxWidth>

            <Marquee color="dark" speed={50} className="marquee--prizes mt-12">
              {prizes.map((prize, i) => {
                return (
                  <div className={`prize prize-${i + 1}`} key={i}>
                    <Image
                      key={i}
                      width={prize.width}
                      height={prize.height}
                      className="image"
                      src={`/images/prize-${i + 1}.png`}
                      alt={prize.alt}
                    />
                  </div>
                );
              })}
            </Marquee>

            <div className="pl-6 pr-6">
              <MaxWidth size="640" className="mt-12 mb-12">
                <Text className="text-center">
                  Chaos has erupted: the Digiphysical Man has absconded
                  with invaluable artefacts (chipped merch), disrupting the
                  harmony between physical and digital realms.
                </Text>
              </MaxWidth>
            </div>
          </Box>

          <Box color="grey" className="text-white">
            <Heading size={2} tag="h2" className="text-center">
              FAQ
            </Heading>

            <FAQQuestion question="Tracking Your Triumphs">
              <p>
                Visit <Link href="/leaderboard">rerro.quest/leaderboard</Link>{" "}
                to see your place among adventurers.
              </p>
            </FAQQuestion>

            <FAQQuestion question="Forge Connections, Seek Assistance">
              <p>
                Follow{" "}
                <Link target="_blank" href="https://x.com/Kongiscash">
                  @kongiscash
                </Link>{" "}
                and join the #rerro-quest channel in the{" "}
                <Link target="_blank" href="https://discord.gg/dypeg4JfTX">
                  KONG Land Discord
                </Link>{" "}
                for guidance and camaraderie on your quest.
              </p>
            </FAQQuestion>
            <FAQQuestion question="What is KONG Land?">
              <p>
                KONG Land is an experimental cryptostate with a mission to
                bridge the physical world to the digital metaverse through
                global adoption of its public good, secure chip technology.
              </p>

              <p>
                Learn more at{" "}
                <Link target="_blank" href="https://kong.land/KONG.land">
                  Kong.land
                </Link>
                .
              </p>
            </FAQQuestion>
            <FAQQuestion question="What are HaLo secure chips?">
              <p>
                HaLo secure chips, developed by Arx Research—the manufacturing
                hub of KONG Land— transform physical objects into digital
                assets. These chips use ECDSA signatures to authenticate and
                link physical items to digital equivalents, such as ERC-20
                tokens and NFTs. They're immutable, composable, and powerful,
                supporting a broad array of decentralized applications.
              </p>
              <p>
                Discover more at{" "}
                <Link target="_blank" href="http://arx.org">
                  Arx.org
                </Link>
              </p>
            </FAQQuestion>
          </Box>
        </div>
      </Width>

      <Footer
        onScan={() => setScanActive(true)}
        onRegister={() => setScanActive(true)}
      />

      <Scan scanActive={scanActive} setScanActive={setScanActive} />
      <Register
        registerActive={registerActive}
        setRegisterActive={setRegisterActive}
      />
    </>
  );
}
