import {  RouterProvider,useNavigate } from "react-router-dom";
import {router} from "./routes/index";




function App() {
 

  return (
    <div className="App">
   <RouterProvider router={router} />   
    </div>
  );
}

export default App;
