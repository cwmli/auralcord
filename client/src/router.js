import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

class router extends Component {
  render() {
    return (
      <Switch>
        {this.props.routes.map((route) => routeBuilder(route))}
        <Route render={() => {return (<div>NOT FOUND</div>)}} />
      </Switch>)
  }
}

function routeBuilder(routeObj) {
  return (
    <Route 
      key={routeObj.path}
      path={routeObj.path} 
      exact={routeObj.isExact}  
      render={props => (
        <routeObj.layout yield={<routeObj.component {...props} routes={routeObj.routes} />} />
      )}
    />)
}

export default router;
