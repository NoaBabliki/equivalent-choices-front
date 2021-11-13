import React from 'react'
import '../App.css'
import * as constants from '../constants.js'
import Slider from './Slider';

const INSTRUCTIONS_PART_1 = 'In addition to the previous options, you can add'
const INSTRUCTIONS_PART_2 = 'more options of your own to category'
const INSTRUCTIONS_PART_3 = 'Please add options that are close to the edges of the preference scale - very highly preferred (close to'
const INSTRUCTIONS_PART_4 = ') or very lowly preferred (close to'
const INSTRUCTIONS_PART_5 = ').'
const INSTRUCTIONS_PART_6 = 'Please add an option and rate it (option'
const INSTRUCTIONS_PART_7 = 'out of'

export class AddCustomItems extends React.PureComponent {

    constructor(props){
        super(props)
        this.state = {
            category_name: this.props.setCategory(),
            current_option_index: 0,
            options_added: [],
            disable_next_button: true,
            current_option_name: "",
            current_option_rating: this.setRatingToMiddle(),
            disable_option_adding: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.sliderChange = this.sliderChange.bind(this);
    }

    main(){
        return (
            <div>
                {this.showInstructions()}
                {this.addOption()}
            </div>
        )
    }

    setRatingToMiddle(){
        return (Math.round((constants.MIN_RATING + constants.MAX_RATING) / 2))
    }

    desplayIndex(){
        if (this.state.current_option_index === constants.NUM_CUSTOM_OPTIONS){
            return (this.state.current_option_index)
        }
        else{
            return (this.state.current_option_index + 1)
        }
    }

    showInstructions(){

        return(
            <div>
            <h3 className='instructions'>{INSTRUCTIONS_PART_1}</h3>
            <h3 className='category-name'>{constants.NUM_CUSTOM_OPTIONS}</h3>  
            <h3 className='instructions'>{INSTRUCTIONS_PART_2}</h3>
            <h3 className='category-name'>{this.state.category_name}.</h3>
            <h3 className='instructions'>{INSTRUCTIONS_PART_3}{constants.MAX_RATING}
            {INSTRUCTIONS_PART_4}{constants.MIN_RATING}{INSTRUCTIONS_PART_5}</h3>
            <h3 className='instructions'> {INSTRUCTIONS_PART_6}</h3>
            <h3 className='category-name'>{this.desplayIndex()}</h3>
            <h3 className='instructions'>{INSTRUCTIONS_PART_7}</h3>
            <h3 className='category-name'>{constants.NUM_CUSTOM_OPTIONS}</h3>
            <h3 className='instructions'>{INSTRUCTIONS_PART_5}</h3>
            </div>
        )
    }

    handleChange(event){
        this.setState({
            current_option_name: event.target.value})
    }

    handleSubmit(event){
        let newOption = {
            id: this.props.maxId + this.state.current_option_index,
            name: this.state.current_option_name,
            rating: this.state.current_option_rating
        }
        this.state.options_added.push(newOption)
        this.setState({
            current_option_index: this.state.current_option_index + 1,
            current_option_name: "",
            current_option_rating: this.setRatingToMiddle(),
        })
        if (this.state.current_option_index + 1 === constants.NUM_CUSTOM_OPTIONS){
            this.props.addParticipentOptions(this.state.options_added)
            this.setState({
                disable_option_adding: true
            })
        }
    }

    sliderChange(value){
        if (value !== this.state.current_option_rating){
            this.setState({current_option_rating: value})
        }   
    }

    disableSubmit(){
        const close_to_max = (constants.MAX_RATING - this.state.current_option_rating < constants.RATING_MARGIN)
        const close_to_min = (constants.MIN_RATING + this.state.current_option_rating < constants.RATING_MARGIN)
        if ((close_to_min || close_to_max) && this.state.current_option_name){
           return (false)
        }
        else{
            return (true)
        }
    }


    //get input
    addOption(){
        let disable_submit = this.disableSubmit()
        return(
            <div>
                <label className='instructions'>
                    Option Name: 
                    <input className='instructions' type="text" disabled={this.state.disable_option_adding} value={this.state.current_option_name} onChange={this.handleChange}></input>
                </label>
                <div>
                {this.optionSlider()}
                </div>
                <input className='submit-button' type="submit" value="submit" disabled={disable_submit} onClick={this.handleSubmit}></input>
            </div>
        )

    }

    // show and save option's rating
    optionSlider(){
        return (
            <Slider
            key={this.state.current_option_index}
            disabled={this.state.disable_option_adding}
            default_rating={Math.round((constants.MIN_RATING + constants.MAX_RATING) / 2)}
            getValue={this.sliderChange}>
            </Slider>
        )
    }

    disableNextButton(){
        this.setState({
            disable_next_button: false,
        })
    }

    nextButtonAction(){
        this.props.setSaveData()
        this.props.setReadData()
        this.props.setFlow()
    }

    //participent types the option in the box in addOption
    //participent rates the option in the slider
    //submit option with rating and continue
    // inforce the options to be rated close to 1000 or 0
    render(){
        return (
            <div>
                {constants.NUM_CUSTOM_OPTIONS !== 0?
                this.main() : this.nextButtonAction()}
                {this.state.current_option_index !== constants.NUM_CUSTOM_OPTIONS?
                null : this.disableNextButton()}
                <button className='next-button' disabled={this.state.disable_next_button} 
                onClick={()=>{this.nextButtonAction()}}>next</button>
            </div>
        )
    }
}

export default AddCustomItems;