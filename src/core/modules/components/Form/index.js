import React from 'react'

export class Form extends React.Component {

  state = {}

  setValue = (type, value) => {
    this.setState({ [type]: value })
  }

  getFormObject() {
    const { children } = this.props
    const formObj = {};
    React.Children.forEach(children, child => {
        const {kind, regexp, required} = child.props;
        const value = this.state[kind] || ''
        formObj[kind] = {kind: kind, value: this.state[kind], regexp: regexp, required: required}
    })
    return formObj;
  }

  validate = (formObj) => {
    let err = null
    // validationObj[kind] = regexp.test(this.state[kind]|| '');

    for(let key in formObj){
        const dataObj = formObj[key];
        if(dataObj.required && dataObj.value && dataObj.value.length){
            err = {
                kind: dataObj.kind,
                type: 'empty'
            }
        }
        if(dataObj.regexp && !dataObj.regexp.test(dataObj.value || '')){
            err = {
                kind: dataObj.kind,
                type: 'wrong'
            }
        }
    }

    return err;
  }

  submit = (e) => {
    e.preventDefault();
    const {children, onSuccess, onError} = this.props;
    let formObj = this.getFormObject()

    const err = this.validate(formObj)

    if (err) {
      onError(err);
    } else {
      onSuccess(formObj);
    }
  }

  render() {
    const {email} = this.state;
    const {children} = this.props;
    return (
      <form onSubmit={this.submit}>
        {
          React.Children.map(children, child => {
            return React.cloneElement(child, {onChange: this.setValue});
          })
        }
      </form>
    )
  }
}

export const Input = props => (
  <input {...props} onChange={(e) => {props.setValue(props.type, e.target.value)}} />
)
