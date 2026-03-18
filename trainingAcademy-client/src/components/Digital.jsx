import { useState } from "react"
import "../styles/Digital.css"

const questions = [
{q:"Which is browser?",options:["Chrome","Excel"]},
{q:"Shortcut copy?",options:["Ctrl+C","Ctrl+V"]},
{q:"Email symbol?",options:["#","@"]}
]

function Digital({next}){

const [index,setIndex] = useState(0)
const [answer,setAnswer] = useState("")

const question = questions[index]

const handleNext = ()=>{

if(!answer) return

if(index < questions.length-1){
setIndex(index+1)
setAnswer("")
}else{
next()
}

}

return(

<div className="digital-container">

<h4 className="digital-title">DIGITAL LITERACY</h4>

<p>{question.q}</p>

<select
className="digital-select"
value={answer}
onChange={(e)=>setAnswer(e.target.value)}
>

<option value="">Select answer</option>

{question.options.map((opt,i)=>(
<option key={i}>{opt}</option>
))}

</select>

<button
className="digital-next-btn"
onClick={handleNext}
>

{index === 2 ? "Finish Assessment" : "Next"}

</button>

</div>

)

}

export default Digital