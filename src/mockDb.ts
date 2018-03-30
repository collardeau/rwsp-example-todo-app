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
let refreshItems: Function;

function syncItems(cb: Function) {
  refreshItems = (delay: number = 0) => {
    setTimeout(() => {
      cb(db.items, Date.now());
    }, delay);
  };
  refreshItems(500);
}

function addItem(item: object) {
  db.items = {
    ...db.items,
    ...createItem(item)
  };
  refreshItems();
}

function updateItem(id: string, changes: object) {
  db.items = {
    ...db.items,
    [id]: {
      ...db.items[id],
      ...changes
    }
  };
  refreshItems(db.items);
}

export default {
  syncItems,
  addItem,
  updateItem
};
