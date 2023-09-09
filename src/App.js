import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
// import Footer from './components/Footer';

function App () {
  const [progress, setprogress] = useState(0)

  const setProgress = (progress) => {
    setprogress(progress)
  }
  // const storedCountry = localStorage.getItem('selectedCountry');
  
  // state = { 
  //   country: storedCountry || 'in', //retrieves the country from the Local storage if no Key is pressent the in the local storage 'in' is used.
  //   modeType: { cardBG: 'white',
  //   cardBorder: 'null',
  //   cardTitle: 'dark', 
  //   backgColor: document.body.style.backgroundColor = 'white'
  // }
  // };      
  // changeCountry(ctr) {
  //   localStorage.setItem('selectedCountry', ctr);   //stores the selected country in the local storage when the country is changed.
  //   setState({
  //     country: ctr
  //   });
  //   console.log("COUNTRY CHANGED", ctr)
  // }

  // changeMode = () => {
  //   const newmodeType = modeType.cardBG === 'white'
  //   ? {
  //     cardBG: 'dark',
  //     cardBorder: 'secondary',
  //     cardTitle: 'light',
  //     backgColor: document.body.style.backgroundColor = 'rgb(33 37 41)'
  //   }
  //   : {
  //     cardBG: 'white',
  //     cardBorder: 'null',
  //     cardTitle: 'dark',
  //     backgColor: document.body.style.backgroundColor = 'white'
  //   };
  //   setState({
  //     modeType: newmodeType,
  //   });

  // };    

  const pagesize = 80;
  const apiKey = process.env.REACT_APP_NEWS_API;
    return (
      <div>  
        <Router>
          {/* <Navbar changeMode={changeMode} changeCountry={changeCountry.bind(this)} /> */}
          <Navbar  />
          <LoadingBar
            height={3}  
            color='#f11946'
            progress={progress}
          // onLoaderFinished={() => setProgress(0)}
          />
          <Routes>
            <Route exact path="/" element={<News  apiKey={apiKey} setProgress={setProgress} key="home" pageSize={pagesize}  category='general' />} />
            {/* <Route exact path="/general" element={<News  apiKey={apiKey} setProgress={setProgress} key="general" pageSize={pagesize}  category='general' />} /> */}
            <Route exact path="/business" element={<News  apiKey={apiKey} setProgress={setProgress} key="business" pageSize={pagesize}  category='business' />} />
            <Route exact path="/entertainment" element={<News  apiKey={apiKey} setProgress={setProgress} key="entertainment" pageSize={pagesize}  category='entertainment' />} />
            <Route exact path="/health" element={<News  apiKey={apiKey} setProgress={setProgress} key="health" pageSize={pagesize}  category='health' />} />
            <Route exact path="/science" element={<News  apiKey={apiKey} setProgress={setProgress} key="science" pageSize={pagesize}  category='science' />} />
            <Route exact path="/sports" element={<News  apiKey={apiKey} setProgress={setProgress} key="sports" pageSize={pagesize}  category='sports' />} />
            <Route exact path="/technology" element={<News  apiKey={apiKey} setProgress={setProgress} key="technology" pageSize={pagesize}  category='technology' />} />
          </Routes>

          {/* <News  apiKey={apiKey} setProgress={setProgress} pageSize={pagesize} country='in' category='sports'/> */}
          {/* <Footer/> */}
        </Router>
      </div>

    )
    }
export default App;