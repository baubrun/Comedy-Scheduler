import React from 'react'
import Checkout from "./Checkout"
import {CardElement, ElementsConsumer} from '@stripe/react-stripe-js';


const InjectedFormCheckout = () => {
    return (
        <ElementsConsumer>
            {({elements, stripe}) => (
                <Checkout
                elements={elements}
                stripe={stripe}
                />
            )}
        </ElementsConsumer>
    )
}



export default InjectedFormCheckout