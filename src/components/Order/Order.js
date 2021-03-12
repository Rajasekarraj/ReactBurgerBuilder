import React from 'react';
import classes from './Order.css';

const order = (props) => {
    let ingredients = [];
    for(let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            count: props.ingredients[ingredientName]
        });
    }
    console.log('ingredient', ingredients)
    let ingredient = ingredients.map(ingredient => {
        return <span style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '10px 8px',
            border: '1px solid #ccc',
            padding: '10px'
        }}>{ingredient.name}  ({ingredient.count})</span>
    })
    return(
        <div className={classes.Order}>
            <div>Ingredient: {ingredient}</div>
            <div>Total Price: <strong>USD.{props.price}</strong></div>
        </div>
    )
}

export default order;