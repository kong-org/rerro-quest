import React from "react";
import Header from "../_modules/Header";
import Footer from "../_modules/Footer";
import Width from "../_components/Width";
import Box from "../_components/Box";

export default function page() {
  return (
    <>
      <Header className="large" showBack />
      <Width className="large-width">
        <Box>
          <div className="game-holder">
            <iframe
              src="https://itch.io/embed-upload/9800927?color=333333"
              width="960"
              height="740"
            ></iframe>
          </div>
        </Box>
      </Width>

      <Footer />
    </>
  );
}
