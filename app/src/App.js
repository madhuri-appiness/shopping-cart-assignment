import './App.scss';
import Home from './components/home/home.component'
import { Route, Routes } from 'react-router-dom';
import TrainingForm from './components/employee/training-form';


function App() {
  return (
        <Routes>
          <Route>
            <Route path="/" index element={<Home />} />
            <Route path="/training" index element={<TrainingForm />} />
          </Route>
        </Routes>
  );
}

export default App;
