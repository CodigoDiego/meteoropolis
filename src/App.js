import './App.css';
import News from './components/News';
import Weather from './components/Weather';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {}
      </header>
      <div className='content-container'>
        <Weather />
        <News />
      </div>
    </div>
  );
}

export default App;
