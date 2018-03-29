interface Db {
  items: object;
}

const createItem = (item: {}) => {
  const id = Math.floor(Math.random() * Math.floor(999999)) + '';
  return {
    [id]: {
      ...item,
      done: false,
      ts: Date.now()
    }
  };
};

let db: Db = {
  items: createItem({ title: 'loaded todo item' })
};

// mock firebase sync
let updateDbItems: Function = () => {};

function syncItems(onItems: Function) {
  updateDbItems = (items: object) => onItems(items, Date.now());
  setTimeout(() => {
    updateDbItems(db.items);
  }, 500);
}

function addItem(item: object) {
  db.items = {
    ...db.items,
    ...createItem(item)
  };
  updateDbItems(db.items);
}

function updateItem(id: string, changes: object) {
  db.items = {
    ...db.items,
    [id]: {
      ...db.items[id],
      ...changes
    }
  };
  updateDbItems(db.items);
}

export default {
  syncItems,
  addItem,
  updateItem
};
