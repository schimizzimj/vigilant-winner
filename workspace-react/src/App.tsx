import "./App.css";
import * as Components from "./components";

function App() {
  return (
    <div className="App">
      {Object.entries(Components).map(([name, Component]) => (
        <section key={name}>
          <h1>{name}</h1>
          <hr />
          <div className="component-wrapper">
            <Component />
          </div>
        </section>
      ))}
    </div>
  );
}

export default App;
