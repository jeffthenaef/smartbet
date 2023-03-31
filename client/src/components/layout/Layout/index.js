import React, { memo } from "react";
import { connect } from "react-redux";

import { Menu, Header, Routing, Footer } from "..";

const Layout = () => {
  return (
    <>
      <Menu />
      <Header />
      <Routing />
      <Footer />
    </>
  );
};

// <Header />
// <Routing />
// <Footer />

export default memo(Layout);
