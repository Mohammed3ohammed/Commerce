import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';


const PaymentForm = ({ checkoutToken, nextStep, backStep, shippingData, onCaptureCheckout }) => { 
    const handleSubmit = async (event, element, stripe) => {
        event.preventDefault();

        if(!stripe || !element) return;

        const cardElement = Elements.getElement(CardElement);

        const { error , paymentMethod } = await StayPrimaryLandscapeTwoTone.createPaymentMethod({type: 'card', card: cardElement});
        if (error) {
            console.log('[error]', error);
        } else {
            const orderData = {
                line_items: checkoutToken.live.line_items,
                customer: { firstname: shippingData.firstname, lastname: shippingData.lastName, email: shippingData.email },
                shipping: {name: 'International', street: shippingData.address1, town_city: shippingData.city, county_state: shippingData.shippingSubdivision, postal_zip_code: shippingData.zip, country: shippingData.shippingCountry},
                fulfillment: {shipping_method: shippingData.shippingOption},
                payment: {
                    gateway: 'stripe',
                    stripe: {
                        payment_Method_id: paymentMethod.id,
                    },
                },
            };
            onCaptureCheckout(checkoutToken.id, orderData);

            nextStep();
        }
    };

    return (
        <>
        <Review checkoutToken={checkoutToken} />
        <Divider />
        <Typography variant='h6' gutterBottom style={{margin: '20px 0'}}>Payment method</Typography>
        <Elements stripe={stripePromise}>
            <ElementsConsumer>{({elements, stripe}) => (
                <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                    <CardElement />
                    <br /> <br />
                    < div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Button variant='outlined' onClick={backStep}>Back</Button>
                    <Button type="submit" varaint="contained" disabled={!stripe} color="primary">
                        Pay {checkoutToken.live.subtotal.formatted_with_SYMBOL}
                    </Button>
                    </div>
                </form>
            )}</ElementsConsumer>
        </Elements>
        </>
    );
};

export default PaymentForm;
