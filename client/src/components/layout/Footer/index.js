import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./index.module.sass";

import { routesURL } from "shared/routes";
import { Categories } from "shared/contracts/contractsData";

import FooterSocial from "./FooterSocial";
import FooterPartners from "./FooterPartners";

const navItems = [
  {
    title: "Our Leagues",
    items: Categories.map((category) => ({
      name: category.name,
      url: `${routesURL.sports}/${category.name.toLowerCase()}`,
    })),
  },
  {
    title: "How to start?",
    items: [
      { name: "Lorem ipsum 1", url: "/" },
      { name: "Lorem ipsum 2", url: "/" },
      { name: "FAQ", url: "/" },
    ],
  },
  {
    title: "Bonus",
    items: [
      { name: "Income BONUS €300", url: "/" },
      { name: "Invite Friend €300", url: "/" },
    ],
  },
  {
    title: "Informations",
    items: [
      { name: "About us", url: "/" },
      { name: "Contact us", url: "/" },
      { name: "Terms&Conditions", url: "/" },
      { name: "Privacy policy", url: "/" },
    ],
  },
];

const NavItemsNode = navItems.map((col) => (
  <Col md="3" key={col.title} style={{ textAlign: "center" }}>
    <h3 className={styles.listTitle}>{col.title}</h3>
    <ul className={styles.list}>
      {col.items.map((item) => (
        <li className={styles.listItem} key={item.name}>
          <Link className={styles.listLink} to={item.url}>
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  </Col>
));

const Footer = () => (
  <React.Fragment>
    <FooterSocial />
    <FooterPartners />
    <footer className={styles.footer}>
      <Container>
        <Row>{NavItemsNode}</Row>
        <hr />
      </Container>
      <Container className={styles.footerBottom}>
        <p className="m-0 text-center">Copyright © SCT-BET 2019</p>
      </Container>
    </footer>
  </React.Fragment>
);

export default Footer;
