import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Account from './components/pages/Account';
import Settings from './components/pages/Settings';
import Covid19 from './components/pages/Covid19';
import LogOut from './components/pages/LogOut';
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
      uri: "https://peace-parks-app.hasura.app/v1/graphql"
  }),
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/account">
            <Account />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/covid19">
            <Covid19 />
          </Route>
          <Route path="/logout">
            <LogOut />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;