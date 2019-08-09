import React, { Fragment, Component } from "react";
import AppBar from './Components/AppBar';
import ListBottom from './Components/ListBottom';
import ListTop from './Components/ListTop';

function compare( a, b ) {
  if ( a.id < b.id ){
    return -1;
  }
  if ( a.id > b.id ){
    return 1;
  }
  return 0;
}

const items = [
  {
    id: 0,
    item: "RICE/UGALI/CHAPATI BEEF",
    price: 200
  },
  {
    id: 1,
    item: "RICE/CHAPATI MINJI",
    price: 150
  },
  {
    id: 2,
    item: "RICE/UGALI/CHAPATI CHICKEN",
    price: 250
  },
  {
    id: 3,
    item: "CHIPS BEEF STEW",
    price: 200
  },
  {
    id: 4,
    item: "CHIPS MASALA",
    price: 150
  },
  {
    id: 5,
    item: "UGALI FISH",
    price: 500
  },
];

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      active: [],
      inactive: items.sort(compare),
    };
  }

  activateItem = async (item) => {
    const {id} = item;
    delete item.clicked;
    await this.setState({
      active: [...this.state.active, this.state.inactive.filter((item) => item.id === id)[0]].sort(compare),
      inactive: this.state.inactive.filter((item) => item.id !== id).sort(compare),
    });
  }

  disableItem = (item) => {
    const {id} = item;
    //delete item.clickedOut;
    this.setState({
      active: this.state.active.filter((item) => item.id !== id).sort(compare),
      inactive: [...this.state.inactive, this.state.active.filter((item) => item.id === id)[0]].sort(compare),
    });
  }

  beginActivateItem = async (item, list) => {
    let newState = this.state[list];
    let clicked = list === "inactive" ? "clicked" : "clickedOut";
    newState[newState.indexOf(item)].removing = true;
    newState[newState.indexOf(item)][clicked] = true;
    await this.setState({
      [list]: newState,
    });
  }

  showItem = async (item, list) => {
    let newState = this.state[list];
    delete newState[newState.indexOf(item)].removing;
    if (item.clickedOut)
      delete item.clickedOut;
    await this.setState({
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

export default App;