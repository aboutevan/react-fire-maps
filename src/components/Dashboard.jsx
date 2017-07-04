import React, { Component } from 'react';
import MapContainer from './MapContainer';
import AddProperty from './AddProperty';
import PropertiesList from './PropertiesList';
import { firebaseAuth } from '../config/firebase';
import { getUser } from '../helpers/firebase';
import './Dashboard.css';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      isAdmin: null,
      propertyAdded: 0,
    }
    this.handlePropertyAdded = this.handlePropertyAdded.bind(this);
  }
  checkAdmin() {
    const user = firebaseAuth().currentUser
    getUser(user.uid)
          .then((snapshot) => {
            this.setState({isAdmin: snapshot.val().admin});
          })
  }
  componentDidMount() {
    this.checkAdmin();
  }
  handlePropertyAdded() {
    this.setState({propertyAdded: this.state.propertyAdded + 1})
  }
  render() {
    return (
      <div>
        <h1>Check Out Our Properties Below</h1>
        {
          this.state.isAdmin && <AddProperty notify={this.handlePropertyAdded}/>
        }
        <div className="Dashboard__grid">
          <div className="Dashboard__left Dashboard__col">
            <PropertiesList />
          </div>
          <div className="Dashboard__right Dashboard__col">
            <MapContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;