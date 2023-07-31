import React from "react";
import { Link } from "react-router-dom";

class Top extends React.Component {
    render(){
        return(
            <div>
                
                <div className="top-content">
                    <div className="top-title">
                        <h1>すごろく</h1>

                        <Link to={'/setting'}>げーむすたーと</Link>
                    </div>
                </div>
                

            </div>
        )
    }
}

export default Top

