import * as React from 'react';
import db from './mockDb';
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

const deriveState = [
  {
    onStateChange: 'newItem',
    derive: ({ newItem }: Props) => ({
      isValid: Boolean(newItem.title.trim())
    })
  },
  {
    onStateChange: 'items',
    derive: ({ items }: Props) => {
      const itemList = Object.keys(items).map(key => ({
        ...items[key],
        id: key
      }));
      return {
        itemList: itemList.sort((a, b) => b.ts - a.ts)
      };
    }
  }
];

const withHandlers = {
  syncItems: ({ setItems }: Props) => () => {
    db.syncItems(setItems);
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
  submit: ({ newItem, reset, isValid }: Props) => (e: any) => {
    e.preventDefault();
    if (isValid) {
      db.addItem(newItem);
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

const Item = (props: Props) => {
  const { title } = props;
  return <div>{title}</div>;
};

class Items extends React.Component<any, any> {
  componentDidMount() {
    this.props.syncItems();
  }
  render() {
    const { itemList } = this.props;
    return (
      <div>
        <Form {...this.props} />
        {itemList.map((item: Props) => <Item key={item.id} {...item} />)}
      </div>
    );
  }
}

const App = (props: AppState) => {
  // console.log(props);
  return (
    <div className="App">
      <Items {...props} />
    </div>
  );
};

const omitProps = ['items', 'setItems', 'setNewItem', 'mergeNewItem', 'reset'];

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
