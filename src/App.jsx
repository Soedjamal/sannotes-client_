import "./App.css";
import Navbar from "./components/header/Navbar";
import TodoList from "./pages/TodoList";

function App() {
  return (
    <>
      <Navbar title={"none"} />
      <div className="App">
        <TodoList />
      </div>
    </>
  );
}

export default App;
