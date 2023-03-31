import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useStockChart } from './chart.logic'

function Chart(props) {
  const chart = useRef(null);
  const stock = useStockChart()

  return (
    <div style={{ height: '100%' }}>
      <div ref={chart} id="chartdiv" style={{ width: 'auto', height: '100%' }} />
    </div>
  );
}

export default Chart;
