import React from 'react'
import '../App.css'
import Slider from './Slider';
import * as constants from '../constants'


export class RateSingleOption extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            cur_option: this.props.option,
            cur_rating: 0,
        }
        this.sliderChange = this.sliderChange.bind(this)
    }


    sliderChange(value){
        if (this.state.cur_rating !== value){
            this.setState({
                cur_rating: value,
            })
            this.props.ratingChange(value)
        }
    }

    rateOption(){
        return(
               <Slider
               disabled={false}
               default_rating={Math.round((constants.MIN_RATING + constants.MAX_RATING) / 2)}
               getValue={this.sliderChange}>
               </Slider>
        )
    }


    render() {
        return (
            <div>
            {this.state.cur_option? this.rateOption() : null}
            </div>
        )
    }
}

export default RateSingleOption