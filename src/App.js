import './App.css';
import { IncrementRows } from './features/table/IncrementRows';
import { IncrementMonths } from './features/table/IncrementMonths';
import { Table } from './features/table/Table';
import "@fontsource/roboto";

function App() {
  return (
    <div className="App">
      <IncrementRows />
      <IncrementMonths />
      <Table/>
    </div>
  );
}

export default App;
