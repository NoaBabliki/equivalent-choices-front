import React from 'react'
import '../App.css'
import * as constants from '../constants.js'
import CompareTwoOptions from './CompareTwoOptions'
import ThankYouScreen from './ThankYouScreen'

export class SecondStageWrapper extends React.PureComponent {

    constructor(props){
        super(props)
        this.state = {
            cur_set: 1,
            cur_match: 1,
            index: 0,
            cur_set_array:[],
            choices: [],
            cur_option: [],
            cur_set_categories: this.props.categories
        }
        this.setFlow = this.setFlow.bind(this)
    }


    getOptionForNextMatch(option1, option2, attr_chosen){
        let option_to_return = []
        for (let i = 0; i < 2; i++){
            if (!option1[i]){
                option_to_return = option1
                option_to_return[i] = attr_chosen
            }
            if (!option2[i]){
                option_to_return = option2
                option_to_return[i] = attr_chosen
            }
        }
        return (option_to_return)
    }

    findItemsToRemove(choices){
        for (let i = 0; i < 2; i++){
            if (choices.option1[i] === null){
                return (choices.option2)
            }
            if (choices.option2[i] === null){
                return (choices.option1)
            }
        }
    }

    setFlow(choices){
        this.setState({
            index: this.state.index + 1,
        })
        if (this.state.cur_match < constants.N_MATCHES){
            let new_cur_set_categories = this.state.cur_set_categories.map(array_item => 
                array_item.filter(item => 
                    (!this.findItemsToRemove(choices).includes(item))))
            let new_cur_array = this.state.cur_set_array.slice(0)
            new_cur_array.push(choices)
            this.setState({
                cur_match: this.state.cur_match + 1,
                cur_option: this.getOptionForNextMatch(choices.option1, choices.option2, choices.attr_chosen),
                cur_set_array: new_cur_array,
                cur_set_categories: new_cur_set_categories,
            })
        }
        else if (this.state.cur_set <= constants.N_SETS) {
            this.getOptionForNextMatch(choices.option1, choices.option2, choices.attr_chosen)
            this.state.cur_set_array.push(choices)
            let new_choices = this.state.choices.slice(0)
            new_choices.push(this.state.cur_set_array)
            this.setState({
                cur_match: 1,
                cur_set: this.state.cur_set + 1,
                cur_set_array: [],
                choices: new_choices,
                cur_set_categories: this.props.categories
            })
            this.props.setChoices(new_choices)
        }
        else {
            this.props.setChoices(this.state.choices)
        }
    }

    render(){
        return (
            <div>
                {(this.state.cur_set <= constants.N_SETS)? 
                <CompareTwoOptions
                key={this.state.index}
                index={this.state.index}
                cur_match={this.state.cur_match}
                cur_set={this.state.cur_set}
                categories={this.state.cur_set_categories}
                categories_to_choose={this.props.categories}
                cur_option={this.state.cur_option}
                setFlow={this.setFlow}>
                </CompareTwoOptions> :
                <ThankYouScreen/>}
            </div>
        )
    }

}

export default SecondStageWrapper