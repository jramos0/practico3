
import './App.css';
import Groupforms from './components/Groupforms';
import Trabajadores from './components/Trabajadores';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


function App() {
  return (
     <div className="container p-2">
    
         <Trabajadores/>
       
       
          <ToastContainer />
     </div>

  );
}

export default App;
