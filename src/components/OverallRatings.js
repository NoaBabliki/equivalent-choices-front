import React from 'react'
import Slider from './Slider.js'

const INSTRUCTIONS = 'These are your preferences for the options presented. You may adjust them now to your liking.'
const INDEX_DEV = 1

export class OverallRatings extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            ratings: this.createRatingArray()
        }
        this.sliderChange = this.sliderChange.bind(this)
    }

    createRatingArray(){
        const options = this.props.client_categories[this.props.index]
        const num_options = options.length
        let ratings = new Array(num_options + 1).fill(0)
        for (let i = INDEX_DEV; i<num_options+INDEX_DEV; i++){
            ratings[i] = options[i-INDEX_DEV].rating
        }
        return (ratings)
    }

    sliderChange(value, index){
        if (value !== this.state.ratings[index]){
            let newRatings = this.state.ratings.slice(0)
            newRatings[index] = value
            this.setState({
                ratings: newRatings
            }) 
        }
    }
    //create 2d array and show in table!
    showAllOptions(){
        const n_cols = 2
        var two_d_data = []
        const category_arr_copy = this.props.client_categories[this.props.index].slice(0)
        while(category_arr_copy.length) two_d_data.push(category_arr_copy.splice(0,n_cols));
        return (
            <div>
            <table className='table-no-border'>
                    <tbody>
                {two_d_data.map((d, i)=> (
                    <tr key={i} className='table-no-border'>
                        {d.map((option, index) => this.showOption(option, index + INDEX_DEV + (i*n_cols)))}
                    </tr>))}
                    </tbody>
                </table>
                </div>
        )
    }

    showOption(option, index){
        return(
        <td className='table-no-border'>
            <h4 className='option-name'>{option.name}:</h4>
            {option? 
            <Slider
                key={option.id}
                index={index}
                disabled={false}
                default_rating={option.rating}
                getValue={this.sliderChange}>
            </Slider>: null}
        </td>            
        )
    }

    nextButtonAction(){
        const options = this.props.client_categories[this.props.index]
        const num_options = options.length
        let newOptions = options.slice(0)
        for (let i = 0; i < num_options; i++){
            newOptions[i].rating = this.state.ratings[i + INDEX_DEV]
        }
        this.props.setCategories(newOptions)
        this.props.setFlow()
    }
    

    render() {
        return(
            <div>
                <h3 className='instructions'>{INSTRUCTIONS}</h3>
                {this.props.categories? this.showAllOptions() : null}
                <button className='next-button' onClick={()=>{this.nextButtonAction()}}>next</button>
            </div>
        )
    }
}

export default OverallRatings