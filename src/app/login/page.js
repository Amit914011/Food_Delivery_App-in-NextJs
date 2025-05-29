import dbconnection from "../lib/dbConnection";
import Loginpage from "./Loginpage";

dbconnection()
export const metadata={
    title:"Login : Food Delivery App"
}
const login=()=>{
    return(
        <><Loginpage/></>
    )
}
export default login;