import React from './react'
import ReactDOM from './reactDOM'
import Timer from './timer'

function Person({ name }) {
    return <h1>{name}</h1>
}

const list = [
    "react",
    "angular",
    "vue",
]
const App = (
    <div>
        <h1 className={"h1"}>
            hello
        </h1>
        <Person name="tom" />
        <Timer />
        {
            list.map(item => <p key={item}>{item}</p>)
        }
    </div>
);



ReactDOM.render(App, document.getElementById("root"))
