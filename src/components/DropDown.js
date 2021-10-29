import React from 'react'

export class DropDown extends React.PureComponent {
  constructor(props) {
    super(props);
    let names = []
    const default_msg = {
        id: -1,
        name: props.default_msg,
    }
    names.push(default_msg)
    props.category.map(item => names.push(item))
    this.state = {
      value: names[0].id,
      categories: names,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const int_value = parseInt(event.target.value)
    this.setState({value: int_value});
    const chosen_category_array = this.state.categories.filter(item => item.id === int_value)
    this.props.handleSubmit(chosen_category_array[0])
  }

  render() {
    return (
      <form>
        <label className='option-attr'>
          {this.props.title}:
          <select className='dropdown-slidedown' value={this.state.value} onChange={this.handleChange} disabled={this.props.disable}>
            {this.state.categories.map((category, index)=>
            <option key={index} value={category.id}>{category.name}</option>)}
          </select>
        </label>
      </form>
    );
  }
}

export default DropDown