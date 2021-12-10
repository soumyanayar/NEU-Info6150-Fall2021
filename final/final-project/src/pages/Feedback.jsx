import React from 'react'
import Submitform from '../components/Submitform';
const Feedback = () => {
  return (
    <section className="section about-section">
      <h1 className="section-title">Your Feedback Is Valuable</h1>
      <div className="introduction">
        <p>
        Calorie Visualiser is developed by young web designers as an academic project.
        Developers at Calorie visualisers are students and very much intersted in learning things from you. 
        Your feedback will definitely help them to make this application look better and feel better.
        We highly encourage you to fill in few details asked about your experience while using this application.
        We want to give the best of user experience from the inputs we recieve from you.
      </p>
      <br></br>
      </div>
      <h2 className="introduction-title">Please Fill In The Below Details And Encourage</h2>
      <form className="submit-form">
          <div className="faq-div">
          <label>On a scale of 1 - 5 how usefule is this application?</label>
          <div className="grouping-div">
              <input type="radio" name="grade" value="1"/>
              <label>1</label>
              <input type="radio" name="grade" value="2"/>
              <label>2</label>
              <input type="radio" name="grade" value="3"/>
              <label>3</label>
              <input type="radio" name="grade" value="4"/>
              <label>4</label>
              <input type="radio" name="grade" value="5"/>
              <label>5</label>
          </div>
          <label>How do you rate the accuracy of the output?</label>
          <div className="grouping-div">
              <input type="radio" name="accuracy" value="1"/>
              <label>1</label>
              <input type="radio" name="accuracy" value="2"/>
              <label>2</label>
              <input type="radio" name="accuracy" value="3"/>
              <label>3</label>
              <input type="radio" name="accuracy" value="4"/>
              <label>4</label>
              <input type="radio" name="accuracy" value="5"/>
              <label>5</label>
          </div>
          <label>How do you rate the visual effect of the application?</label>
          <div className="grouping-div">
              <input type="radio" value="1"/>
              <label>1</label>
              <input type="radio" value="2"/>
              <label>2</label>
              <input type="radio" value="3"/>
              <label>3</label>
              <input type="radio" value="4"/>
              <label>4</label>
              <input type="radio" value="5"/>
              <label>5</label>
          </div>
          <label>Where do you think we should Improve?</label>
          <div className="grouping-div">
              <input type="checkbox" value="1"/>
              <label>Data Accuracy</label>
              <input type="checkbox"  value="2"/>
              <label>Look and feel of the pages</label>
              <input type="checkbox" value="3"/>
              <label>User experience</label>
              <input type="checkbox"value="4"/>
              <label >Content</label>
          </div>
        </div>
      </form>
    <Submitform/>
    </section>
  )
}

export default Feedback;
