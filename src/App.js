import React from 'react';
import FeatureProjects from './FeatureProjects'
import Hero from './Hero'
import Nav from './Nav'
import './App.css'
function App() {
  const appStyle = {
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'center',
    backgroundColor:'#D7DAE5',
    height: '200vh',
    width:'100vw',
    overflowX:'hidden'
  }
  const endpoint='https://api.cosmicjs.com/v1/emma/object/home?pretty=true&hide_metafields=true&read_key=8LlYIAPzCgNuk5ZzICnJpeXdxS7nYs9RbsGUJ6At6lWch5CwUu&props=slug,title,content,metadata,'
  return (
    <div style={appStyle} className="App">
      <Hero endpoint={endpoint}/>
      <Nav color='#706677'/>
      <FeatureProjects endpoint={endpoint}/>
    </div>
  );
}

export default App;
