import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap'

import { Loader } from 'components/common';
import { EventsSelector } from 'components/Events';

import { Categories } from 'shared/contracts/contractsData';

const Sports = ({ match }) => {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const categoryIndex = Categories.findIndex(category => category.name.toLowerCase() === match.params.category);
    setCategory(categoryIndex);
  }, [match]);


  return (
    <Col lg="12">
      <Row className="mzero">
        {category !== null
          ? category !== -1
            ? (
              <React.Fragment>
                <Col lg="12">
                  <h2>{Categories[category].name}</h2>
                </Col>
                <EventsSelector {...{ category, withBanner: true }} />
              </React.Fragment>
            )
            : <p>Category doesn`t exists</p>
          : null
        }
      </Row>
    </Col>
  );
};

export default Sports;
