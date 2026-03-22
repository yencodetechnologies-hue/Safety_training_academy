import { useState } from "react"
import "../../styles/Digital.css"
import deskTop from "../../assets/dekstop-computer.png"
import imageForDnD from "../../assets/imagefordraganddrop.png"
import pdf from "../../assets/pngimage.png"
import iphone from "../../assets/phone.png"

import photoCopier from "../../assets/photocopier.jpg"
import laptop from "../../assets/laptop.jpg"
import barCode from "../../assets/barcode-scanner.jpg"

const digitalQuestions = [
    { type: "drag-files" },
    { type: "drag-labels" },
    { type: "input-url" }
]

function Digital({ next }) {

    const [index, setIndex] = useState(0)

    const [files, setFiles] = useState([
        { id: 1, type: "pdf" },
        { id: 2, type: "pdf" },
        { id: 3, type: "image" }
    ])

    const [fileDrop, setFileDrop] = useState({
        checklist: [],
        images: []
    })

    const [labels, setLabels] = useState([
        "Desktop Computer",
        "2 in 1 / Laptop / Macbook",
        "iPhone / iPad",
        "Barcode Scanner",
        "Photocopier"
    ])

    const [labelDrop, setLabelDrop] = useState({})
    const [url, setUrl] = useState("")

    const question = digitalQuestions[index]

    const dragStart = (e, item) => {
        e.dataTransfer.setData("item", JSON.stringify(item))
    }

    const allowDrop = (e) => e.preventDefault()

    const handleFileDrop = (e, zone) => {
        e.preventDefault()
        const item = JSON.parse(e.dataTransfer.getData("item"))

        if (zone === "checklist" && item.type !== "pdf") return
        if (zone === "images" && item.type !== "image") return

        setFileDrop(prev => ({
            ...prev,
            [zone]: [...prev[zone], item]
        }))

        setFiles(files.filter(f => f.id !== item.id))
    }

    const handleLabelDrop = (e, device) => {
        e.preventDefault()
        const item = JSON.parse(e.dataTransfer.getData("item"))

        setLabelDrop(prev => ({
            ...prev,
            [device]: item
        }))

        setLabels(labels.filter(l => l !== item))
    }

    const labelDone = Object.keys(labelDrop).length === 5

    const handleNext = () => {

        // ✅ ONLY COMPLETENESS CHECK (NO CORRECT CHECK HERE)

        if (question.type === "drag-files") {
            const fileDone =
                fileDrop.checklist.length === 2 &&
                fileDrop.images.length === 1

            if (!fileDone) return
        }

        if (question.type === "drag-labels" && !labelDone) return

        if (question.type === "input-url" && !url) return

        // ✅ NAVIGATION
        if (index < digitalQuestions.length - 1) {
            setIndex(index + 1)
        } else {

         

            let score = 0

            // ✅ FILE → 3 marks
            fileDrop.checklist.forEach(f => {
                if (f.type === "pdf") score++
            })

            fileDrop.images.forEach(f => {
                if (f.type === "image") score++
            })

            // ✅ LABEL → 5 marks
            const correctLabels = {
                desktop: "Desktop Computer",
                laptop: "2 in 1 / Laptop / Macbook",
                phone: "iPhone / iPad",
                scanner: "Barcode Scanner",
                printer: "Photocopier"
            }

            Object.keys(correctLabels).forEach(key => {
                if (labelDrop[key] === correctLabels[key]) {
                    score++
                }
            })

            // ✅ URL → 1 mark
            if (url.trim() === "https://safetytrainingacademy.edu.au") {
                score++
            }

       


            // ✅ FORMAT ANSWERS
            const formattedAnswers = {}

            // FILE → 0-x
            fileDrop.checklist.forEach((f, i) => {
                formattedAnswers[`0-${i}`] = f.type
            })

            fileDrop.images.forEach((f, i) => {
                formattedAnswers[`0-${i + 2}`] = f.type
            })

            // LABEL → 1-x
            const order = ["desktop", "laptop", "phone", "scanner", "printer"]

            order.forEach((key, i) => {
                formattedAnswers[`1-${i}`] = labelDrop[key]
            })

            // URL → 2
            formattedAnswers["2"] = url


            next(formattedAnswers)
        }
    }

    const handlePrev = () => {
        if (index > 0) setIndex(index - 1)
    }

    const handleReset = () => {

        if (question.type === "drag-files") {
            setFiles([
                { id: 1, type: "pdf" },
                { id: 2, type: "pdf" },
                { id: 3, type: "image" }
            ])
            setFileDrop({ checklist: [], images: [] })
        }

        if (question.type === "drag-labels") {
            setLabels([
                "Desktop Computer",
                "2 in 1 / Laptop / Macbook",
                "iPhone / iPad",
                "Barcode Scanner",
                "Photocopier"
            ])
            setLabelDrop({})
        }

        if (question.type === "input-url") {
            setUrl("")
        }
    }

    return (
        <div className="digital-container">

            <h4 className="digital-title">DIGITAL LITERACY</h4>

            {question.type === "drag-files" && (
                <>
                    <p className="digital-instruction">
                        Drag PDFs to Checklist Book and image to Images
                    </p>

                    <div className="digital-main">

                        <div className="digital-left">
                            {files.map(f => (
                                <div
                                    key={f.id}
                                    draggable
                                    onDragStart={(e) => dragStart(e, f)}
                                    className="draggable"
                                >
                                    <img
                                        src={f.type === "pdf" ? pdf : imageForDnD}
                                        alt=""
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="digital-image-wrapper">

                            <img src={deskTop} className="digital-bg-img" />

                            <div
                                className="drop-zone overlay-drop checklist"
                                onDrop={(e) => handleFileDrop(e, "checklist")}
                                onDragOver={allowDrop}
                            >
                                Checklist Book ({fileDrop.checklist.length}/2)
                            </div>

                            <div
                                className="drop-zone overlay-drop images"
                                onDrop={(e) => handleFileDrop(e, "images")}
                                onDragOver={allowDrop}
                            >
                                Images
                            </div>

                        </div>

                    </div>

                    <button className="reset-btn" onClick={handleReset}>
                        Reset
                    </button>
                </>
            )}

            {question.type === "drag-labels" && (
                <>
                    <p className="digital-instruction">
                        Drag each label to correct device
                    </p>

                    <div className="digital-main">

                        <div className="digital-left">
                            {labels.map((l, i) => (
                                <div
                                    key={i}
                                    draggable
                                    onDragStart={(e) => dragStart(e, l)}
                                    className="draggable green"
                                >
                                    {l}
                                </div>
                            ))}
                        </div>

                        <div className="digital-right grid">

                            <div className="device">
                                <img src={deskTop} />
                                <div
                                    className="drop-zone"
                                    onDrop={(e) => handleLabelDrop(e, "desktop")}
                                    onDragOver={allowDrop}
                                >
                                    {labelDrop.desktop || "Drop here"}
                                </div>
                            </div>

                            <div className="device">
                                <img src={iphone} />
                                <div
                                    className="drop-zone"
                                    onDrop={(e) => handleLabelDrop(e, "phone")}
                                    onDragOver={allowDrop}
                                >
                                    {labelDrop.phone || "Drop here"}
                                </div>
                            </div>

                            <div className="device">
                                <img src={photoCopier} />
                                <div
                                    className="drop-zone"
                                    onDrop={(e) => handleLabelDrop(e, "printer")}
                                    onDragOver={allowDrop}
                                >
                                    {labelDrop.printer || "Drop here"}
                                </div>
                            </div>

                            <div className="device">
                                <img src={laptop} />
                                <div
                                    className="drop-zone"
                                    onDrop={(e) => handleLabelDrop(e, "laptop")}
                                    onDragOver={allowDrop}
                                >
                                    {labelDrop.laptop || "Drop here"}
                                </div>
                            </div>

                            <div className="device">
                                <img src={barCode} />
                                <div
                                    className="drop-zone"
                                    onDrop={(e) => handleLabelDrop(e, "scanner")}
                                    onDragOver={allowDrop}
                                >
                                    {labelDrop.scanner || "Drop here"}
                                </div>
                            </div>

                        </div>

                    </div>

                    <button className="reset-btn" onClick={handleReset}>
                        Reset
                    </button>

                    {labelDone && <p className="success">✔ Marked Complete</p>}
                </>
            )}

            {question.type === "input-url" && (
                <>
                    <p className="digital-instruction">
                        Your trainer asks you to find information about Safety training academy.
                    </p>

                    <img src={imageForDnD} className="digital-logo" />

                    <p className="url-label">Fill in the URL</p>

                    <input
                        className="url-input"
                        placeholder="https://"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </>
            )}

            <div className="digital-footer">
                <button onClick={handlePrev}>Previous</button>

                <span>Question {index + 1} of 3</span>

                <button onClick={handleNext}>
                    {index === 2 ? "Submit Section" : "Next"}
                </button>
            </div>

        </div>
    )
}

export default Digital