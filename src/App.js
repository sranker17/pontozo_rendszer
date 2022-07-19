import { ScoringComponent } from "./scoring/ScoringComponent";
import json_data from "./stories/example-data/the-example.json";
import 'bootstrap/dist/css/bootstrap.min.css';
import { DataProvider } from "./scoring/DataContext";
import { ErrorProvider } from "./scoring/ErrorContext";

function App() {
  return (
    <DataProvider>
      <ErrorProvider>
        <ScoringComponent
          criteria={json_data}
          onSubmit={results => console.log(results)}
          onCancel={draft => console.log(draft)}
        ></ScoringComponent>
      </ErrorProvider>
    </DataProvider>
  );
}

export default App;
