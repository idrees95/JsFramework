import "./App.css";
import Header from './components/Header';
import Editor from './components/body';

function App() {
  return (
   <div>
    <div className="header">
      <Header/>
    </div>
    <div>
      <Editor/>
    </div>
   </div>
  );
}

export default App;