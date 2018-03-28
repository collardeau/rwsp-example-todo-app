import * as React from 'react';
import './App.css';
const Container = require('react-with-state-props').Container;

interface Props {
  [name: string]: any;
}

interface Item {
  title: string;
}

interface AppState {
  items: object;
  newItem: Item;
}

const state: State = {
  items: {}
};

const App = (props: State) => {
  // console.log(props);
  return <div className="App">Hello World</div>;
};

const AppContainer = () => <Container state={state} render={App} />;

export default AppContainer;
