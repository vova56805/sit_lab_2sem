import './CSS/App.css';
    import films from './data.js';
    import Table from './components/Table.js';

    function App() {
      return (
        <div className="App">
          <h3>Лучшие фильмы всех времён</h3>
          <Table data={films} amountRows={10} isPaginated={true} />
        </div>
      );
    }

    export default App;
    