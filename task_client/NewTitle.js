import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Landing from './Landing.js';
import { Button, FormGroup, ControlLabel, FormControl, Form, Col} from 'react-bootstrap';

class NewTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	title : "", 
    	names: [''],
    	goBack: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  createTitle(){
  	return (
  		<Form onSubmit={this.handleSubmit}>
  			<FormGroup controlId="formTitleName" className = "row">
  			<Col componentClass={ControlLabel} sm={2}>
  			Title : 
  			</Col>
  			<Col sm={7}>
          	<FormControl
	            type="text"
	            value={this.state.title||''}
	            placeholder="Enter text"
	            onChange={this.handleTitleChange.bind(this)}/>
	        </Col>    
	        <Col sm={3}>
	        <FormControl
	        		className="btn btn-danger" 
		            type="button"
		            value='Delete this Title?'
		            onClick={this.deleteTitle.bind(this)}
		    />
	        </Col>  
	        </FormGroup>
  			
       		
  			
	          {this.createUI()} 
	        
	          <div class = 'row justify-content-end' >
	          <input type='button' value='Add More Names' class = "col-sm-3 btn btn-success" onClick={this.addClick.bind(this)}/>
	          </div>
	          <div class = "row justify-content-center">
	          <input type="submit" class = 'col-sm-4 btn btn-primary' value="Submit" />
	          </div>
         </Form>
  	)
  }

  deleteTitle(){
    fetch('http://localhost:8081/api/titles/' + this.state.title,{
      method:'delete'
    })
      .then(data => data.json())
      .then((data) => { 
        alert(data.message);
         });
  }

  createUI(){
     return this.state.names.map((text, i) => 
     	<FormGroup controlId="formNewNames" className = "row" key={i}>
         
         <Col sm={2}>
    	    <ControlLabel key={i}>Name:</ControlLabel>
    	    </Col>
    	    <Col sm={7}>
	     	<FormControl
		            type="text"
		            value={text||''}
		            placeholder="Enter text"
		            onChange={this.handleChange.bind(this, i)}
		    />
		    </Col>
		    <Col sm={3}>
		    <FormControl
		            type="button"
		            value='remove'
		            onClick={this.removeClick.bind(this, i)}
		    />
		    </Col>
         </FormGroup>           
     )
  }

  handleChange(i, event) {
     let names = [...this.state.names];
     names[i] = event.target.value;
     this.setState({names});
  }

  handleTitleChange(event) {

     this.setState({title: event.target.value});
  }
  
  addClick(){
    if(this.state.names.length===10){
      alert("reached max number for names per title");
      return;
    }
    this.setState(prevState => ({ names: [...prevState.names, '']}))
  }
  
  removeClick(i){
  	if(this.state.names.length===1){
  		alert("atleast one name is required");
  		return;
  	}
     let names = [...this.state.names];
     names.splice(i,1);
     this.setState({ names });
  }

  handleSubmit(event) {
    console.log(JSON.stringify(this.state));
    fetch("http://localhost:8081/api/titles",
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(this.state)
    })
    .then(res=>{
      if(res.status >= 400){
        throw new Error("Bad response from server");
      }
      return res.json();})
    .then(json => alert(json.message))
    .catch(function(res){ console.log(res) })
    event.preventDefault();
  }

  renderLanding(e){
    e.preventDefault();
    this.setState({goBack: true });
  }

  render() {
  	if(this.state.goBack){
  		return(<Landing/>); 
  	}
  	else{
	  	return (
	  	<div class="vertical-center" >
	      <div class = "container ">
	      
	      	{this.createTitle()}
	      	
	      
	      <input type='button' class='btn btn-info' value='Home' onClick={this.renderLanding.bind(this)}/>
	      </div>
	     </div>
	    );
  	}
    
  }
}

export default NewTitle;