interface Db {
  items: object;
}

const createItem = (item: {}) => {
  const id = Math.floor(Math.random() * Math.floor(999999)) + '';
  return {
    [id]: {
      ...item,
      done: 0,
      ts: Date.now()
    }
  };
};

let db: Db = {
  items: createItem({ title: 'loaded todo item' })
};

// mock firebase sync
let updateItems: Function;

function syncItems(onItems: Function) {
  updateItems = onItems;
  setTimeout(() => {
    // mock server time
    updateItems(db.items);
  }, 500);
}

function addItem(item: object) {
  db.items = {
    ...db.items,
    ...createItem(item)
  };
  if (updateItems) {
    setTimeout(() => {
      updateItems(db.items);
    });
  }
}

export default {
  syncItems,
  addItem
};
