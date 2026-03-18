
import { useState } from "react"
import Numeracy from "../components/Numeracy"
import Literacy from "../components/Literacy"
import Language from "../components/Language"
import Digital from "../components/Digital"

const topics = ["Numeracy", "Literacy", "Language", "Digital"]

function LLNDAssessment({ onComplete }) {
    const [topicIndex, setTopicIndex] = useState(0)

    const progress = ((topicIndex + 1) / topics.length) * 100

    const nextSection = () => {
        if (topicIndex < topics.length - 1) {
            setTopicIndex(topicIndex + 1)
        } else {
            onComplete()
        }
    }

    return (

        <div className="llnd-card">

            <h3>Step 3 : LLND Assessment</h3>

            <p>
                Section {topicIndex + 1} of 4 : {topics[topicIndex]}
            </p>

            <div className="llnd-progress">
                <div
                    className="llnd-fill"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            {topicIndex === 0 && <Numeracy next={nextSection} />}

            {topicIndex === 1 && <Literacy next={nextSection} />}

            {topicIndex === 2 && <Language next={nextSection} />}

            {topicIndex === 3 && <Digital next={nextSection} />}

        </div>

    )

}

export default LLNDAssessment
// import { useState } from "react"
// import "../styles/LLNDAssessment.css"
// import { useNavigate } from "react-router-dom"

// const topics = ["Numeracy", "Literacy", "Language", "Digital"]

// const questions = {
//     Numeracy: [
//         { q: "A hard hat costs $32. How much will three cost?", options: ["$64", "$96", "$128"] },
//         { q: "If you pay $100 for $96 item change?", options: ["$2", "$4", "$6"] },
//         { q: "5 + 7 = ?", options: ["10", "12", "14"] }
//     ],

//     Literacy: [
//         { q: "Choose correct spelling", options: ["Receive", "Recieve"] },
//         { q: "Opposite of 'big'?", options: ["small", "large"] },
//         { q: "Plural of child?", options: ["childs", "children"] }
//     ],

//     Language: [
//         { q: "Correct sentence?", options: ["He go to school", "He goes to school"] },
//         { q: "Past tense of go?", options: ["goed", "went"] },
//         { q: "Which is noun?", options: ["run", "book"] }
//     ],

//     Digital: [
//         { q: "Which is browser?", options: ["Chrome", "Excel"] },
//         { q: "Shortcut copy?", options: ["Ctrl+C", "Ctrl+V"] },
//         { q: "Email symbol?", options: ["#", "@"] }
//     ]
// }

// function LLNDAssessment({ onComplete }) {

//     const [topicIndex, setTopicIndex] = useState(0)
//     const [questionIndex, setQuestionIndex] = useState(0)
//     const [answers, setAnswers] = useState({})
//     const [showResult, setShowResult] = useState(false)
//     const [agree1, setAgree1] = useState(false)
//     const [agree2, setAgree2] = useState(false)
//     const topic = topics[topicIndex]
//     const question = questions[topic][questionIndex]

//     const progress = ((topicIndex + 1) / topics.length) * 100

//     const handleNext = () => {

//         if (!answers[`${topicIndex}-${questionIndex}`]) return

//         if (questionIndex < 2) {

//             setQuestionIndex(questionIndex + 1)

//         } else {

//             if (topicIndex < topics.length - 1) {

//                 setTopicIndex(topicIndex + 1)
//                 setQuestionIndex(0)

//             } else {

//                 setShowResult(true)

//             }

//         }

//     }
//     const finishAssessment = () => {
//         setShowResult(true)
//     }

//     return (

//         <div className="llnd-card">

//             <h3>Step 3 : LLND Assessment</h3>

//             <p>
//                 Section {topicIndex + 1} of 4 : {topic}
//             </p>

//             {/* Progress */}

//             <div className="llnd-progress">

//                 <div
//                     className="llnd-fill"
//                     style={{ width: `${progress}%` }}
//                 ></div>

//             </div>

//             {/* Topic Stepper */}

//             <div className="llnd-stepper">

//                 {topics.map((t, i) => (
//                     <div
//                         key={i}
//                         className={`llnd-step
// ${i === topicIndex ? "active" : ""}
// ${i < topicIndex ? "done" : ""}
// `}
//                     >

//                         {i + 1}. {t}

//                     </div>
//                 ))}

//             </div>

//             {/* Question */}

//             <div className="question-box">

//                 <h4>NUMERACY</h4>

//                 <p>
//                     A hard hat costs $32. How much will three hard hats cost?
//                 </p>

//                 <div className="question-image">
//                     <img src="/helmet.png" alt="helmet" />
//                 </div>

//                 <p className="sub-question">
//                     2. Choose the correct answer in each drop-down list:
//                 </p>

//                 <div className="dropdown-group">

//                     <label>(a) Total cost</label>

//                     <select>
//                         <option>Select answer</option>
//                         <option>$64</option>
//                         <option>$96</option>
//                         <option>$128</option>
//                     </select>

//                 </div>

//                 <div className="dropdown-group">

//                     <label>(b) If you pay with $100 how much change will you get?</label>

//                     <select>
//                         <option>Select answer</option>
//                         <option>$2</option>
//                         <option>$4</option>
//                         <option>$6</option>
//                     </select>

//                 </div>

//             </div>

//             <div className="llnd-next-btn-div">
//                 <button
//                     className="next-btn-llnd"
//                     onClick={handleNext}

//                 >

//                     {topicIndex === 3 && questionIndex === 2
//                         ? "Finish Assessment"
//                         : "Next"}

//                 </button>
//             </div>
//             {showResult && (

//                 <div className="assessment-modal">

//                     <div className="assessment-modal-content">

//                         <h2>Assessment Complete</h2>

//                         {/* Result Box */}

//                         <div className="result-row">
//                             <p>Section 1: Numeracy</p>
//                             <span className="status-fail">33% - Failed</span>
//                         </div>

//                         <div className="result-row">
//                             <p>Section 2: Literacy (Reading & Writing)</p>
//                             <span className="status-fail">17% - Failed</span>
//                         </div>

//                         <div className="result-row">
//                             <p>Section 3: Language</p>
//                             <span className="status-fail">0% - Failed</span>
//                         </div>

//                         <div className="result-row">
//                             <p>Section 4: Digital Literacy</p>
//                             <span className="status-pass">67% - Passed</span>
//                         </div>

//                         {/* Declaration */}

//                         <div className="declaration">

//                             <h4>Declaration</h4>

//                             <p>Before proceeding, please confirm the following:</p>

//                             <label className="decl-checkbox">
//                                 <input
//                                     className="decl-checkbox-check"
//                                     type="checkbox"
//                                     checked={agree1}
//                                     onChange={(e) => setAgree1(e.target.checked)}
//                                 />
//                                 I completed this quiz honestly and did not cheat in any way.
//                             </label>

//                             <label className="decl-checkbox">
//                                 <input
//                                     className="decl-checkbox-check"
//                                     type="checkbox"
//                                     checked={agree2}
//                                     onChange={(e) => setAgree2(e.target.checked)}
//                                 />
//                                 I understand that my score will be recorded under my name.
//                             </label>

//                         </div>

//                         {/* Name + Date */}

//                         <div className="decl-footer">

//                             <div>
//                                 <b>Name:</b> Beniyel Josva
//                             </div>

//                             <div>
//                                 <b>Date:</b> {new Date().toLocaleDateString()}
//                             </div>

//                         </div>

//                         <div className="llnd-asses-footer">
//                             <button
//                                 className="continue-btn"
//                                 disabled={!agree1 || !agree2}
//                                 onClick={onComplete}
//                             >

//                                 Continue to Enrollment Form

//                             </button>
//                         </div>

//                     </div>

//                 </div>

//             )}

//         </div>

//     )

// }

// export default LLNDAssessment