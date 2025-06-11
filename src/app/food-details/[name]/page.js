import FoodDetails from "./FoodDetails"
import Header from '../../_comonents/_customerComponents/Header'
import Footer from '../../_comonents/_customerComponents/Footer'

const page=({params})=>{
    const foodName = params.name;
//   console.log(foodName)
    return(
        <>
        <Header/>
        <FoodDetails  params={{ name: foodName }}/>
        <Footer/>
        </>
    )
}

export default page