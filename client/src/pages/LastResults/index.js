import React, { useState } from 'react';

import { Row, Col, Carousel } from 'react-bootstrap'

import classnames from 'classnames';
import styles from './index.module.sass';

import { Button } from 'components/common';

const Tabs = ['Group Stage', '1/8', '1/4', '1/2', 'Final'];

const LastResults = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleSelect = (index) => {
    setActiveTab(index);
  };

  return (
    <Col md="9">
      <Row className="mzero">
        <Col md="12" className={styles.nav}>
          {Tabs.map((category, key) => (
            key === activeTab
              ? <Button variant="warning" onClick={() => setActiveTab(key)}>{category.toUpperCase()}</Button>
              : <Button className="btn-dark" onClick={() => setActiveTab(key)}>{category.toUpperCase()}</Button>
          ))}
        </Col>
        <Col md="12">
          <Carousel
            activeIndex={activeTab}
            fade
            wrap
            controls={false}
            indicators={false}
            interval={3000}
            onSelect={handleSelect}
          >
            {Tabs.map((category, key) => (
              <Carousel.Item className={styles.carouselItem}>
                Sample data here for {category}
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </Col>
  );
};

export default LastResults;
