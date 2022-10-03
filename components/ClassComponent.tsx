import React from 'react'

interface IState {
  state1: boolean
  state2: boolean
}
const a: Maybe<string> = null

export default class ClassComponent extends React.PureComponent<any, IState> {
  constructor(props) {
    super(props)
    this.state = {
      state1: true,
      state2: true
    }
    this.handleClick = this.handleClick.bind(this)
  }
  private handleClick() {
    console.log(this.state)
    this.setState({
      state1: !this.state.state1
    })
  }
  //   componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<IState>, snapshot?: any): void {
  // 	console.log(prevState,this.state);
  //   }
  componentWillUpdate(
    nextProps: Readonly<any>,
    nextState: Readonly<IState>,
    nextContext: any
  ): void {
    console.log('will update')
  }
  shouldComponentUpdate(
    nextProps: Readonly<any>,
    nextState: Readonly<IState>,
    nextContext: any
  ): boolean {
    console.log(nextState, this.state)
    return false
  }

  render() {
    console.log('render class 2')
    return (
      <>
        Hello world
        {this.state.state1 ? 'State 1 true' : 'State 1 false'}
        {this.state.state2 ? 'State 2 true' : 'State 2 false'}
        <button onClick={this.handleClick}>Nhan class</button>
      </>
    )
  }
}
