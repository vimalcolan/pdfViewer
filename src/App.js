
import './App.css';
import PdfView from './Components/PdfView';
import pdfContent from './assets/contractBreach.pdf';


function App() {
  console.log(pdfContent);
  return (
    <div className="App">
   <PdfView pdf={pdfContent}/>
    </div>
  );
}

export default App;
