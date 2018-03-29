import db from './mockDb';

interface State {
  [name: string]: any;
}

const newItem = {
  title: ''
};

const state: State = {
  items: {},
  newItem
};

const deriveState = [
  {
    onStateChange: 'newItem',
    derive: ({ newItem }: State) => ({
      isValid: Boolean(newItem.title.trim())
    })
  },
  {
    onStateChange: 'items',
    derive: ({ items }: State) => {
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
  syncItems: ({ setItems }: State) => () => {
    db.syncItems(setItems);
  },
  mergeNewItem: ({ setNewItem, newItem }: State) => (changes: State) => {
    setNewItem({ ...newItem, ...changes });
  },
  changeTitle: ({ mergeNewItem }: State) => (e: any) => {
    mergeNewItem({ title: e.target.value });
  },
  submit: ({ newItem, reset, isValid, setNewItem }: State) => (e: any) => {
    e.preventDefault();
    if (isValid) {
      db.addItem(newItem);
      setNewItem(newItem);
    }
  }
};

const omitProps = ['items', 'setItems', 'setNewItem', 'mergeNewItem'];

export default {
  state,
  deriveState,
  withHandlers,
  omitProps
};
