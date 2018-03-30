import * as React from 'react';

interface Props {
  [name: string]: any;
}

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
  const { title, done, id, toggle } = props;
  return (
    <div>
      <input
        checked={done}
        type="checkbox"
        onChange={() => {
          toggle(id);
        }}
      />
      <span style={{ textDecoration: done && 'line-through' }}>{title}</span>
    </div>
  );
};

class Items extends React.Component<any, any> {
  componentDidMount() {
    this.props.syncItems();
  }
  render() {
    const { itemList, itemsTs: loaded, toggleDone } = this.props;
    if (!loaded) return <div>Loading...</div>;
    return (
      <div>
        <Form {...this.props} />
        {itemList.map((item: Props) => (
          <Item key={item.id} {...item} toggle={toggleDone} />
        ))}
      </div>
    );
  }
}

export default Items;
