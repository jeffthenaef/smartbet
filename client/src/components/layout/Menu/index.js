import React, { memo } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Nav, Navbar, Dropdown, Container } from "react-bootstrap";

import classnames from "classnames";
import styles from "./index.module.sass";

import Logo from "assets/img/logo.png";

import { routes, routesURL } from "shared/routes";
import { Categories } from "shared/contracts/contractsData";

import MenuAccount from "../Account";

const SportsCategories = Categories.map((category) => (
  <Link
    key={category.name}
    to={`${routesURL.sports}/${category.name.toLowerCase()}`}
    className={classnames("dropdown-item", styles.dropdownItem)}
  >
    {category.name}
  </Link>
));

const subPlaceholderFootball = [
  "Euro 2021",
  "Euro 2020",
  "Euro 2019",
  "Euro 2018",
];
const subPlaceholderFormula = ["F1 2021", "F1 2020", "F1 2019", "F12 018"];
const subPlaceholderEsport = [
  "CS:GO 2021",
  "CS:GO 2020",
  "CS:GO 2019",
  "CS:GO 2018",
];
const subPlaceholderTennis = [
  "Wimbledon 2021",
  "Wimbledon 2020",
  "Wimbledon 2019",
  "Wimbledon 2018",
];

console.log(Categories);

const SportsCategoriesTwo = Categories.map((category) => (
  <Dropdown as="li" className="nav-item">
    <Dropdown.Toggle as={Nav.Link}>{category.name}</Dropdown.Toggle>
    <Dropdown.Menu as="ul" className={styles.dropdownMenu}>
      {category.name === "Football" &&
        subPlaceholderFootball.map((el, i) => (
          <Link
            key={i}
            to="#"
            className={classnames("dropdown-item", styles.dropdownItem)}
          >
            {el}
          </Link>
        ))}
      {category.name === "Formula" &&
        subPlaceholderFormula.map((el, i) => (
          <Link
            key={i}
            to="#"
            className={classnames("dropdown-item", styles.dropdownItem)}
          >
            {el}
          </Link>
        ))}
      {category.name === "E-sport" &&
        subPlaceholderEsport.map((el, i) => (
          <Link
            key={i}
            to="#"
            className={classnames("dropdown-item", styles.dropdownItem)}
          >
            {el}
          </Link>
        ))}
      {category.name === "Tennis" &&
        subPlaceholderTennis.map((el, i) => (
          <Link
            key={i}
            to="#"
            className={classnames("dropdown-item", styles.dropdownItem)}
          >
            {el}
          </Link>
        ))}
    </Dropdown.Menu>
  </Dropdown>
));

const NavItems = routes
  .filter((el) => el.url !== "/stock")
  .map((route) =>
    route.url === routesURL.sports ? (
      <Dropdown key={route.url} as="li" className="nav-item">
        <Dropdown.Toggle as={Nav.Link}>Sports</Dropdown.Toggle>
        <Dropdown.Menu as="ul" className={styles.dropdownMenu}>
          {SportsCategoriesTwo}
        </Dropdown.Menu>
      </Dropdown>
    ) : (
      <Nav.Item key={route.url} as="li">
        <Link to={route.url} className="nav-link">
          {route.name}
        </Link>
      </Nav.Item>
    )
  );

const Menu = ({ address, network }) => (
  <Navbar fixed="top" expand="lg" className="navbar-dark">
    <Container>
      <Navbar.Brand>
        <Link to="/">
          <img src={Logo} alt="" />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="collapes">
        <Nav as="ul" className={styles.nav}>
          {NavItems}
          <MenuAccount {...{ address }} />
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

const mapStateToProps = ({ user: { address }, network }) => ({
  address,
  network,
});

export default connect(mapStateToProps)(Menu);
