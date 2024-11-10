
import Footer from "../pages/Footer";
import CustomNavbar from "./CustomNavbar";


const Base = ({title="hello" , children}) =>{
    return(
        <div className="container-fluid p-0 m-0">
          <CustomNavbar />
            
       {children}
            
            <Footer/>
        </div>

    )
}
export default Base;