import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from './Components/AppBar';
import ListBottom from './Components/ListBottom';
import ListTop from './Components/ListTop';
import lockr from 'lockr';
import logOut from "./logout";

function compare( a, b ) {
  if ( a._id < b._id ){
    return -1;
  }
  if ( a._id > b._id ){
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
      headers: new Headers({ 
        "Content-Type": "application/json",
        "x-access-token": data.token 
    }),
  });

  return fetch(request)
  .then(res => res.json())
  .catch(err => { throw err })
}

const styles = {
  container : {
    margin: "8px",
  }
}

export default withStyles(styles)(class Main extends Component {
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
        this.refresh();
      }

      if (!lockr.get('data')) {
        logOut(this.props.history, "/")
      }
    }

    refresh = () => {
      return getItems()
      .then(result => {
        if (result.status === 401)
            logOut(this.props.history);
        return Promise.resolve(result);
      })
      .then(items => {
        this.setState({
          loading: false,
          active: items.data.filter(item => item.active).sort(compare),
          inactive: items.data.filter(item => !item.active).sort(compare),
        });
      })
      .catch(err => { throw err })
    }

    handleSubmit = () => {
      const url = 'http://localhost:4000/items/update';
      
      const token = lockr.get('data').token;
      var data = { active: [], inactive: [] };
      
      this.state.active.map((item, index) => {
        data.active[index] = String(item._id);
      });
      this.state.inactive.map((item, index) => {
        data.inactive[index] = String(item._id);
      })
      const request = new Request(url, {
          method: 'PUT', 
          body: JSON.stringify(data), 
          headers: new Headers({ 
            "Content-Type": "application/json",
            "x-access-token": token,
        }),
      });

      return fetch(request)
      .then(res => res.json())
      .then(this.refresh)
      .catch(err => { throw err })
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
        <div className={this.props.classes.container}>
          <AppBar history={this.props.history}/>
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
            handleSubmit={this.handleSubmit}
            refresh={this.refresh}
            history={this.props.history}
          />
      </div>
      );
    }
  }
);