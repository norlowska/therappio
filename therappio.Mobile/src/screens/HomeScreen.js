import React from 'react';
import { Card, Container, Content, Text, View } from 'native-base';
import ActivityCard from '../activities/ActivityCard';
import styles from '../theme/styles';
import * as articles from '../activities/readings/articles';
import { connect } from 'react-redux';
import { userService } from '../_services';

function HomeScreen() {
  console.log('home');
  return (
    <Container>
      <View style={styles.welcomeContainer}>
        <Text H1 style={styles.welcomeText}>
          Hello!
        </Text>
        <View>
          <Text style={styles.paragraph}>You have assignment to do:</Text>
          <Card style={styles.card}>
            <Text style={styles.primaryTitle}>Assignment #4</Text>
            <Text style={styles.paragraph}>Due date: November 25th, 11:00</Text>
          </Card>
        </View>
      </View>
      <Content contentContainerStyle={styles.container}>
        <Text style={styles.title}>Recommended activities</Text>
        <ActivityCard
          content={{
            title: 'Gratitude Journal',
            description: 'Focus on the positive and list 3 things you are grateful for',
          }}
          onPress={() => console.log('coś działa na home')}
        />
        <ActivityCard
          content={articles.allOrNothing}
          onPress={() => console.log('coś działa na home')}
        />
      </Content>
    </Container>
  );
}

HomeScreen.navigationOptions = {
  headerShown: false,
};

const mapStateToProps = (state, props) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(HomeScreen);
