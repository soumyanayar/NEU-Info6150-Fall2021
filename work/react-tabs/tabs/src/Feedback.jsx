import React from 'react'
import './feedback.css'

function Feedback() {
    return (
        <div className="form-container">
            <form method="post" name="mymailfrom" action="dummy.html">
            <div class="name">
                <label for='name'>Name: </label>
                <input type="text" name="name" required></input>
            </div>
            <div name="address">
                <label for='email'>Email Address: </label>
                <input type="email" name="email" size="30" required></input>
            </div>
            <div name="text-area">
                <textarea required>Please Provide Feedback Here</textarea>
            </div>
            <button type="submit">Register</button>
            </form> 
        </div>
    )
}

export default Feedback;    
