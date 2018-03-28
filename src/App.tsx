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

function createItem(item: {}) {
  return {
    [rando()]: {
      ...item,
      done: 0
    }
  };
}

// STATE

const state: Props = {
  items: {},
  newItem
};

const deriveState = [
  {
    onStateChange: 'newItem',
    derive: ({ newItem }: Props) => ({
      isValid: Boolean(newItem.title.trim())
    })
  }
];

const withHandlers = {
  mergeItems: ({ setItems, items }: Props) => (newItems: Props) => {
    setItems({ ...items, ...newItems });
  },
  mergeNewItem: ({ setNewItem, newItem }: Props) => (changes: Props) => {
    setNewItem({ ...newItem, ...changes });
  },
  changeTitle: ({ mergeNewItem }: Props) => (e: any) => {
    mergeNewItem({ title: e.target.value });
  },
  reset: ({ setNewItem }: Props) => () => {
    setNewItem(newItem);
  },
  submit: ({ newItem, mergeItems, reset, isValid }: Props) => (e: any) => {
    e.preventDefault();
    if (isValid) {
      mergeItems(createItem(newItem));
      reset();
    }
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

const omitProps = [
  'setItems',
  'mergeItems',
  'setNewItem',
  'mergeNewItem',
  'reset'
];

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

// Helpers

function rando() {
  return Math.floor(Math.random() * Math.floor(99999)) + '';
}
