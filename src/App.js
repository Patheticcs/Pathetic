import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Custom404 from '../404/404'; // Import 404.js component

const App = () => {
  return (
    <Router>
      <Switch>
        {/* Define routes */}
        <Route exact path="/">
          <h1>Home Page</h1>
        </Route>

        {/* Catch-all route for undefined paths */}
        <Route component={Custom404} />
      </Switch>
    </Router>
  );
};

export default App;
