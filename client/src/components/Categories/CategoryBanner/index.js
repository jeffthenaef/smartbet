import React from "react";

import FootballCategory from "assets/img/categories/football.png";
import F1Category from "assets/img/categories/f1.png";
import TennisCategory from "assets/img/categories/tennis.png";
import EsportCategory from "assets/img/categories/esport.jpg";

import styles from "./index.module.sass";

const Banners = {
  Football: FootballCategory,
  F1: F1Category,
  Tennis: TennisCategory,
  Esport: EsportCategory,
};

const CategoryBanner = ({ category }) => (
  <img
    className={styles.banner}
    src={Banners[category.name]}
    alt={`${Banners[category.name]} banner`}
  />
);

export default CategoryBanner;
