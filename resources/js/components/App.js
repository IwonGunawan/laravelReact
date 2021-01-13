import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch} from 'react-router-dom'

import Header from './Header'
import ArticleIndex from './ArticleIndex'
import Create from './Create'
import Update from './Update'
import Show from './Show'


class App extends Component{
    render() {
        return(
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path='/' component={ArticleIndex} />
                        <Route exact path='/create' component={Create} />
                        <Route path='/article/edit/:id' component={Update} />
                        <Route path='/article/detail/:id' component={Show} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("app"))