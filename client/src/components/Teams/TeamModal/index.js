import BuyTeamTokensModal from './BuyTeamTokensModal'

// const TeamModal = ({ event, team, user, modalOpen, setModalOpen }) => {
//   const [amount, setAmount] = useState('0')
//   const handleBuyTeamToken = useCallback(()=>{},[])
//   return (
//     <Modal show={modalOpen} onHide={closeModal} className={styles.modal}>
//       <Modal.Header closeButton className={styles.modalHeader}>
//         <Modal.Title className={styles.modalTitle}>Team Token {tokenData.symbol}</Modal.Title>
//       </Modal.Header>
//       <Modal.Body className={styles.modalBody}>
//         <h4>Buy</h4>
//         <div className={styles.group}>
//           <Form.Group className={styles.inputContainer}>
//             <Form.Control
//               min={0}
//               max={eventTokens || 0}
//               className={styles.input}
//               value={buyAmount}
//               type="number"
//               placeholder="Team Tokens"
//               onChange={e => setBuyAmount(e.target.value)}
//             />
//             <p className={styles.hint}>Available: {eventTokens === null ? 'Loading' : <b>{eventTokens}</b>}</p>
//             <p className={styles.hint}>Owned: {teamTokens === null ? 'Loading' : <b>{teamTokens}</b>}</p>
//           </Form.Group>
//           <Button
//             className={styles.button}
//             variant="warning"
//             size="sm"
//             onClick={handleBuyTeamToken}
//             disabled={!buyAmount > 0}
//           >
//             Buy
//             {buyAmount > 0
//               ? <span>&nbsp;{buyAmount} {buyAmount > 1 ? 'Tokens' : 'Token'}</span>
//               : null
//             }
//           </Button>
//         </div>
//       </Modal.Body>
//     </Modal>
//   );
// };

export default BuyTeamTokensModal;
