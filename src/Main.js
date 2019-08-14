import React, { Fragment, Component } from "react";
import AppBar from './Components/AppBar';
import ListBottom from './Components/ListBottom';
import ListTop from './Components/ListTop';
import lockr from 'lockr';

function compare( a, b ) {
  if ( a.id < b.id ){
    return -1;
  }
  if ( a.id > b.id ){
    return 1;
  }
  return 0;
}

function getItems() {
  const url = 'http://localhost:4000/items/myItems';
  let data = lockr.get('data');
  var request = new Request(url, {
      method: 'POST', 
      body: JSON.stringify(data), 
      headers: new Headers({ "Content-Type": "application/json" }),
  });

  return fetch(request)
  .then(res => res.json())
}

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      active: [],
      inactive: [],
    };
  }

  componentWillMount(){
    if (this.state.loading) {
      getItems().then(items => {
        this.setState({
          loading: false,
          active: items.data.filter(item => !item.active).sort(compare),
          inactive: items.data.filter(item => item.active).sort(compare),
        });
      });
    }
  }

  activateItem = (item) => {
    const {_id} = item;
    delete item.clicked;
    this.setState({
      active: [...this.state.active, this.state.inactive.filter((item) => item._id === _id)[0]].sort(compare),
      inactive: this.state.inactive.filter((item) => item._id !== _id).sort(compare),
    });
  }

  disableItem = (item) => {
    const {_id} = item;
    this.setState({
      active: this.state.active.filter((item) => item._id !== _id).sort(compare),
      inactive: [...this.state.inactive, this.state.active.filter((item) => item._id === _id)[0]].sort(compare),
    });
  }

  beginActivateItem = (item, list) => {
    let newState = this.state[list];
    let clicked = list === "inactive" ? "clicked" : "clickedOut";
    newState[newState.indexOf(item)].removing = true;
    newState[newState.indexOf(item)][clicked] = true;
    this.setState({
      [list]: newState,
    });
  }

  showItem = (item, list) => {
    let newState = this.state[list];
    delete newState[newState.indexOf(item)].removing;
    if (item.clickedOut)
      delete item.clickedOut;
    this.setState({
      [list]: newState,
    });
  }

  render() {
    return (
      <Fragment>
        <AppBar />
        <ListTop 
          items={this.state.active}
          disableItem={this.disableItem}
          beginDisableItem={this.beginActivateItem}
          showItem={this.showItem}
        />
        <ListBottom 
          items={this.state.inactive}
          beginActivateItem={this.beginActivateItem}
          activateItem={this.activateItem}
          showItem={this.showItem}
        />
    </Fragment>
    );
  }
}

export default Main;