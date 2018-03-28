import * as React from 'react';
import './App.css';
const Container = require('react-with-state-props').Container;

// TYPES

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

const newItem = {
  title: ''
};

// STATE

const state: Props = {
  items: {},
  newItem
};

const withHandlers = {
  mergeNewItem: ({ setNewItem, newItem }: Props) => (changes: Props) => {
    setNewItem({ ...newItem, ...changes });
  },
  changeTitle: ({ mergeNewItem }: Props) => (e: any) => {
    mergeNewItem({ title: e.target.value });
  },
  reset: ({ setNewItem }: Props) => () => {
    setNewItem(newItem);
  },
  submit: ({ newItem, reset }: Props) => (e: any) => {
    e.preventDefault();
    // todo: validate newItem and add to state
    reset();
  }
};

// COMPONENTS

const Form = (props: Props) => {
  const { changeTitle, newItem, submit } = props;
  const { title } = newItem;
  return (
    <form onSubmit={submit}>
      <input type="text" value={title} onChange={changeTitle} />
      <button>Submit</button>
    </form>
  );
};

const App = (props: AppState) => {
  return (
    <div className="App">
      <Form {...props} />
    </div>
  );
};

const omitProps = ['setItems', 'setNewItem', 'mergeNewItem', 'reset'];
const AppContainer = () => (
  <Container
    state={state}
    render={App}
    withHandlers={withHandlers}
    omitProps={omitProps}
  />
);

export default AppContainer;
