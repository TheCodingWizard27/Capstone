import { Button } from "react-bootstrap";

import "./theme.scss"

import Navbar from "./components/navBar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Button>Click me</Button>
    </div>
  );
}

export default App;
