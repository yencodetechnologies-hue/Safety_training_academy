import { useState } from "react"
import "../styles/Payment.css"

function Payment({ selectedCourse }) {

    const [paymentMethod, setPaymentMethod] = useState("bank")

    return (

        <div className="payment-wrapper">

            {/* Step Header */}

            <div className="payment-header">

                <h3>Step 2: Payment</h3>
                <p>Enter your details and choose your payment method</p>

            </div>

            {/* Personal Details */}

            <div className="payment-card">

                <h4>Personal Details</h4>

                <div className="form-group">

                    <label>Full Name *</label>
                    <input type="text" placeholder="Enter your full name" />

                </div>

                <div className="form-group">

                    <label>Mobile Number *</label>
                    <input type="text" placeholder="+61 xxx xxx xxx" />

                </div>

                <div className="form-group">

                    <label>Email *</label>
                    <input type="email" placeholder="your.email@example.com" />

                </div>

                <div className="terms">

                    <input type="checkbox" />
                    <span>I agree to the terms and conditions and understand my information will be used for enrollment purposes</span>

                </div>

            </div>

            {/* Order Summary */}

            <div className="summary-card">

                <h4>Order Summary</h4>

                <div className="summary-row">
                    <span>Course:</span>
                    <span>{selectedCourse || "Work safely at heights + Provide telecommunications services safely on roofs"}</span>
                </div>

                <div className="summary-row">
                    <span>Date:</span>
                    <span>4/7/2026 - 4/7/2026</span>
                </div>

                <div className="summary-row total">
                    <span>Total:</span>
                    <span>$330</span>
                </div>

            </div>

            {/* Payment Method */}

            <div className="payment-method">

                <label>Select Payment Method *</label>

                <div
                    className={`method-card ${paymentMethod === "bank" ? "active" : ""}`}
                    onClick={() => setPaymentMethod("bank")}
                >

                    <input
                        type="radio"
                        checked={paymentMethod === "bank"}
                        readOnly
                    />

                    <div>
                        <strong>Bank Transfer</strong>
                        <p>Transfer to our bank account - pay later</p>
                    </div>

                </div>

                <div
                    className={`method-card ${paymentMethod === "card" ? "active" : ""}`}
                    onClick={() => setPaymentMethod("card")}
                >

                    <input
                        type="radio"
                        checked={paymentMethod === "card"}
                        readOnly
                    />

                    <div>
                        <strong>Credit Card - Pay Now</strong>
                        <p>Pay securely with your card online</p>
                    </div>

                </div>

            </div>

            {/* Bank Details */}

            {paymentMethod === "bank" && (

                <div className="bank-details">

                    <h4>Bank Details</h4>

                    <div className="bank-row">
                        <span>Bank:</span>
                        <span>Commonwealth Bank</span>
                    </div>

                    <div className="bank-row">
                        <span>Account Name:</span>
                        <span>AIET College</span>
                    </div>

                    <div className="bank-row">
                        <span>BSB:</span>
                        <span>062 141</span>
                    </div>

                    <div className="bank-row">
                        <span>Account No:</span>
                        <span>10490235</span>
                    </div>

                    <div className="form-group">

                        <label>Transaction ID / Reference *</label>
                        <input type="text" placeholder="Enter your bank transaction ID" />

                    </div>

                    <div className="form-group">

                        <label>Payment slip upload *</label>
                        <input type="file" />

                    </div>

                    <p className="bank-note">
                        Please use your name and course code as the payment reference.
                    </p>

                </div>

            )}
            {paymentMethod === "card" && (

                <div className="card-payment">

                    <div className="secure-box">

                        <div className="secure-left">
                            🔒 <strong>Secure Payment</strong>
                            <p>Your card details are encrypted and secure</p>
                        </div>

                        <div className="pci">
                            🛡 PCI Compliant
                        </div>

                    </div>

                    <div className="form-group">

                        <label>Name on Card *</label>
                        <input type="text" placeholder="JOHN SMITH" />

                    </div>

                    <div className="form-group">

                        <label>Card Number *</label>
                        <input type="text" placeholder="4111 1111 1111 1111" />

                    </div>

                    <div className="card-row">

                        <div className="form-group">

                            <label>Expiry Month *</label>
                            <select>
                                <option>MM</option>
                                <option>01</option>
                                <option>02</option>
                                <option>03</option>
                                <option>04</option>
                                <option>05</option>
                                <option>06</option>
                                <option>07</option>
                                <option>08</option>
                                <option>09</option>
                                <option>10</option>
                                <option>11</option>
                                <option>12</option>
                            </select>

                        </div>

                        <div className="form-group">

                            <label>Expiry Year *</label>
                            <select>
                                <option>YY</option>
                                <option>2025</option>
                                <option>2026</option>
                                <option>2027</option>
                                <option>2028</option>
                                <option>2029</option>
                            </select>

                        </div>

                    </div>

                    <div className="form-group">

                        <label>CVV *</label>
                        <input type="password" placeholder="???" />

                    </div>

                    <div className="card-logos">

                        <span>We accept:</span>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="visa" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="master" />

                    </div>

                </div>

            )}

            {/* Warning */}

            <div className="payment-warning">

                Note: After completing the payment step, you will proceed to the LLND Assessment and then the Enrollment Form.

            </div>

            {/* Buttons */}



        </div>

    )

}

export default Payment