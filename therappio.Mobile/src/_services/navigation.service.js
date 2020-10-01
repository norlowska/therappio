import { NavigationActions } from 'react-navigation';

export const navigationService = {
  setTopLevelNavigator,
  navigate,
};

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}
