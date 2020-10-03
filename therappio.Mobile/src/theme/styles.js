import { StyleSheet, Platform, NativeModules } from 'react-native';
import Colors from './Colors';

const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

const styles = StyleSheet.create({
  /*
   * Common
   */
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  card: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginVertical: 10,
  },
  link: {
    color: Colors.primaryColor,
    fontFamily: 'Raleway-Medium',
    fontSize: 16,
  },
  /*
   * Typography
   */
  primaryTitle: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 20,
    marginVertical: 5,
    color: Colors.tintColor,
  },
  title: {
    fontFamily: 'Raleway-Regular',
    fontSize: 20,
    marginVertical: 5,
    color: Colors.baseText,
  },
  subtitle: {
    color: '#fff',
    fontFamily: 'Raleway-Regular',
  },
  paragraph: {
    color: Colors.baseText,
    fontSize: 15,
    fontFamily: 'Raleway-Light',
  },

  /*
   * Dimension
   */
  screenPadding: {
    paddingTop: STATUSBAR_HEIGHT,
  },

  /*
   * Sign In Screen
   */
  signInContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 40,
  },
  signInLinks: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  /*
   * Home Screen
   */
  welcomeContainer: {
    marginTop: 0,
    paddingTop: 90,
    paddingBottom: 25,
    paddingHorizontal: 20,
    backgroundColor: Colors.primaryColor,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 38,
  },
  /*
  Activities Screen
   */
  cardList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  tabHeading: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontSize: 15,
  },
  /* Modals */
  modal: {
    paddingBottom: 25,
  },
  modalContent: {
    paddingLeft: 10,
    paddingRight: 25,
  },
  modalHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  modalTitle: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 23,
    color: Colors.primaryColor,
    marginTop: 10,
  },
  /* Journaling */
  quadrantsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quadrant: {
    width: '50%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  quadrantName: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'Raleway-Medium',
  },
  /*Profile Screen*/
  profileContainer: {
    // height: "30%",
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: Colors.primaryColor,
    paddingVertical: 20,
  },
  profileEntriesContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },

  piechart: {
    width: '35%',
  },
  chartLegendElement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  chartLegend: {
    justifyContent: 'center',
  },
});

export default styles;
