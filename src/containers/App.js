import React, { PropTypes } from 'react';
import { Router } from 'react-router';

class App extends React.Component {
  /*static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.element.isRequired
  };*/

  get content() {
    return (
      <Router
        routes={this.props.routes}
        history={this.props.history} />
    )
  }

  render () {
     return (
       <div>
         {this.content}
       </div>
     )
   }
}


App.propTypes = {
  history: PropTypes.object.isRequired,
  routes: PropTypes.element.isRequired
}

export default App
