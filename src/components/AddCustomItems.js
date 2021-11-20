import React from 'react'
import '../App.css'
import * as constants from '../constants.js'
import Slider from './Slider';

const INSTRUCTIONS_PART_1 = 'In addition to the previous options, you can add'
const INSTRUCTIONS_PART_2 = 'more options of your own to the category'
const INSTRUCTIONS_PART_3 = 'Please add options that are close to the edges of the preference scale - very highly preferred (close to '
const INSTRUCTIONS_PART_4 = ') or very lowly preferred (close to '
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
            disable_option_adding: false,
            diversion: 0
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
        const middle = Math.round(constants.NUM_CUSTOM_OPTIONS / 2)
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
            {(this.state.options_added.length >= middle) && (this.state.options_added.length < constants.NUM_CUSTOM_OPTIONS) ? this.askForDiversion() : null}
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
        const NO_DIVERSION = 0
        const LOW = 1
        const HIGH = 2
        const close_to_max = (constants.MAX_RATING - this.state.current_option_rating < constants.RATING_MARGIN)
        const close_to_min = (constants.MIN_RATING + this.state.current_option_rating < constants.RATING_MARGIN)
        var legal_rating
        if (this.state.diversion === NO_DIVERSION) {
            legal_rating = (close_to_min || close_to_max)
        }
        if (this.state.diversion === LOW) {
           legal_rating = close_to_min
        } 
        if (this.state.diversion === HIGH) {
            legal_rating = close_to_max
        }
        if (legal_rating && this.state.current_option_name){
            return (false)
         }
         else {
             return (true)
         }
    }


    //get input
    addOption(){
        let disable_submit = this.disableSubmit()
        return(
            <div>
                { !this.state.disable_option_adding ?
                <div>
                <label className='instructions'>
                    Option Name: 
                    <input className='instructions' type="text" disabled={this.state.disable_option_adding} value={this.state.current_option_name} onChange={this.handleChange}></input>
                </label>
                <div>
                {this.optionSlider()}
                </div>
                <input className='submit-button' type="submit" value="submit" disabled={disable_submit} onClick={this.handleSubmit}></input>
                </div> : null}
                <div>
                {(this.state.current_option_name !== "") && disable_submit && (this.state.current_option_rating !== this.setRatingToMiddle()) ?
                <h4 className="warning">Please pick an option you have an extreme preference towards - lower than {constants.MIN_RATING + constants.RATING_MARGIN} or higher than {constants.MAX_RATING - constants.RATING_MARGIN}</h4> : null}
                </div>
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

    askForDiversion(){
        let counter_high = 0
        let counter_low = 0
        let middle = Math.round(constants.NUM_CUSTOM_OPTIONS / 2)
        for (var i=0; i<this.state.options_added.length; i++){
            if (this.state.options_added[i].rating < constants.RATING_MARGIN){
                counter_low += 1
            }
            else {
                counter_high += 1
            }
        }
        if (counter_high >= middle){
            this.setState({diversion: 1})
            return (
                <h3 className="instructions-bold">Please make sure the next options you add are lowly preferred (close to {constants.MIN_RATING})</h3>
            )
        }
        if (counter_low >= middle){
            this.setState({diversion: 2})
            return (
                <h3 className="instructions-bold">Please make sure the next options you add are highly preferred (close to {constants.MAX_RATING})</h3>
            )
        }
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
                {this.state.current_option_index === constants.NUM_CUSTOM_OPTIONS?
                this.nextButtonAction() : null}
            </div>
        )
    }
}

export default AddCustomItems;