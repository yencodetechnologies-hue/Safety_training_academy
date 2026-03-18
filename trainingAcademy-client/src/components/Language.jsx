import { useState } from "react"
import "../styles/Language.css"

const questions = [
{q:"Correct sentence?",options:["He go to school","He goes to school"]},
{q:"Past tense of go?",options:["goed","went"]},
{q:"Which is noun?",options:["run","book"]}
]

function Language({next}){

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

<div className="language-container">

<h4 className="language-title">LANGUAGE</h4>

<p>{question.q}</p>

<select
className="language-select"
value={answer}
onChange={(e)=>setAnswer(e.target.value)}
>

<option value="">Select answer</option>

{question.options.map((opt,i)=>(
<option key={i}>{opt}</option>
))}

</select>

<button
className="language-next-btn"
onClick={handleNext}
>

{index === 2 ? "Next Section" : "Next"}

</button>

</div>

)

}

export default Language