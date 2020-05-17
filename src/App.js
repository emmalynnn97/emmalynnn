import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import HalfScroll from './HalfScroll'

import './App.css'
function App() {
  const appStyle = {
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'center',
    overflowX:'hidden'
  }
  const endpoint='https://api.cosmicjs.com/v1/emma/object/half-scroll?pretty=true&hide_metafields=true&read_key=8LlYIAPzCgNuk5ZzICnJpeXdxS7nYs9RbsGUJ6At6lWch5CwUu&props=slug,title,content,metadata,'
  const allColors={
    section:['blue','green','lightblue','pink'],
    link:['white','white','white','white'],
    left:'white',
    right:'#706677'
  }
  
  const sectionHeight = 750;
  const HalfScrollPage = () =>(
    <HalfScroll allColors={allColors} sectionHeight={sectionHeight} endpoint={endpoint}/>
  ) 
  return (
    <Router>
    <div style={appStyle} className="App">
    <Route exact path="/" component={HalfScrollPage} />
    </div>
    </Router>
  );
}

export default App;
