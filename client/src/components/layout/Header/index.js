import React, { useCallback } from "react";
import { useDispatch, connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { Button } from "react-bootstrap";

import styles from "./index.module.sass";

import slide1 from "assets/img/slider/slide1.jpg";
import slide2 from "assets/img/slider/slide2.jpg";
import slide3 from "assets/img/slider/slide3.jpg";
import slide4 from "assets/img/slider/slide4.jpg";

import { changeCategoryHandler } from "../../Categories/logic";

const CarouselHeader = ({ imBusy, categories, selectedCategory }) => {
  const dispatch = useDispatch();

  const changeCategory = useCallback(
    (category) => {
      changeCategoryHandler(category, dispatch);
    },
    [selectedCategory]
  );

  const slides = [
    {
      img: slide1,
      title: "Football EURO 2021",
      desc: "Become part of the team.",
      buttonName: "Place your bet",
      category: categories[0],
    },
    {
      img: slide2,
      title: "Formula 1",
      desc: "Take part in races. Coming soon.",
    },
    { img: slide3, title: "Tennis", desc: "Coming soon." },
    { img: slide4, title: "E-sport", desc: "Coming soon." },
  ];

  const scrollIntoElement = () => {
    const id = "event-box-id";
    const yOffset = -85;
    const element = document.getElementById(id);
    const y =
      element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  if (imBusy.categories) {
    return <div>Loading categories...</div>;
  }

  return (
    <Carousel>
      {slides.map((slide, i) => (
        <Carousel.Item
          key={i}
          style={{ backgroundImage: `url(${slide.img})`, maxHeight: "500px" }}
        >
          <Carousel.Caption>
            <h2 style={{ fontSize: "48px" }}>{slide.title}</h2>
            <p>{slide.desc}</p>
            {slide.buttonName && (
              <Button
                variant="warning"
                className={styles.slideButton}
                onClick={() => scrollIntoElement()}
              >
                {slide.buttonName}
              </Button>
            )}
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

const StaticHeader = () => (
  <div
    className={styles.staticHeader}
    style={{ backgroundImage: `url(${slide1})` }}
  />
);

const Header = ({ imBusy, categories, selectedCategory }) => (
  <header>
    <Switch>
      <Route exact path="/">
        <CarouselHeader
          imBusy={imBusy}
          categories={categories}
          selectedCategory={selectedCategory}
        />
      </Route>
      <Route path="/*" component={StaticHeader} />
    </Switch>
  </header>
);

const mapStateToProps = ({ events }) => ({
  imBusy: events.imBusy,
  categories: events.categories,
  selectedCategory: events.selectedCategory,
});

export default connect(mapStateToProps)(Header);
