import { useNavigate } from "react-router-dom";
import { Link, BrowserRouter, Routes, Route ,RouterProvider } from "react-router-dom";
import App from "../App";
import UserForm from "../page/UserForm";

export default function Header(){

  // const navigate = useNavigate()
  // const navigateForm =() =>{

  // }

  
  return(
    <div className="header__container">
      <header className="header">

          <div className="logo-title nav-left" >
            <h1>Dinder</h1> 
          </div>

          <div className="page__list">
            <ul className="nav-right">
              <li className="nav-list">
                <Link to ="/src/page/ResultsPage.jsx" >Create Account</Link>
              </li>
              <li className="nav-list">
                <Link to ="">About us</Link>
              </li>
            </ul>
{/* 
            <Routes>  
              <Route path="/" element={<App/>}/>
              <Route path="/src/page/UserForm.jsx" element={<UserForm/>}/>
            </Routes> */}
          </div>
      </header>
      
    </div>
  );
}