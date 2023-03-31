import React, { useState, memo } from "react";
import { Col, Row, Table, Container } from "react-bootstrap";
import styles from "./index.module.sass";

import { TitleWithIcon, Button, WidgetBox } from "components/common";
import { TeamTableRow, TeamModal } from "..";

import { connect, useDispatch } from "react-redux";

const TeamsTable = ({ selectedEvent, teams, user, imBusy }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const [team, setTeam] = useState(null);

  if (imBusy.events) {
    return (
      <Container>
        <Row>
          <Col md="12" className={styles.eventTitle}>
            <TitleWithIcon>Loading teams ...</TitleWithIcon>
          </Col>
        </Row>
      </Container>
    );
  }

  const Teams = teams.map((team, i) => {
    const props = {
      key: team.symbol,
      selectedEvent,
      team,
      onClick: () => {
        setTeam(team);
        setModalOpen(true);
      },
    };

    return <TeamTableRow {...props} />;
  });

  return (
    <Col sm="12">
      <TeamModal
        user={user}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        team={team}
        selectedEvent={selectedEvent}
      />
      <WidgetBox>
        <Table
          id="teams-table-id"
          className={styles.table}
          striped
          responsive="md"
        >
          <thead>
            <tr>
              <th>Team</th>
              <th>Convertion ratio</th>
              <th>Market price</th>
              <th>Current price</th>
              <th />
            </tr>
          </thead>
          <tbody>{Teams}</tbody>
        </Table>
      </WidgetBox>
    </Col>
  );
};

//  {buyModalOpen && (
//   <BuyEventTokensModal
//     {...{
//       eventName: contractsTree.events[event].name,
//       event,
//       address,
//       modalOpen: buyModalOpen,
//       setModalOpen: setBuyModalOpen,
//     }}
//   />
// )}

// {modalOpen && (
//   <EventModal
//     {...{
//       event,
//       address,
//       modalOpen,
//       setModalOpen,
//     }}
//   />
// )}

const mapStateToProps = ({ events, user }) => ({
  imBusy: events.imBusy,
  selectedEvent: events.selectedEvent,
  teams: events.teams,
  user,
});

export default connect(mapStateToProps)(TeamsTable);
