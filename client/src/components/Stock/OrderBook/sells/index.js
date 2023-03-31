import React, { useMemo } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";

import styles from "../styles/index.module.sass";

// Dodać sortowanie od najdrozszych od góry, tak samo w orderList
function addressCover(address) {
  return `${address.slice(0, 3)}...${address.slice(
    address.length - 4,
    address.length
  )}`;
}

const SingleSell = (order) => {
  const { nonce, take, give, onClick, creator } = order;
  return useMemo(
    () => (
      <tr>
        <td>{take}</td>
        <td>{give}</td>
        <td>
          <Button
            type="button"
            variant="danger"
            size="sm"
            onClick={() => onClick(order)}
            className={styles.buttonSell}
          >
            BUY
            {/* {addressCover(creator)} */}
          </Button>
        </td>
      </tr>
    ),
    [nonce]
  );
};

// const SingleSell = (order) => {
//   const { nonce, take, give, onClick, creator } = order;
//   return useMemo(
//     () => (
//       <tr>
//         <td>{take}</td>
//         <td>{give}</td>
//         <td>
//           <Button
//             type="button"
//             variant="danger"
//             size="sm"
//             onClick={() => onClick(order)}
//           >
//             Buy from {addressCover(creator)}
//           </Button>
//         </td>
//       </tr>
//     ),
//     [nonce]
//   );
// };

const Sells = ({ sells, finalizeSell, wallet }) => {
  const { address } = wallet;
  if (sells.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan="3">
            <span>zero sell orders</span>
          </td>
        </tr>
        {/* <tr>
          <td colSpan="3">
            <span>total ETH vol</span>
            <span>total tokens vol</span>
          </td>
        </tr> */}
      </tbody>
    );
  }

  // W orderList to samo, tylko wtedy gdu userAdress === creator
  return (
    <tbody>
      {sells
        .filter(({ creator }) => address !== creator)
        .map((el) => (
          <SingleSell key={el.nonce} {...el} onClick={finalizeSell} />
        ))}
      {/* <tr>
        <td colSpan="3">
          <span>total ETH vol</span>
          <span>total tokens vol</span>
        </td>
      </tr> */}
    </tbody>
  );
};

const mapStateToProps = ({ user }) => ({
  wallet: user.wallet,
});

export default connect(mapStateToProps)(Sells);
