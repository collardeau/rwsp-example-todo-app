declare module 'react-with-state-props' {
  type Render = React.StatelessComponent<State>;
  type Comp = React.Component;
  type HandlerItem = (Props: {}) => (...args: any[]) => {};

  interface State {
    [name: string]: any;
  }

  interface Functions {
    [name: string]: Function;
  }

  interface DeriveStateItem {
    onStateChange: string[] | string;
    derive: (state: State) => State;
  }

  interface Props {
    render: Render;
    state: State;
    deriveState?: DeriveStateItem[];
    withHandlers?: Functions;
    omitProps?: string[];
  }

  class Component extends React.Component<Props, any> {}

  let Container: typeof Component;

  export = Container;
}
