import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Intro from './Components/Intro/Intro';
import Evaluation from './Components/Evaluation/Evaluation';
import About from './Components/About/About';
import Contact from './Components/Contact/Contact';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar/>
      {/* <Router>
        <Routes>
            <Route path='/' element={<Intro/>}/>

            <Route exact path='/#tools' element={<Evaluation/>}/>
            
            <Route path='/#about' element={<About/>}/>

            <Route path='/#contact' element={<Contact/>}/>

            <Route path='/gestionmodeles' element={<ListeModele/>}/>
        </Routes>
      </Router> */}
      <Intro></Intro>
      <Evaluation/>
      <About></About>
      <Contact></Contact>
    </>
  );
}

export default App;
