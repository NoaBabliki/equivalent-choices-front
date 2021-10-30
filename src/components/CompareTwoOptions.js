import React from 'react'
import '../App.css'
import OptionBox from './OptionBox'
import * as constants from '../constants'
import DialogBox from './DialogBox'


const INSTRUCTIONS = 'Please fill in the missing value to make the options of equal value.'
const DEFAULT_MSG = 'Please choose'
//const WARNING_MAG = 'Please choose a value to make the options equivalent'

export class CompareTwoOptions extends React.PureComponent{

    constructor(props){
        super(props)
        this.state = {
            cur_chosen: null,
            attr_array: this.chooseAttribues(),
            disable_next: true,
            call_timer: true,
            show_dialog_box: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.setDisableNext = this.setDisableNext.bind(this)
        this.saveDialogAnswer = this.saveDialogAnswer.bind(this)
    }

    chooseAttribues(){
        const num_attr = 4
        const rand_index = Math.floor(Math.random() * num_attr)
        let attr_array = new Array(num_attr).fill(0)
        this.fillArray(attr_array, rand_index)
        return attr_array
        
    }

    fillOneOption(attr_array, rand_index, start_rand, end_rand, start_op, end_op, arrays, half_length){   
        for (let i = start_op; i < end_op; i++){
            attr_array[i] = this.props.cur_option[i%half_length]
        }
        for(let i = start_rand; i < end_rand; i++){
            if (i === rand_index){
                attr_array[i] = null
            }
            else{
                let array = arrays[i % half_length].filter(item => !attr_array.includes(item))
                let rand_attr = array[Math.floor(Math.random() * array.length)]
                attr_array[i] = rand_attr
            }
        }
    }


    fillArray(attr_array, rand_index){
        const is_attention_check = Math.floor(Math.random() * 100)
        const arrays = [this.props.categories[0].slice(0), this.props.categories[1].slice(0)]
        let half_length = attr_array.length / 2
        if (this.props.cur_match === 1){
            this.fillAllAttributes(attr_array, rand_index, arrays, half_length)
        }
        else if (rand_index < half_length){
            this.fillOneOption(attr_array, rand_index, 0, half_length, half_length, attr_array.length, arrays, half_length)
        }
        else{
            this.fillOneOption(attr_array, rand_index, half_length, attr_array.length, 0, half_length, arrays, half_length)
        }
        this.attentionCheck(attr_array, rand_index, is_attention_check, half_length)
    }

    fillAllAttributes(attr_array, rand_index, arrays, half_length){
        for (let i = 0; i < attr_array.length; i++){
            if (i === rand_index){
                attr_array[rand_index] = null
            }
            else{
                let array = arrays[i % half_length]
                let rand_attr = array[Math.floor(Math.random() * array.length)]
                attr_array[i] = rand_attr
                arrays[i % half_length] = arrays[i % half_length].filter(item => item !== rand_attr)
            }
        }
    }

    attentionCheck(attr_array, rand_index, is_attention_check, half_length){
        if (is_attention_check < constants.ATTENTION_TRIALS){
            for (let j = 0; j < half_length; j ++)
            {
                if (rand_index % half_length !== j){
                    attr_array[j + half_length] = attr_array[j]
                }
            }
        }
    }

    showInstructions(){
        return (
            <h3 className='instructions'>{INSTRUCTIONS}</h3>
        )
    }

    componentDidMount() {
        this.mountTime = (new Date()).getTime();
      }

    saveDialogAnswer(answer){
        this.setState({
            show_dialog_box: false,
        })
        this.saveAndContinue(answer)
    }

    saveAndContinue(answer){
        const currentTime = (new Date()).getTime();
        const reaction_time = currentTime - this.mountTime // save the reaction time
        const updated_set = {
            id: this.props.index,
            cur_match: this.props.cur_match,
            cur_set: this.props.cur_set,
            option1: this.state.attr_array.slice(0, 2),
            option2: this.state.attr_array.slice(2),
            attr_chosen: this.state.cur_chosen,
            reaction_time: reaction_time,
            is_equivalent: answer,
        }
        this.props.setFlow(updated_set)
    }

    handleSubmit(value) {
        if (value.name !== DEFAULT_MSG){
            this.setState({
                cur_chosen: value,
            })
            this.setDisableNext()
        }
        else{
            this.setState({
                cur_chosen: null,
                disable_next: true
            })
        }

    }

    setDisableNext(){
        const to_seconds = 1000
        const currentTime = (new Date()).getTime();
        if ((currentTime > (this.mountTime + (to_seconds * constants.MINIMAL_TIME)))){
            this.setState({disable_next: false})
        }
        else if (this.state.call_timer) {
            this.setState({call_timer: false})
            setTimeout(this.setDisableNext, constants.MINIMAL_TIME * to_seconds);
        }
    }

    showOptions(){
        return (
            <div>
                <OptionBox
                index={1}
                categories={this.props.categories_to_choose}
                attr1={this.state.attr_array[0]}
                attr2={this.state.attr_array[1]}
                disable={this.state.show_dialog_box}
                default_msg={DEFAULT_MSG}
                handleSubmit={this.handleSubmit}>
                </OptionBox>
                <OptionBox
                index={2}
                categories={this.props.categories_to_choose}
                attr1={this.state.attr_array[2]}
                attr2={this.state.attr_array[3]}
                disable={this.state.show_dialog_box}
                default_msg={DEFAULT_MSG}
                handleSubmit={this.handleSubmit}>
                </OptionBox>
            </div>        
        )
    }
    
    render(){
        return(
            <div className='compare-options-body'>
                {this.showInstructions()}
                {this.props.categories? this.showOptions() : null}
                <button className='submit-abs' 
                        disabled={this.state.disable_next} 
                        onClick={()=>{this.setState({show_dialog_box: true})}}>
                        Next
                </button>
                {this.state.show_dialog_box? <DialogBox save_answer={this.saveDialogAnswer}></DialogBox>: null}
            </div>
        )
    }
}

export default CompareTwoOptions