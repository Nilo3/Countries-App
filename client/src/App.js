
import { Route } from "react-router-dom";
import { Home, Detail,LandingPage, ActivityForm } from "./components/index";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";


function App() {
  const location = useLocation() ;
  
  return (
    <div>
    

    <Route path="/home" render={() => <Home />} />
    
    <Route exact path="/" render={()=> <LandingPage />} />
    
    <Route path="/create" render={()=> <ActivityForm />} />

    <Route path="/detail/:id" render={()=> <Detail />} />

 
    </div>
   

  );
}

export default App;
