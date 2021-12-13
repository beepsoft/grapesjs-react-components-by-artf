import React from 'react';

class Listing extends React.Component {
  constructor(props) {
    super();
    this.state = {
      counter: 0
    };
  }

  updateCounter() {
    const { counter } = this.state;
    this.setState({
      counter: counter + 1
    });
  }

  componentDidMount() {
    setInterval(this.updateCounter.bind(this), 1000);
  }

  render() {
    const { props, state } = this;
    const { mlsid, children } = props;
    const { counter } = state;

    return (
      <div>
        <div>Mlsid: {mlsid}</div>
        <div>{children}</div>
        <div>Counter: {counter}</div>
      </div>
    );
  }
}

export default Listing;
