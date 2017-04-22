import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

const options = [
  { key: 0, text: 'English', value: "0" },
  { key: 1, text: 'Русский', value: "1" },
  { key: 2, text: 'Українська', value: "2" },
]

class FormExampleSubComponentControl extends Component {

  state = {selectvalue:"0",inputvalue:""}
  inputHandleChange = (e, { value }) => this.setState({ inputvalue: value })
  selectHandleChange = (e, { value }) => this.setState({ selectvalue: value })

  handleClick = () => {
    if (this.state.inputvalue) {
      this.props.Model.enter(this.state.inputvalue, this.state.selectvalue);
    }
  }

  render() {
    const { selectvalue, inputvalue } = this.state
    return (
      <Form>
        <Form.Group widths='equal'>
          <Form.Input label='Name and surname' name="input" placeholder='John Smith' value={inputvalue} onChange={this.inputHandleChange} />
          <Form.Select label='Interface language' name="select" options={options} placeholder='Interface language' value={selectvalue} onChange={this.selectHandleChange} />
        </Form.Group>
        <Form.Button content='Next' icon='right arrow' labelPosition='right' onClick={this.handleClick} />
      </Form>
    )
  }
}

export default FormExampleSubComponentControl