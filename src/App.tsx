import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Account from './components/pages/Account';
import Settings from './components/pages/Settings';
import Covid19 from './components/pages/Covid19';
import LogOut from './components/pages/LogOut';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/account' component={Account} />
        <Route path='/settings' component={Settings} />
        <Route path='/covid-19' component={Covid19} />
        <Route path='/log-out' component={LogOut} />
      </Switch>
    </Router>
  );
}

export default App;

