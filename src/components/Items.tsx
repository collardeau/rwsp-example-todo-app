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

export default Items;
