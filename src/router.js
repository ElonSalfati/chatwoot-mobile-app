import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import LoginScreen from './screens/LoginScreen/LoginScreen';

import ConversationList from './screens/ConversationList/ConversationList';

import SettingsScreen from './screens/Settings/SettingsScreen';

import ChatScreen from './screens/ChatScreen/ChatScreen';

import TabBar from './components/TabBar';
import ConversationFilter from './screens/ConversationFilter/ConversationFilter';
import ResetPassword from './screens/ForgotPassword/ForgotPassword';

import NoNetworkBar from './components/NoNetworkBar';

const Tab = createBottomTabNavigator(
  {
    Home: ConversationList,
    Settings: SettingsScreen,
  },
  {
    tabBarComponent: TabBar,
  },
);

const createNavigationStack = ({ initialRouteName }) =>
  createStackNavigator(
    {
      Login: { screen: LoginScreen },
      ResetPassword: { screen: ResetPassword },
      ConversationList: { screen: ConversationList },
      ConversationFilter: { screen: ConversationFilter },
      Settings: SettingsScreen,
      Tab: { screen: Tab },
      ChatScreen: { screen: ChatScreen },
    },
    {
      initialRouteName,
      headerMode: 'none',
    },
  );

class RootApp extends React.Component {
  static propTypes = {
    isLogged: PropTypes.bool,
  };

  static defaultProps = {
    isLogged: false,
  };

  render() {
    const { isLogged } = this.props;

    const AuthStack = createNavigationStack({
      initialRouteName: 'Login',
    });
    const LoggedInStack = createNavigationStack({
      initialRouteName: 'Tab',
    });
    const stack = isLogged ? LoggedInStack : AuthStack;

    const App = createAppContainer(stack);

    return (
      <React.Fragment>
        <NoNetworkBar />
        <App />
      </React.Fragment>
    );
  }
}

function bindAction() {
  return {};
}

function mapStateToProps(state) {
  return {
    isLogged: state.auth.isLogged,
  };
}

export default connect(mapStateToProps, bindAction)(RootApp);
