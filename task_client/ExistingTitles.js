import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import Landing from './Landing.js';

const SortableItem = SortableElement(({value}) =>
  <a href="#" class="list-group-item list-group-item-success">{value}</a>
);

const SortableList = SortableContainer(({names}) => {
  return (
    <div>
    <ul class="list-group mb-3">
      {names.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
    </div>
  );
});

function arrayMove(arr, previousIndex, newIndex) {
  const array = arr.slice(0);
  if (newIndex >= array.length) {
    let k = newIndex - array.length;
    while (k-- + 1) {
      array.push(undefined);
    }
  }
  array.splice(newIndex, 0, array.splice(previousIndex, 1)[0]);
  return array;
}

class ExistingTitles extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
	    status: 'GetTitles',
	    titles : ['',],
	    curTitle : '',
	    names: ['',],
	  };
  }

  onSortEnd({oldIndex, newIndex}){
    this.setState({
      names: arrayMove(this.state.names, oldIndex, newIndex),
    });
    console.log(this.state.names);
  };

  updateNames(){
    console.log(JSON.stringify(this.state.names) );
    fetch("http://localhost:8081/api/titles/" + this.state.curTitle,
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify(this.state.names)
    })
    .then(res=>{
      if(res.status >= 400){
        throw new Error("Bad response from server");
      }
      return res.json();})
    .then(json => alert(json.message))
    .catch(function(res){ console.log(res) })
    
  }

  getTitles(){

    fetch('http://localhost:8081/api/titles')
      .then(data => data.json())
      .then((data) => { 
        console.log(data);
        this.setState({ 
        status: 'Titles',
        titles: data
         }) });
  }

  createTitles(){
    console.log('in createTitles');
    return this.state.titles.map((title, i) => 
         <div key={i} class = 'row justify-content-center mb-2'>
          <input type='button' class = 'col-sm-6 btn btn-success' value={title} onClick={this.getNames.bind(this, i)}/>
         </div>                  
     )
  }

  getNames(i){
    fetch('http://localhost:8081/api/titles/' + this.state.titles[i])
      .then(data => data.json())
      .then((data) => { 
        console.log(data);
        this.setState({ 
        status: 'Names',
        curTitle : this.state.titles[i],
        names: data
         }) });
  }

  createDndNames(){
    return (
      <div>
      <SortableList names={this.state.names} onSortEnd={this.onSortEnd.bind(this)} />
      <div class = 'row justify-content-center'>
      	<input type='button' class = 'col-sm-4 btn btn-primary' value='Update order of names' onClick={this.updateNames.bind(this)}/>
      </div>
      </div>
    )
  }

  renderLanding(e){
    e.preventDefault();
    this.setState({status: 'Landing' });
  }

  renderUI(){
    if(this.state.status==='GetTitles'){
      return(
      	<div class = 'Absolute-Center is-Responsive container'>
      	<div class = 'row' >
      	<div class="col-lg-6 "> 
	      	<input type='button' class = 'btn btn-success' value='Get Titles' onClick={this.getTitles.bind(this)}/>
      	</div>
      	
      	<div class="col-lg-6 "> 
	      	<input type='button' class = 'btn btn-info' value='Home' onClick={this.renderLanding.bind(this)}/>
      	</div>
      	</div>
      	</div>
      	)
    }
    else if(this.state.status==='Titles'){
      return(
      	<div class="vertical-center" >
        <div class = 'container '>
	        {this.createTitles()}
	        <div class = "row justify-content-center">
		        <input type='button' class = 'col-sm-4 btn btn-primary' value='Reload Titles' onClick={this.getTitles.bind(this)}/>
	        </div>

		        <input class='btn btn-info' type='button' value='Home' onClick={this.renderLanding.bind(this)}/>
        </div>
        </div>
      )
    }
    else if(this.state.status==='Names'){
      return(
      	<div class="vertical-center" >
        <div class = 'container'>
	        {this.createDndNames()}
	        <input type='button' class='btn btn-info' value='Back' onClick={this.getTitles.bind(this)}/>
        </div>
        </div>
      );
    }
    else if(this.state.status==='Landing'){
    	return(<Landing/>);
    }
  }

  render() {
    return(
        <div>
          {this.renderUI()}
        </div>  
      )
  }
}

export default ExistingTitles;
