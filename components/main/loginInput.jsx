import React, { Component } from 'react'
import { Form, Button, Icon, Message } from 'semantic-ui-react'

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
      this.props.model.enter(this.state.inputvalue, this.state.selectvalue);
    }
  }

  handleBack = () => this.props.model.skip = false

  render() {
    const { selectvalue, inputvalue } = this.state
    return <div>
      {this.props.model.thumb
        ? <div className="avatars">
          <Message info>
            <img style={{
              width: '250px'
            }} src={this.props.model.thumb} alt=""/>
            <img style={{
              width: '100px',
              borderRadius: '50%'
            }} src={this.props.model.thumb} alt=""/>
            <img style={{
              width: '35px',
              borderRadius: '50%'
            }} src={this.props.model.thumb} alt=""/>
          </Message>
        </div>
        : ''}
        <Form>
          <Form.Group widths='equal'>
            <Form.Input label='Name and surname' name="input" placeholder='John Smith' value={inputvalue} onChange={this.inputHandleChange} />
            <Form.Select label='Interface language' name="select" options={options} placeholder='Interface language' value={selectvalue} onChange={this.selectHandleChange} />
          </Form.Group>
        </Form>
        <Button className="BottomLeftPosition" content='Finish' primary icon='right arrow' labelPosition='right' onClick={this.handleClick} />
        <Button className="BottomRightPosition" floated='right' animated='vertical' onClick={this.handleBack}>
          <Button.Content hidden>Back</Button.Content>
          <Button.Content visible>
            <Icon name='left arrow' />
          </Button.Content>
      </Button>
    </div>
  }
}

export default FormExampleSubComponentControl
