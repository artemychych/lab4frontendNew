import React, {Fragment} from 'react'
import TextField from "../inputs/text-field";
import request from "superagent";
import {connect} from "react-redux";
import {addEntry, clearEntries, setR} from "../../actions/actions";
import Cookies from "js-cookie";
import history from "../../history";

class PointsInputForm extends React.Component{
    componentDidMount() {
        // var button = document.getElementById("r-activator")
        // button.addEventListener('click', (event) => {
        //     var rValue = document.getElementById("r");
        //     this.props.dispatch(setR(rValue.value));
        // })

    }

    render(){
        return(
            <Fragment>
                <form id={"points-form"}>
                    <label className={"error-label"} id={"entry-form-error"}/>
                    <div>
                        <label className={"input-name"}>Select X value</label>
                        <TextField type={"text"} name={"x"} id={"x"} label={"X value"} placeholder={"Enter X value (-5;5)"}/>
                    </div>
                    <div>
                        <label className={"input-name"}>Enter Y value</label>
                        <input type="number" min={"-5"} max={"3"} id={"y"} name={"y"} size={"10"}/>
                    </div>
                    <div>
                        <label className={"input-name"}>Select R value</label>
                        <TextField type={"text"} name={"r"} id={"r"} label={"R value"} placeholder={"Enter R value (-5;5)"} />
                        <div className={"refresh-div"}>
                            <button className={"button"} id={"r-activator"} onClick={this.renderR}>Refresh</button>
                        </div>
                        <div className={"buttons-div"}>
                            <button type={"submit"} className={"button"} onClick={this.submit}>Check</button>
                            <button className={"button"} onClick={this.clear}>Clear</button>
                        </div>
                    </div>
                </form>
            </Fragment>
        )
    }

    renderR = (e) => {
        e.preventDefault()

        var r = document.getElementById('r').value
        let error = document.getElementById("entry-form-error");
        error.innerHTML = ""


        if (r !== "") {
            let rValue = r.replace(/\s/g,'').replace(',','.');
            if((!isNaN(rValue)) && !(parseFloat(rValue) > 5 || parseFloat(rValue) < -5 )) {
                rValue = parseFloat(rValue).toFixed(5)
                this.props.dispatch(setR(rValue));
            } else {
                error.innerHTML = "R value should be in (-5;5)"
            }

        } else {
            error.innerHTML = "R value should not be empty"
        }


    }

    submit = (e) => {
        e.preventDefault();

        var r = document.getElementById('r').value
        var x = document.getElementById('x').value
        var y = document.getElementById('y').value

        let error = document.getElementById("entry-form-error");
        error.innerHTML = ""

        if (x !== "" && r !== "" && y !== "") {
            let xValue = x.replace(/\s/g,'').replace(',','.');
            let yValue = y.replace(/\s/g,'').replace(',','.');
            let rValue = r.replace(/\s/g,'').replace(',','.');
            if( ((!isNaN(yValue)) && !(parseFloat(yValue) > 3 || parseFloat(yValue) < -5 )) && ((!isNaN(xValue)) && !(parseFloat(xValue) > 5 || parseFloat(xValue) < -5 )) && ((!isNaN(rValue)) && !(parseFloat(rValue) > 5 || parseFloat(rValue) < -5 ))) {
                yValue = parseFloat(yValue).toFixed(5)
                xValue = parseFloat(xValue).toFixed(5)
                rValue = parseFloat(rValue).toFixed(5)
                var dispatch = this.props.dispatch;

                request
                    .post('http://localhost:6601/api/points')
                    //.withCredentials()
                    .set('X-Requested-With', 'XMLHttpRequest')
                    .send(JSON.stringify({x: xValue, y: yValue, r: rValue}))
                    .type('json')
                    .end(function (err, res) {
                        if (res.ok) {
                            dispatch(addEntry(JSON.parse(res.text)));
                        } else if (res.status === 401) {
                            Cookies.set('is-logged-in','false')
                            history.push("/welcome")
                        }
                    });
            }else error.innerHTML = "X, R must be a number in range (-5;5) and Y must be in (-5;3)"
        }else error.innerHTML = "Please select Y and enter X or R value"

    }

    clear = (e) =>{
        e.preventDefault();
        var dispatch = this.props.dispatch;
        request
            .delete('http://localhost:6601/api/points')
            //.withCredentials()
            .set('X-Requested-With', 'XMLHttpRequest')
            .end(function (err, res) {
                if (res.ok) {
                    dispatch(clearEntries());
                } else if (res.status === 401) {
                    Cookies.set('is-logged-in','false')
                    history.push("/welcome")
                }
            });
    }
}

export default connect(null)(PointsInputForm);