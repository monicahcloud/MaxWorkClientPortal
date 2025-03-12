import React from "react";

import Logo from "./Logo";
import DarkMode from "./DarkMode";
import Container from "../global/Containter";
export default function NavBar() {
  return (
    <nav className="border-b">
      <Container className="flex  flex-row justify-between items-center flex-wrap py-8 gap-4">
        <Logo />

        <div className="flex gap-4 items-center">
          <DarkMode />
        </div>
      </Container>
    </nav>
  );
}
