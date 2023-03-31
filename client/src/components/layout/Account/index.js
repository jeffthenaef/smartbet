import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Nav, Modal } from 'react-bootstrap'

import styles from './index.module.sass';

import { Button, TextEllipsis, ExternalLink } from 'components/common'

import { routesURL } from 'shared/routes';

import MetamaskIcon from 'assets/icons/about/metamask.png';

function addressCover(address) {
  return `${address.slice(0, 6)}...${address.slice(address.length - 4, address.length)}`
}

const Account = ({ user, network }) => {
  const { address } = user.wallet
  const [modalOpen, setModalOpen] = useState(false);

  return address
    ? (
      <div>
        <Link to={`${routesURL.profile}/${address}`}>
          <Button
            variant="success"
            className={styles.login}
            size="sm"
            style={{
              backgroundColor: `#${address.slice(2, 8)}`,
              borderColor: `#${address.slice(2, 8)}`,
              boxShadow: 'none',
            }}
          >
            {addressCover(address)}
          </Button>
        </Link>
      </div>
    ) : (
      <React.Fragment>
        <Nav.Item as="li">
          <Button onClick={() => setModalOpen(true)} variant="success" className={styles.login} size="sm">Login</Button>
        </Nav.Item>
        <Modal show={modalOpen} onHide={() => setModalOpen(false)} className={styles.modal}>
          <Modal.Header closeButton className={styles.modalHeader}>
            <Modal.Title className={styles.modalTitle}>Want to play?</Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.modalBody}>
            <p><strong>You need a safe place to store all of your tokens</strong></p>
            <img className="mb-2" src={MetamaskIcon} alt="Metamask Icon" />
            <p>The perfect place is in a secure wallet like METAMASK. This will also act as you login to the game (no extra password needed)</p>
          </Modal.Body>
          <Modal.Footer className={styles.modalFooter}>
            <ExternalLink href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn">
              <Button className={styles.webstoreButton} variant="warning" size="sm">
                Get from Chrome Web Store <i className="fas fa-paper-plane-o ml-1" />
              </Button>
            </ExternalLink>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
};

const mapStateToProps = ({
  user,
}) => ({
  user,
});

export default connect(mapStateToProps)(Account);
