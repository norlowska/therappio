import React from "react";
import {
  Container,
  Tabs,
  Tab,
  TabHeading,
  Text
  // ScrollableTab
} from "native-base";
import {
  AssessmentsTab,
  JournalingTab,
  // TherapyTab,
  ResourcesTab
} from "./index";
import styles from "../theme/styles";

export default function ActivitiesListsScreen() {
  return (
    <Container>
      <Tabs
        style={[styles.screenPadding, { backgroundColor: "#438edb" }]}
        // renderTabBar={() => <ScrollableTab />}
      >
        {/* <Tab
          heading={
            <TabHeading style={styles.tabHeading}>
              <Text>Therapy</Text>
            </TabHeading>
          }
        >
          <TherapyTab />
        </Tab> */}
        <Tab
          heading={
            <TabHeading style={styles.tabHeading}>
              <Text>Journaling</Text>
            </TabHeading>
          }
        >
          <JournalingTab />
        </Tab>
        <Tab
          heading={
            <TabHeading style={styles.tabHeading}>
              <Text>Resources</Text>
            </TabHeading>
          }
        >
          <ResourcesTab />
        </Tab>
        <Tab
          heading={
            <TabHeading style={styles.tabHeading}>
              <Text>Assessments</Text>
            </TabHeading>
          }
        >
          <AssessmentsTab />
        </Tab>
      </Tabs>
    </Container>
  );
}

ActivitiesListsScreen.navigationOptions = {
  header: null
};
