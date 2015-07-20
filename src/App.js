import React, {Component, PropTypes} from 'react';
import Gauge from './Gauge';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {value:33.2};
    setInterval(()=>(this.setState({value:Math.random()*100})), 500);
  }
  
  render() {
    return <Gauge value={this.state.value} units={'m/s'} label={'Velocity'} />;
  }
}
