import { useEffect, useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
const Header = () => {

  //state variable are always declared inside a component function never outside 
  const [isLogin, setIsLogin] = useState(false);
    const isOnline = useOnlineStatus();
  //if no dependency array is passed, useEffect will be called on every render
  //if empty dependency array is passed, useEffect will be called only once initial render

  useEffect(() => {
    console.log("Use Effect Call");
  }, [isLogin]);

  
  
  const onBtnClick = () => {
    setIsLogin(!isLogin);
   // isLogin = !isLogin;
  }

  return (
    <div className="flex justify-between items-center p-5 bg-green-300">
      <div className="logo-container mx-5">
        <img className="w-32" src={LOGO_URL} />
      </div>
      <div className="flex ">
        <ul className="flex items-center p-5 mr-12">
        <li className="mx-5">Status : {isOnline ? "✅" : "🔴"}</li>  
          <li className="mx-5"><Link to="/" >Home</Link></li>
          <li className="mx-5"><Link to="/about" >About Us</Link></li>
          <li className="mx-5"><Link to="/contact" >Contact us</Link></li>
          <li className="mx-5">Cart</li>
          { !isLogin ? (
            <li className="mx-5">
              <button className="login-btn" onClick={onBtnClick}>login</button>
            </li>
          ) : (
            <li className="mx-5">
              <button className="logout-btn" onClick={onBtnClick}>logout</button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
export default Header;
