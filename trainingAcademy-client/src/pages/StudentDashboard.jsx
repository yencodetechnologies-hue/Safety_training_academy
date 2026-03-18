import { useState } from "react";
import "../styles/Student.css";
import { section } from "framer-motion/client";

function StudentPage() {

const [page,setPage] = useState("dashboard")

const renderPage = () =>{
  if(page==="dashboard"){
    return <h2>Welcome to Dashboard</h2>
  }
  if(page==="courses"){
    return <h2>My Courses</h2>
  }
  if(page==="schedule"){
    return <h2>Schedule Page</h2>
  }
  if(page==="results"){
    return <h2>Results Page</h2>
  }
  if(page==="certificates"){
    return <h2>Certificates Page</h2>
  }
}

  return (

<section>
    
</section>

  );
}

export default StudentPage;