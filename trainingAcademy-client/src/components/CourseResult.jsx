import { useLocation } from "react-router-dom"

function CourseResult(){

const location = useLocation()
const score = location.state?.score || 0

return(

<div style={{padding:"40px"}}>

<h2>Course Assessment Result</h2>

<p>Your Score: {score}</p>

{score >= 70 ? (
<h3 style={{color:"green"}}>PASS</h3>
) : (
<h3 style={{color:"red"}}>FAIL</h3>
)}

</div>

)

}

export default CourseResult