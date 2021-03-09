import React from "react";
import {Navbar} from "../Components/Navbar"
import {Route,Switch} from "react-router-dom"
import { Topic } from "../Components/Topic";

const Routes = () => {
    return(
        <>
            <Navbar/>
            <Switch>
                <Route exact path = "/">
                    <h3>Home Page</h3>
                </Route>
                <Route path = "/topics/:name">
                        <Topic/>
                </Route>
                <Route>
                    <h3>Page not found</h3>
                </Route>
            </Switch>
        </>
        
    )
}


export {Routes}