import "../styles/TrustBar.css"

function TrustBar() {

    return (

        <div className="trust-bar">

            <div className="trust-container">

                <div className="logo-area">
                    SAFETY <span>TRAINING</span>
                    <p className="academy">ACADEMY</p>
                </div>

                <div className="trust-items">

                    <div className="trust-card ">
                        <div className="icon"><i className="fa-solid fa-award award-card"></i></div>
                        <div>
                            <p className="title-trust">RTO</p>
                            <p className="desc">#45234</p>
                        </div>
                    </div>

                    <div className="trust-card ">
                        <i className="fa-solid fa-user-group award-card"></i>
                        <div>
                            <p className="title-trust">FACE TO FACE</p>
                            <p className="desc">Training</p>
                        </div>
                    </div>

                    <div className="trust-card">
                        <i className="fa-regular fa-circle-check award-card award-card-circle"></i>
                        <div>
                            <p className="title-trust">QUALIFIED</p>
                            <p className="desc">Trainers</p>
                        </div>
                    </div>

                </div>

            </div>

        </div>

    )

}

export default TrustBar