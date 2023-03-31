import React, { useState, memo } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap'

import { Button } from 'components/common';

import styles from './index.module.sass';

import { createRequest } from 'shared/api';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    // TO do validation
    createRequest('post', '/api/contact', { email, subject, message });
  };

  return (
    <Col lg="12">
      <Row className="mzero">
        <Col className={styles.contact} lg="12">
          <h2 className={styles.title}>Contact Us</h2>
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Control
                className={styles.input}
                value={email}
                type="email"
                placeholder="Email..."
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                className={styles.input}
                value={subject}
                type="text"
                placeholder="Subject..."
                onChange={e => setSubject(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                className={styles.input}
                value={message}
                type="text"
                placeholder="Message..."
                as="textarea"
                onChange={e => setMessage(e.target.value)}
              />
            </Form.Group>
            <Button variant="dark" type="submit" onClick={onSubmit}>
              Send Message
            </Button>
          </Form>
        </Col>
      </Row>
    </Col>
  );
};

export default Contact;
