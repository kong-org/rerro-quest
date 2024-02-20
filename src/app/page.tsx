import Badge from "@/components/Badge";
import Box from "@/components/Box";
import ByKongland from "@/components/ByKongland";
import Heading from "@/components/Heading";
import Marquee from "@/components/Marquee";
import MaxWidth from "@/components/MaxWidth";
import Tab from "@/modules/Tab";
import Text from "@/components/Text";
import Width from "@/components/Width";
import FAQQuestion from "@/modules/FAQQuestion";
import Footer from "@/modules/Footer";
import Header from "@/modules/Header";
import Hero from "@/modules/Hero";
import TokenBlock from "@/modules/TokenBlock";
import ArxIcon from "@/svg/ArxIcon";
import AzukiIcon from "@/svg/AzukiIcon";
import CabinIcon from "@/svg/CabinIcon";
import CoolcatsIcon from "@/svg/CoolcatsIcon";
import DropIcon from "@/svg/DropIcon";
import FaceIcon from "@/svg/FaceIcon";
import GlassesIcon from "@/svg/GlassesIcon";
import KrauseIcon from "@/svg/KrauseIcon";
import MetaIcon from "@/svg/MetaIcon";
import OrbIcon from "@/svg/OrbIcon";
import PoolsuiteIcon from "@/svg/PoolsuiteIcon";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />

      <Hero>
        <MaxWidth size="700">
          <h1>
            <Image
              width="730"
              height="220"
              src="/images/logo.png"
              alt="$RERRO Quest"
              layout="responsive"
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
              <Image
                width="511"
                height="350"
                src="/images/cupcakes.png"
                alt="Orbs"
                layout="responsive"
              />
            </MaxWidth>

            <MaxWidth size="430">
              <h2>
                <Image
                  width="430"
                  height="100"
                  src="/images/guardians.png"
                  alt="Join forces with The Guardians of Kong"
                  layout="responsive"
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
                width="320"
                height="60"
                src="/images/quest.png"
                alt="Start your quest"
                layout="responsive"
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
                icon={<DropIcon />}
                heading="$RERRO Drop Points"
                text="Hidden in plain sight"
                buttonText="1,000 TOKENS"
              />
              <TokenBlock
                icon={<ArxIcon />}
                heading="HaLo Chipped Items"
                text="Worn around the event"
                buttonText="2,000 TOKENS"
              />
              <TokenBlock
                icon={<OrbIcon />}
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
            <FAQQuestion question="Tracking Your Triumphs">
              <p>
                Visit <Link href="/leaderboard">rerro.quest/leaderboard</Link>{" "}
                to see your place among adventurers.
              </p>
            </FAQQuestion>
            <FAQQuestion question="Tracking Your Triumphs">
              <p>
                Visit <Link href="/leaderboard">rerro.quest/leaderboard</Link>{" "}
                to see your place among adventurers.
              </p>
            </FAQQuestion>
            <FAQQuestion question="Tracking Your Triumphs">
              <p>
                Visit <Link href="/leaderboard">rerro.quest/leaderboard</Link>{" "}
                to see your place among adventurers.
              </p>
            </FAQQuestion>
            <FAQQuestion question="Tracking Your Triumphs">
              <p>
                Visit <Link href="/leaderboard">rerro.quest/leaderboard</Link>{" "}
                to see your place among adventurers.
              </p>
            </FAQQuestion>
          </Box>
        </div>
      </Width>
      <Footer />
      <Tab href="/">Start scanning</Tab>
    </>
  );
}
