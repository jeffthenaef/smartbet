import BuyEventTokensModal from './BuyEventTokensModal'

// const EventModal = ({ event, address, modalOpen, setModalOpen }) => {
//   const [availableTokens, setAvailableTokens] = useState(null);
//   const [buyAmount, setBuyAmount] = useState('');
//   const [refundAmount, setRefundAmount] = useState('');

//   useEffect(() => {
//     const requestAvailableTokens = async () => {
//       const requestAvailableTokens = await getBalanceOf(event, address);
//       setAvailableTokens(requestAvailableTokens);
//     };

//     if (address) {
//       requestAvailableTokens();
//     }
//   }, [address]);

//   const closeModal = () => setModalOpen(false);

//   return (
//     <Modal show={modalOpen} onHide={closeModal} className={styles.modal}>
//       <Modal.Header closeButton className={styles.modalHeader}>
//         <Modal.Title className={styles.modalTitle}>Event Token</Modal.Title>
//       </Modal.Header>
//       <Modal.Body className={styles.modalBody}>
//         <h4>Buy</h4>
//         <div className={styles.group}>
//           <Form.Group className={styles.inputContainer}>
//             <Form.Control
//               className={styles.input}
//               value={buyAmount}
//               type="text"
//               placeholder="Ethereum to spend"
//               onChange={e => setBuyAmount(e.target.value)}
//             />
//           </Form.Group>
//           <Button
//             className={styles.button}
//             variant="warning"
//             size="sm"
//             onClick={() => buyEventToken(event, buyAmount, closeModal)}
//             disabled={!buyAmount > 0}
//           >
//             Buy
//             {buyAmount > 0
//               ? <span>&nbsp;{buyAmount} {buyAmount > 1 ? 'Tokens' : 'Token'}</span>
//               : null
//             }
//           </Button>
//         </div>
//         <h4 className={styles.groupTitle}>Refund</h4>
//         <div className={styles.group}>
//           <Form.Group className={styles.inputContainer}>
//             <Form.Control
//               min={0}
//               max={availableTokens || 0}
//               className={styles.input}
//               value={refundAmount}
//               type="number"
//               placeholder="Refund tokens"
//               onChange={e => setRefundAmount(e.target.value)}
//             />
//             <p className={styles.hint}>Available: {availableTokens === null ? 'Loading' : <b>{availableTokens}</b>}</p>
//           </Form.Group>
//           <Button
//             className={styles.button}
//             variant="warning"
//             size="sm"
//             onClick={() => refundEventToken(event, refundAmount, closeModal)}
//             disabled={!refundAmount > 0}
//           >
//             Refund
//             {refundAmount > 0
//               ? <span>&nbsp;{refundAmount} {refundAmount > 1 ? 'Tokens' : 'Token'}</span>
//               : null
//             }
//           </Button>
//         </div>
//       </Modal.Body>
//     </Modal>
//   );
// };

export { BuyEventTokensModal }
