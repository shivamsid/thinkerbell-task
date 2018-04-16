import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import NewTitle from './NewTitle.js';
import ExistingTitles from './ExistingTitles.js';
import { Button } from 'react-bootstrap';

class Landing extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      status : props.status || ''
       };
  }

  renderNewTitle(e){
    e.preventDefault();
    this.setState({status: 'NewTitle' });
  }

  renderExistingTitles(e){
    e.preventDefault();
    this.setState({status: 'ExistingTitles' });
  }

  render() {
    if(this.state.status === ''){
      return (
      <div class="Absolute-Center is-Responsive">
      <div class="row"> 
        <div class="col-lg-6 ">    
          <Button bsStyle="primary"  onClick={this.renderNewTitle.bind(this)}>Make new Title</Button>
        </div>
        <div class="col-lg-6">  
          <Button bsStyle="primary"  onClick={this.renderExistingTitles.bind(this)}>Work on Existing Titles</Button>
        </div>
      </div>
      </div>
      );
    }
    else if(this.state.status === 'NewTitle'){
      return(<NewTitle/>);
    }
    else if(this.state.status === 'ExistingTitles'){
      return(<ExistingTitles/>);
    }
  }
}

export default Landing;