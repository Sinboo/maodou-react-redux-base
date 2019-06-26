import React from 'react';
import CoursesContainer from './containers/CoursesContainer'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://maodou.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Maodou
        </a>
      </header>
      <div>
        <h2>Maodou Courses Example</h2>
        <hr/>
        <CoursesContainer />
        <hr/>
      </div>
    </div>
  );
}

export default App;
