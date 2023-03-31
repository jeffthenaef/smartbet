import React, { useState, memo, useMemo, useCallback, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

import { Button } from "components/common";
import { EventsSelector } from "components/Events";
import { CategoryBanner } from "components/Categories";

import { changeCategoryHandler } from "../logic";

import styles from "./index.module.sass";

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

const CategoriesList = ({ imBusy, categories, selectedCategory }) => {
  const dispatch = useDispatch();

  const changeCategory = useCallback(
    (category) => {
      changeCategoryHandler(category, dispatch);
    },
    [selectedCategory]
  );

  useEffect(() => {
    if (isEmptyObject(selectedCategory)) {
      changeCategoryHandler({}, dispatch);
    }
  }, [imBusy]);

  if (imBusy.categories) {
    return <div>loading categories</div>;
  }

  return (
    <React.Fragment>
      <Col md="12" className={styles.nav}>
        <Row>
          <Col md="12">
            <CategoryBanner category={selectedCategory} />
          </Col>
          {categories.map((category, key) => (
            <Col md="3" key={category.name}>
              {selectedCategory.name === category.name ? (
                <Button
                  disabled
                  variant="warning"
                  onClick={() => changeCategory(category)}
                >
                  {category.name}
                </Button>
              ) : (
                <Button
                  className="btn-dark"
                  // onClick={() => changeCategory(category)}
                >
                  {category.name}
                </Button>
              )}
            </Col>
          ))}
        </Row>
      </Col>
    </React.Fragment>
  );
};

const mapStateToProps = ({ events }) => ({
  imBusy: events.imBusy,
  categories: events.categories,
  selectedCategory: events.selectedCategory,
});

export default connect(mapStateToProps)(CategoriesList);
