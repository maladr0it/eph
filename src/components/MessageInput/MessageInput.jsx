import React from 'react';

class MessageInput extends React.Component {
  state = {
    value: '',
  };
  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.value);
    this.setState({
      value: '',
    });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <input type="submit" />
      </form>
    );
  }
}
export default MessageInput;
