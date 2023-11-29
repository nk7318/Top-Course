import React, { useEffect, useState } from "react";
import Navbar from "./component/Navbar";
import Cards from "./component/Cards";
import Filter from "./component/Filter";
import {apiUrl, filterData} from "./data";
import { toast } from "react-toastify";
import Spinner from "./component/Spinner";

const App = () => {
  const[courses, setCourses] = useState(null);
  const[loading, setloading] = useState(true);
  const[category, setCategory] = useState(filterData[0].title);

  async function fetchData(){
    setloading(true);
    try{
      let response = await fetch(apiUrl);
      let output= await response.json();
      ///output
      setCourses(output.data);

    }
    catch(error){
      toast.error('Network main koi dikkat hai');
    }
    setloading(false);
  }
  useEffect(() => {
    fetchData();

  },[]
  )
  return(
   <div className="min-h-screen flex flex-col bg-bgDark2 ">
      <div>
         <Navbar/>
      </div>
      
          <div className="bg-bgDark2">
          <div>
          <Filter filterData ={filterData}
          category = {category}
          setCategory = {setCategory}
          />
   
       </div>
       <div className="w-11/12 max-w-[1200px] mx-auto flex flex-wrap 
       justify-center items-center min-h-[50vh]">
       {
         loading ? (<Spinner/>) :(<Cards courses={courses} category ={category}/>)
 
       }
 
      
   
       </div>
    
      </div>
      <footer class="bg-bgDark2 text-center text-col text-white">
      <p>Copyright &copy; 2023 Nitesh Kumar</p>
    </footer>
     
  
  </div>
  
  );
};

export default App;
