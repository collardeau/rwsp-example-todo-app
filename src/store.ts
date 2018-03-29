import db from './mockDb';

interface Props {
  [name: string]: any;
}

interface Item {
  title: string;
}

interface State {
  items: { [id: string]: Item };
  itemsTs: number;
  newItem: Item;
}

const newItemDefault: Item = {
  title: ''
};

const state: State = {
  items: {},
  itemsTs: 0,
  newItem: newItemDefault
};

const deriveState = [
  {
    onStateChange: 'newItem',
    derive: ({ newItem }: Props) => ({
      isValid: Boolean(newItem.title.trim())
    })
  },
  {
    onStateChange: 'itemsTs',
    derive: ({ items, itemsTs }: Props) => {
      const itemList = Object.keys(items).map(key => ({
        ...items[key],
        id: key
      }));
      return {
        itemList: itemList.sort((a, b) => b.ts - a.ts),
        itemsLoaded: Boolean(itemsTs)
      };
    }
  }
];

const withHandlers = {
  syncItems: ({ setItems, setItemsTs }: Props) => () => {
    db.syncItems((items: object) => {
      setItems(items);
      setItemsTs(Date.now());
    });
  },
  mergeNewItem: ({ setNewItem, newItem }: Props) => (changes: Props) => {
    setNewItem({ ...newItem, ...changes });
  },
  changeTitle: ({ mergeNewItem }: Props) => (e: any) => {
    mergeNewItem({ title: e.target.value });
  },
  submit: ({ newItem, reset, isValid, setNewItem }: Props) => (e: any) => {
    e.preventDefault();
    if (isValid) {
      db.addItem(newItem);
      setNewItem(newItemDefault);
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
