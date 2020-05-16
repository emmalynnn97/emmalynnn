import React from 'react';
import FeatureProjects from './FeatureProjects'
//import Nav from './Nav'
import Footer from './Footer'
import Home from './Home'
import Contact from './Contact'
import HalfScroll from './HalfScroll'
import './App.css'
import { BrowserRouter as Router, Route} from 'react-router-dom';
function App() {
  const appStyle = {
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'center',
    backgroundColor:'#D7DAE5',
    height: '2500px',
    overflowX:'hidden',
  }
  const endpoint='https://api.cosmicjs.com/v1/emma/object/half-scroll?pretty=true&hide_metafields=true&read_key=8LlYIAPzCgNuk5ZzICnJpeXdxS7nYs9RbsGUJ6At6lWch5CwUu&props=slug,title,content,metadata,'
  const HalfScrollPage = () =>(
    <HalfScroll leftColor='white' rightColor='#706677' endpoint={endpoint}/>
  ) 
  
  return (
    <Router>
    <div style={appStyle} className="App">
    <Route exact path="/" component={HalfScrollPage} />
    <Footer color='#706677'/>
    </div>
    </Router>
  );
}

export default App;
