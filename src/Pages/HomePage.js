import React from "react"
import './HomePage.css'
import { Link } from "react-router-dom";


const HomePage = (props) => {
    return (

        <div className="home">
            <h2>Choose the Application</h2>
            {/* <img src={images} width={500} height={200}/> */}
            <div className=".list-wrapper">
                <ul className="list">
                    <li className="list-item">
                        <Link to ='crud'>Crud Application</Link>
                    </li>
                    <li className="list-item">
                        <Link to='todo'>Todo Application</Link>
                    </li>
                </ul>

            </div>
        </div>
    )
};

export default HomePage;
