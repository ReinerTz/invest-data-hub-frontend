import MantineTable from "./components/MantineTable";
import StockList from "./components/StockList";
// Importe outros componentes conforme necessário

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <h1>Dashboard de Ações</h1>
      </header> */}
      <main>
        <StockList />
        {/* <MantineTable /> */}
      </main>
    </div>
  );
}

export default App;
