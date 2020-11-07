import React from 'react';

const HamburgerContext = React.createContext({
    salad: [],
    setSalad: () => { },

    cheese: [],
    setCheese: () => { },

    meat: [],
    setMeat: () => { },

    currentPrice: 4,
    setCurrentPrice: () => { }
});

export default HamburgerContext