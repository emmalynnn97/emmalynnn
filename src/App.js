import React from 'react';
import FeatureProjects from './FeatureProjects'
import Nav from './Nav'
import Footer from './Footer'
import Home from './Home'
import Contact from './Contact'
import './App.css'
import { BrowserRouter as Router, Route} from 'react-router-dom';
function App() {
  const appStyle = {
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'center',
    backgroundColor:'#D7DAE5',
    height: '200vh',
    overflowX:'hidden'
  }
    const HomePage = () =>(
      <Home endpoint={endpoint}/>
    )
  const ContactPage = () =>(
    <>
    <Contact endpoint='https://api.cosmicjs.com/v1/emma/object/contact?pretty=true&hide_metafields=true&read_key=8LlYIAPzCgNuk5ZzICnJpeXdxS7nYs9RbsGUJ6At6lWch5CwUu&props=slug,title,content,metadata,'/>
    </>
  )
  const Portfolio = () =>(
    <FeatureProjects endpoint={endpoint}/>
  )
  const endpoint='https://api.cosmicjs.com/v1/emma/object/home?pretty=true&hide_metafields=true&read_key=8LlYIAPzCgNuk5ZzICnJpeXdxS7nYs9RbsGUJ6At6lWch5CwUu&props=slug,title,content,metadata,'
  return (
    <Router>
    <div style={appStyle} className="App">
    <Nav color='#706677'/>
    <Route exact path="/" component={HomePage} />
    <Route path="/contact" component={ContactPage} />
    <Route path="/portfolio" component={Portfolio} />
    <Footer color='#706677'/>
    </div>
    </Router>
  );
}

export default App;
