import {BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import Home from './route/Home/home';
import About from './route/About/about';
import Header from './components/Header';
import Footer from './components/Footer';
import AddNote from './route/Home/AddNote';
import UpdateNote from './route/Home/note';

function App() {

  return (
    <>
     <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/add-note' element = {<AddNote />} />
        <Route path='/note/:id' element = {<UpdateNote />} />
        <Route path='/about' element = {<About />}/>
      </Routes>
      <Footer />
     </Router>
    </>
  )
}

export default App
