import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from '../../screens/Home/Home'
import Result from '../../screens/Result/Result'
import HamburgerContext from '../../contexts/HamburgerContext'
import OrderContext from '../../contexts/OrderContext'

const Container = () => {
    const [salad, setSalad] = useState([]);
    const [cheese, setCheese] = useState([]);
    const [meat, setMeat] = useState([]);
    const [currentPrice, setCurrentPrice] = useState(4);
    const [isOrdered, setOrdered] = useState(false);
    return (
        <Router>
            <Switch>
                <HamburgerContext.Provider value={{ salad, setSalad, cheese, setCheese, meat, setMeat, currentPrice, setCurrentPrice }} >
                    <OrderContext.Provider value={{ isOrdered, setOrdered }} >
                        {isOrdered ?
                            <Route exact strict path="/result" ><Result /> </Route> :
                            <Route path="/*"><Home /></Route>
                        }

                    </OrderContext.Provider>
                </HamburgerContext.Provider>
            </Switch>
        </Router>

    )
}

export default Container
