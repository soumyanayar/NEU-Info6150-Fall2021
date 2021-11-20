import  './app.css'

function Reorder({onReorder}){
        return (
          <span className="btn__container">
            <button className="reorder-btn" onClick = {onReorder}> ReOrder</button>
          </span>
        );
}

export default Reorder;