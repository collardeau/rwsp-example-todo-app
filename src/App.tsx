import * as React from 'react';
import store from './store';
import Items from './components/Items';
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

const App = (props: AppState) => {
  console.log(props);
  return (
    <div className="App">
      <Items {...props} />
    </div>
  );
};

const omitProps = ['items', 'setItems', 'setNewItem', 'mergeNewItem', 'reset'];

const { state, deriveState, withHandlers } = store;
const AppContainer = () => (
  <Container
    state={state}
    deriveState={deriveState}
    withHandlers={withHandlers}
    omitProps={omitProps}
    render={App}
  />
);

export default AppContainer;
