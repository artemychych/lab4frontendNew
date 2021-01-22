import React from 'react'
import githubLogo from '../../assets/GitHub-Mark-Light-64px.png'; // Tell webpack this JS file uses this image

export default class Footer extends React.Component{
    render(){
        return(
            <div id={"footer"}>
                <div>
                    <div>© Artem Innokentiev, 2021</div>
                </div>
            </div>
        )
    }
}

