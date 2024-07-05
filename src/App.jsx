import { Switch } from 'react-router-dom';

import 'rsuite/dist/styles/rsuite-default.css';
import './styles/main.scss';
import Signin from './pages/Signin';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import PublicRoute from './components/PublicRoute';

function App() {
  return (
  <Switch> 
    <PublicRoute path="/signin">
      <Signin />
    </PublicRoute>
    <PrivateRoute path ='/'>
      <Home />
    </PrivateRoute>

  </Switch>
  );
}

export default App;
