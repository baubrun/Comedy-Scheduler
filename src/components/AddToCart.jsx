import React from 'react'

export const AddedToCart = props => {
    return (
        <div>
            <div className="purchase-btn" onClick={props.addToCart}>PURCHASE</div>
        </div>
    )
}
