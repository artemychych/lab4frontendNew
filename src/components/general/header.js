import React from 'react'

export default class Header extends React.Component{
    render(){
        return(
            <div id={"header"}>
                <div id={"names-sign"}>
                    <div>
                        Иннокентьев&nbsp;Артем,&nbsp;P3213</div>
                    </div>
                <div id={"lab-sign"}>
                    <div>
                        Лабораторная №4 по Web Programming
                    </div>
                </div>
                <div id={"var-sign"}>
                    <div>
                        Вариант: 6165
                    </div>
                </div>
            </div>
        )
    }
}