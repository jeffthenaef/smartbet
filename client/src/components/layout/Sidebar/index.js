import React, { memo } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './index.module.sass';

// import TitleWithIcon from 'components/TitleWithIcon';
// import ExternalLink from '../Account/node_modules/components/ExternalLink';
// import WidgetBox, { WidgetContent } from 'components/WidgetBox';
// import { WarningButton, SuccessButton } from '../Account/node_modules/components/Button';

// import { Formula1Items, ClubItems } from './rankingItems';

// import HowTo from 'assets/img/sidebar/howto.jpg';
// import BitBayBanner from 'assets/img/sidebar/bitbay.png';
// import GetBonusBanner from 'assets/img/sidebar/get-bonus.png';

// const Items = ({ items }) => items.map((item, i) => (
//   <li key={i} className={styles.listItem}>
//     <WidgetContent>
//       <div className={styles.listItemContent}>
//         <span>{i}</span>
//         <img src={item.img} alt={item.name} />
//         <div className={styles.listItemName}>
//           <span>{item.name}</span>
//           <span>{item.score}</span>
//         </div>
//       </div>
//     </WidgetContent>
//   </li>
// ));

// const Sidebar = memo(() => (
//   <Col md="3">
//     <Row>
//       <Col md="12">
//         <TitleWithIcon>
//           <span>Your&nbsp;</span>BET
//         </TitleWithIcon>
//         <WidgetBox>
//           <WidgetContent>
//             <p className={styles.widgetText}>No BET so far</p>
//             <WarningButton size="sm">Make your first bet!</WarningButton>
//           </WidgetContent>
//         </WidgetBox>
//         <TitleWithIcon><span>How&nbsp;</span>TO PLAY?</TitleWithIcon>
//         <img className={styles.image} src={HowTo} alt="How to play" />
//         <ExternalLink href="https://bitbay.net/pl">
//           <img className={styles.image} src={BitBayBanner} alt="BitBay Banner" />
//         </ExternalLink>
//         <TitleWithIcon><span>F1&nbsp;</span>Ranking</TitleWithIcon>
//         <WidgetBox>
//           <ul className={styles.list}>
//             <Items items={Formula1Items} />
//           </ul>
//         </WidgetBox>
//         <img className={styles.image} src={GetBonusBanner} alt="Get bonus Banner" />
//         <TitleWithIcon><span>Club&nbsp;</span>Ranking</TitleWithIcon>
//         <WidgetBox>
//           <ul className={styles.list}>
//             <Items items={ClubItems} />
//           </ul>
//         </WidgetBox>
//       </Col>
//     </Row>
//   </Col>
// ));

export default () => null;
