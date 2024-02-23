"use client";

import Badge from "@/app/components/Badge";
import Box from "@/app/components/Box";
import ByKongland from "@/app/components/ByKongland";
import Heading from "@/app/components/Heading";
import Marquee from "@/app/components/Marquee";
import MaxWidth from "@/app/components/MaxWidth";
import Tab from "@/app/modules/Tab";
import Text from "@/app/components/Text";
import Width from "@/app/components/Width";
import FAQQuestion from "@/app/modules/FAQQuestion";
import Footer from "@/app/modules/Footer";
import Header from "@/app/modules/Header";
import Hero from "@/app/modules/Hero";
import TokenBlock from "@/app/modules/TokenBlock";
import ArxIcon from "@/app/svg/ArxIcon";
import AzukiIcon from "@/app/svg/AzukiIcon";
import CabinIcon from "@/app/svg/CabinIcon";
import CoolcatsIcon from "@/app/svg/CoolcatsIcon";
import DropIcon from "@/app/svg/DropIcon";
import FaceIcon from "@/app/svg/FaceIcon";
import GlassesIcon from "@/app/svg/GlassesIcon";
import KrauseIcon from "@/app/svg/KrauseIcon";
import MetaIcon from "@/app/svg/MetaIcon";
import OrbIcon from "@/app/svg/OrbIcon";
import PoolsuiteIcon from "@/app/svg/PoolsuiteIcon";
import Image from "next/image";
import Link from "next/link";
import { Overlay } from "@/app/modules/Overlay";
import PlainBadge from "@/app/components/PlainBadge";
import Popup from "@/app/modules/Popup";
import Button from "@/app/components/Button";
import Field from "@/app/components/Field";

export default function Home() {
  const close = () => {};

  return (
    <>
      <Header />

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
        <Marquee speed={5} className="pt-6 pb-6" repeats={8} color="light">
          24th February @ethdenver
        </Marquee>

        <div className="space-y-1.25">
          <Box>
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
                  Embark on the <strong>$RERRO QUEST</strong> for your chance to
                  win prizes and glory! Your journey starts in KONG Land, a
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

            <Marquee color="dark" className="mb-8" speed={10} slideWidth={917}>
              <GlassesIcon className="ml-5 mr-5" />
              <PoolsuiteIcon className="ml-5 mr-5" />
              <KrauseIcon className="ml-5 mr-5" />
              <AzukiIcon className="ml-5 mr-5" />
              <CabinIcon className="ml-5 mr-5" />
              <FaceIcon className="ml-5 mr-5" />
              <CoolcatsIcon className="ml-5 mr-5" />
              <MetaIcon className="ml-5 mr-5" />
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
                  Chaos has erupted: the Physi-digital Plunderer has absconded
                  with invaluable artifacts (chipped merch), disrupting the
                  harmony between physical and digital realms.
                </p>

                <p>
                  Begin by collecting <strong>$RERROs</strong> scattered across
                  the event. These tokens can be found throughout ETHDenver and
                  only champions charged with enough <strong>$RERRO</strong>{" "}
                  energy will be able to confront the Plunderer and recover the
                  pilfered artifacts.
                </p>

                <Badge tag="h3">Premise</Badge>

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
                buttonText="2,000 TOKENS"
              />
              <TokenBlock
                iconSrc="/images/orb-badge.png"
                heading="The Colossal $RERRO Orb"
                text="Held by the Plunderer"
                buttonText="3,000 TOKENS"
              />
            </div>

            <MaxWidth size="640" className="mt-12 mb-8">
              <Text className="text-center">
                <Badge tag="h3">How to play</Badge>
                <p>
                  When you find an item above, scan it from the &apos;mint
                  zone&apos; using your phone&apos;s NFC reader which will allow
                  you to claim the tokens for free (no gas required) using any
                  WalletConnect-compatible wallet.
                </p>

                <p>
                  <strong>$RERROs</strong> are on the Optimism network, so
                  ensure your wallet is set to Op to collect. Each item can be
                  scanned once per day for its <strong>$RERROs</strong>.
                </p>

                <p>
                  It&apos;s time to scan your way to adventure—let the quest
                  begin!
                </p>
              </Text>
            </MaxWidth>
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

      <Footer />

      <Tab href="/">Start scanning</Tab>

      <Overlay active={false} onClose={close}>
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

      <Popup active={false} onClose={close} className="text-center">
        <Text className="mb-8">
          Short description on scanning items two rows tops lorem ipsum dolor
          sit
        </Text>

        <Field
          className="text-center mb-2"
          name="address"
          placeholder="Enter your address"
          onChange={() => {}}
          value=""
        />

        <Button fullWidth shadow color="orange-gradient">
          Scan Item
        </Button>
      </Popup>
    </>
  );
}
