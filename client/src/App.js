import './App.css';
import CurrentWeather from './components/current-weather/current-weather';
import Forecast from './components/forecast/forecast';

function App() {
  return (
    <div className="App">
      <CurrentWeather/>
      <Forecast/>
    </div>
  );
}

export default App;
