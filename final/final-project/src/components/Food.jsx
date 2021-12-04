import React from 'react'


const Food = ({image, name, id, info, glass}) => {
    return(
        <article className="cocktail">
            <div className="img-container">
                <img src={image} alt={name}></img>
            </div>
            <div className="cocktail-footer">
                <h3>{name}</h3>
                <h4>{glass}</h4>
                <p>{info}</p>
            </div>
        </article>
    )
}


export default Food
