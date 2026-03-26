import { useState, useRef } from "react"
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

    // Touch drag state
    const draggingItemRef = useRef(null)
    const touchCloneRef = useRef(null)

    const question = digitalQuestions[index]

    // ─── MOUSE DRAG ───────────────────────────────────────────
    const dragStart = (e, item) => {
        e.dataTransfer.setData("item", JSON.stringify(item))
    }

    const allowDrop = (e) => e.preventDefault()

    const handleFileDrop = (e, zone) => {
        e.preventDefault()
        const item = JSON.parse(e.dataTransfer.getData("item"))
        if (zone === "checklist" && item.type !== "pdf") return
        if (zone === "images" && item.type !== "image") return
        setFileDrop(prev => ({ ...prev, [zone]: [...prev[zone], item] }))
        setFiles(files.filter(f => f.id !== item.id))
    }

    const handleLabelDrop = (e, device) => {
        e.preventDefault()
        const item = JSON.parse(e.dataTransfer.getData("item"))
        handleLabelDropDirect(item, device)
    }

    // shared helper used by both mouse and touch
    const handleLabelDropDirect = (item, device) => {
        if (!item || !device) return
        setLabelDrop(prev => ({ ...prev, [device]: item }))
        setLabels(prev => prev.filter(l => l !== item))
    }

    // ─── TOUCH DRAG ───────────────────────────────────────────
    const handleTouchStart = (e, item) => {
        draggingItemRef.current = item

        // create floating clone
        const touch = e.touches[0]
        const clone = e.currentTarget.cloneNode(true)
        clone.style.position = "fixed"
        clone.style.left = touch.clientX - 60 + "px"
        clone.style.top = touch.clientY - 25 + "px"
        clone.style.opacity = "0.85"
        clone.style.pointerEvents = "none"
        clone.style.zIndex = "9999"
        clone.style.width = e.currentTarget.offsetWidth + "px"
        clone.style.margin = "0"
        document.body.appendChild(clone)
        touchCloneRef.current = clone
    }

    const handleTouchMove = (e) => {
        e.preventDefault()
        const touch = e.touches[0]
        if (touchCloneRef.current) {
            touchCloneRef.current.style.left = touch.clientX - 60 + "px"
            touchCloneRef.current.style.top = touch.clientY - 25 + "px"
        }
    }

    const handleTouchEndLabel = (e) => {
        if (touchCloneRef.current) {
            document.body.removeChild(touchCloneRef.current)
            touchCloneRef.current = null
        }
        const touch = e.changedTouches[0]
        const el = document.elementFromPoint(touch.clientX, touch.clientY)
        const zone = el?.closest("[data-device]")
        if (zone && draggingItemRef.current) {
            handleLabelDropDirect(draggingItemRef.current, zone.getAttribute("data-device"))
        }
        draggingItemRef.current = null
    }

    const handleTouchEndFile = (e) => {
        if (touchCloneRef.current) {
            document.body.removeChild(touchCloneRef.current)
            touchCloneRef.current = null
        }
        const touch = e.changedTouches[0]
        const el = document.elementFromPoint(touch.clientX, touch.clientY)
        const zone = el?.closest("[data-zone]")
        const item = draggingItemRef.current
        if (zone && item) {
            const zoneName = zone.getAttribute("data-zone")
            if (zoneName === "checklist" && item.type !== "pdf") { draggingItemRef.current = null; return }
            if (zoneName === "images" && item.type !== "image") { draggingItemRef.current = null; return }
            setFileDrop(prev => ({ ...prev, [zoneName]: [...prev[zoneName], item] }))
            setFiles(prev => prev.filter(f => f.id !== item.id))
        }
        draggingItemRef.current = null
    }

    // ─── LOGIC ────────────────────────────────────────────────
    const labelDone = Object.keys(labelDrop).length === 5

    const handleNext = () => {
        if (question.type === "drag-files") {
            const fileDone = fileDrop.checklist.length === 2 && fileDrop.images.length === 1
            if (!fileDone) return
        }
        if (question.type === "drag-labels" && !labelDone) return
        if (question.type === "input-url" && !url) return

        if (index < digitalQuestions.length - 1) {
            setIndex(index + 1)
        } else {
            let score = 0

            fileDrop.checklist.forEach(f => { if (f.type === "pdf") score++ })
            fileDrop.images.forEach(f => { if (f.type === "image") score++ })

            const correctLabels = {
                desktop: "Desktop Computer",
                laptop: "2 in 1 / Laptop / Macbook",
                phone: "iPhone / iPad",
                scanner: "Barcode Scanner",
                printer: "Photocopier"
            }
            Object.keys(correctLabels).forEach(key => {
                if (labelDrop[key] === correctLabels[key]) score++
            })

            if (url.trim() === "https://safetytrainingacademy.edu.au") score++

            const formattedAnswers = {}
            fileDrop.checklist.forEach((f, i) => { formattedAnswers[`0-${i}`] = f.type })
            fileDrop.images.forEach((f, i) => { formattedAnswers[`0-${i + 2}`] = f.type })
            const order = ["desktop", "laptop", "phone", "scanner", "printer"]
            order.forEach((key, i) => { formattedAnswers[`1-${i}`] = labelDrop[key] })
            formattedAnswers["2"] = url

            next(formattedAnswers)
        }
    }

    const handlePrev = () => { if (index > 0) setIndex(index - 1) }

    const handleReset = () => {
        if (question.type === "drag-files") {
            setFiles([{ id: 1, type: "pdf" }, { id: 2, type: "pdf" }, { id: 3, type: "image" }])
            setFileDrop({ checklist: [], images: [] })
        }
        if (question.type === "drag-labels") {
            setLabels(["Desktop Computer", "2 in 1 / Laptop / Macbook", "iPhone / iPad", "Barcode Scanner", "Photocopier"])
            setLabelDrop({})
        }
        if (question.type === "input-url") setUrl("")
    }

    // ─── RENDER ───────────────────────────────────────────────
    return (
        <div className="digital-container">

            <h4 className="digital-title">DIGITAL LITERACY</h4>

            {/* ── Q1 : DRAG FILES ── */}
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
                                    onTouchStart={(e) => { draggingItemRef.current = f; handleTouchStart(e, f) }}
                                    onTouchMove={handleTouchMove}
                                    onTouchEnd={handleTouchEndFile}
                                    className="draggable"
                                >
                                    <img src={f.type === "pdf" ? pdf : imageForDnD} alt="" />
                                </div>
                            ))}
                        </div>

                        <div className="digital-image-wrapper">
                            <img src={deskTop} className="digital-bg-img" />

                            <div
                                className={`drop-zone overlay-drop checklist ${fileDrop.checklist.length > 0 ? "filled" : ""}`}
                                data-zone="checklist"
                                onDrop={(e) => handleFileDrop(e, "checklist")}
                                onDragOver={allowDrop}
                            >
                                Checklist Book ({fileDrop.checklist.length}/2)
                            </div>

                            <div
                                className={`drop-zone overlay-drop images ${fileDrop.images.length > 0 ? "filled" : ""}`}
                                data-zone="images"
                                onDrop={(e) => handleFileDrop(e, "images")}
                                onDragOver={allowDrop}
                            >
                                {fileDrop.images.length > 0 ? "Images ✓" : "Images"}
                            </div>
                        </div>

                    </div>

                    <button className="reset-btn" onClick={handleReset}>Reset</button>
                </>
            )}

            {/* ── Q2 : DRAG LABELS ── */}
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
                                    onTouchStart={(e) => handleTouchStart(e, l)}
                                    onTouchMove={handleTouchMove}
                                    onTouchEnd={handleTouchEndLabel}
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
                                    className={`drop-zone ${labelDrop.desktop ? "filled" : ""}`}
                                    data-device="desktop"
                                    onDrop={(e) => handleLabelDrop(e, "desktop")}
                                    onDragOver={allowDrop}
                                >
                                    {labelDrop.desktop || "Drop here"}
                                </div>
                            </div>

                            <div className="device">
                                <img src={iphone} />
                                <div
                                    className={`drop-zone ${labelDrop.phone ? "filled" : ""}`}
                                    data-device="phone"
                                    onDrop={(e) => handleLabelDrop(e, "phone")}
                                    onDragOver={allowDrop}
                                >
                                    {labelDrop.phone || "Drop here"}
                                </div>
                            </div>

                            <div className="device">
                                <img src={photoCopier} />
                                <div
                                    className={`drop-zone ${labelDrop.printer ? "filled" : ""}`}
                                    data-device="printer"
                                    onDrop={(e) => handleLabelDrop(e, "printer")}
                                    onDragOver={allowDrop}
                                >
                                    {labelDrop.printer || "Drop here"}
                                </div>
                            </div>

                            <div className="device">
                                <img src={laptop} />
                                <div
                                    className={`drop-zone ${labelDrop.laptop ? "filled" : ""}`}
                                    data-device="laptop"
                                    onDrop={(e) => handleLabelDrop(e, "laptop")}
                                    onDragOver={allowDrop}
                                >
                                    {labelDrop.laptop || "Drop here"}
                                </div>
                            </div>

                            <div className="device">
                                <img src={barCode} />
                                <div
                                    className={`drop-zone ${labelDrop.scanner ? "filled" : ""}`}
                                    data-device="scanner"
                                    onDrop={(e) => handleLabelDrop(e, "scanner")}
                                    onDragOver={allowDrop}
                                >
                                    {labelDrop.scanner || "Drop here"}
                                </div>
                            </div>

                        </div>
                    </div>

                    <button className="reset-btn" onClick={handleReset}>Reset</button>
                    {labelDone && <p className="success">✔ Marked Complete</p>}
                </>
            )}

            {/* ── Q3 : URL INPUT ── */}
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