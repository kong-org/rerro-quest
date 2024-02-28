import React from "react";
import Header from "../_modules/Header";
import Footer from "../_modules/Footer";
import Width from "../_components/Width";
import Box from "../_components/Box";
import Heading from "../_components/Heading";
import Text from "../_components/Text";

export default function page() {
  return (
    <>
      <Header className="large" showBack />
      <Width className="large-width">
        <Box>
          <div className="game-holder">
            <iframe src="https://itch.io/embed-upload/9800927?color=333333"></iframe>

            <div className="game-holder-overlay">
              <div>
                <Heading tag="h2" size={1}>
                  Too small
                </Heading>
                <Text>
                  Please explain your browser to a minimum width of 1050px.
                </Text>
              </div>
            </div>
          </div>
        </Box>
      </Width>

      <Footer />
    </>
  );
}
