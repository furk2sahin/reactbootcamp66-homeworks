import React from 'react';

const OrderContext = React.createContext({
    isOrdered: false,
    setOrdered: () => { }
})

export default OrderContext