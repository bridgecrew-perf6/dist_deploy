import TextEditor from "./TextEditor"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import { v4 as uuidV4 } from 'uuid'
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;
if (process.env.NODE_ENV=="production") 
{
 app.use(express.static('build'));
 app.get('*',(req,res)=>
 {
  req.sendFile(path.resolve(__dirname,'build','index.html'));
 }) 
}
app.listen(port,(err)=>
{
  if (err) {
    return console.log(err);
    console.log ('server running on port: ',port);
    
  }
} )
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Redirect to={`/documents/${uuidV4()}`} />
        </Route>
        <Route path="/documents/:id">
          <TextEditor />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
