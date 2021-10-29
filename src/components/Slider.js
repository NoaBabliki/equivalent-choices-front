import React from 'react'
import * as constants from '../constants.js'
import ReactSlider from "react-slider";


export class Slider extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            current_rating: this.defaultRating(),
        }
    }

    defaultRating(){
        return (this.props.default_rating)
    }

    sliderChange(value) {
        if (this.state.current_rating !== value){
            this.setState({
                current_rating: value,
            })
            if (this.props.index){
            this.props.getValue(value, this.props.index)
            }
            else{
                this.props.getValue(value)
            } 
        }   
    }


    render() {
        return (
            <div>
            <ReactSlider
                        className="horizontal-slider"
                        thumbClassName="example-thumb"
                        trackClassName="example-track"
                        disabled={this.props.disabled} //create disable prop or state
                        min={constants.MIN_RATING}
                        max={constants.MAX_RATING}
                        valueLabelDisplay="on"
                        defaultValue={this.defaultRating()}
                        renderThumb={(props, state) => <div {...props} onChange={this.sliderChange(state.valueNow)}>{state.valueNow}</div>}
                    />
                </div>
        )
    }
    
}

export default Slider