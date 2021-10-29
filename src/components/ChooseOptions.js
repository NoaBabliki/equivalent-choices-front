import React from 'react'
import '../App.css'
import * as constants from '../constants.js'

const INSTRUCTIONS_PART_1 = 'These are the options for'
const INSTRUCTIONS_PART_2 = 'you will be asked to rate:'
const INSTRUCTIONS_PART_3 = 'Please click on any option you don’t understand or have no preference for to replace it with a different one.'
const INSTRUCTIONS_PART_4 = 'After replacing options, press the next button to continue.'
const WARNING_MSG = 'No more alternatives to choose from.'

export class ChooseOptions extends React.PureComponent {
    constructor(props){
        super(props)
        const data = this.props.categories[this.props.index].sort(function(){ return Math.random() - 0.5});
        const paginatedData = data.slice(data.length - constants.MAX_CATEGORY_DISPLAY);
        const items_left = data.filter( ( item ) => !paginatedData.includes( item ) );
        this.state = {
            category: this.props.setCategory(),
            category_arr: paginatedData,
            category_to_add: items_left,
            category_catche: []
        }
    }


    setCategoryArray(to_remove){
        var to_remove_index = this.state.category_arr.findIndex(item => item === to_remove)
        var new_category_arr = this.state.category_arr.slice(0)
        new_category_arr[to_remove_index] = this.state.category_to_add[0]
        this.setState({category_arr: new_category_arr,
        category_catche: this.state.category_catche.concat([[to_remove, to_remove_index]]),
        category_to_add: this.state.category_to_add.slice(1)
        });
    }


    undo(){
        const to_undo = this.state.category_catche.pop()
        var new_category_arr = this.state.category_arr.slice(0)
        var old_value = new_category_arr[to_undo[1]]
        new_category_arr[to_undo[1]] = to_undo[0]
        this.setState({category_arr: new_category_arr,
            category_to_add: [old_value].concat(this.state.category_to_add),
            });     
    }


    undo_button(){
        var disable = false
        if (this.state.category_catche.length === 0){
            disable = true
        }
        return (
            <button onClick={() => {this.undo()}} disabled={disable}>Undo</button>
        )
    }

    removeButtonAction(obj){
        if (this.state.category_to_add.length > 0){
            this.setCategoryArray(obj)
        }
    }


    remove_button(obj){
        return (
            <button className='table-button' onClick={() => {this.removeButtonAction(obj)}}>{obj.name}</button>
        )
    }

    noMoreAlternativesMsg(){
        if (!this.state.category_to_add.length){
            return (<h4 className='warning'>{WARNING_MSG}</h4>)
        }   
    }


    createTable(){
        const n_cols = 4
        var two_d_data = []
        const category_arr_copy = this.state.category_arr.slice(0)
        while(category_arr_copy.length) two_d_data.push(category_arr_copy.splice(0,n_cols));
        return (
            <div>
            <table className='table-border'>
                    <tbody>
                {two_d_data.map((d, i)=> (
                    <tr key={i}>
                        {d.map((option, index) => this.showOption(option, index))}
                    </tr>))}
                    </tbody>
                </table>
                <div>
                    {this.noMoreAlternativesMsg()}
                </div>
                </div>
        )
    }

    showOption = (option, index) => {
        return (
            <td key={index}>{this.remove_button(option)}</td>
        )
    }

    nextButtonAction = () => {
        this.props.setCategories(this.state.category_arr)
        this.props.setFlow()  
    }

    showUndoButton = () => {
        return (
            <h3 className='instructions'>Press {this.undo_button()} to undo</h3>
        )
    }

   
    render() {
        return (
            <div>
                <h3 className='instructions'>{INSTRUCTIONS_PART_1}</h3>
                <h3 className='category-name'>{this.state.category}</h3>
                <h3 className='instructions'>{INSTRUCTIONS_PART_2}</h3>
                {this.props.categories ? this.createTable(): null}
                <h3 className='instructions'>{INSTRUCTIONS_PART_3}</h3>
                    {this.showUndoButton()}
                <h3 className='continue'>{INSTRUCTIONS_PART_4}</h3>
                <button className='next-button' onClick={()=>{this.nextButtonAction()}}>next</button>
            </div>
        )
    }
}

export default ChooseOptions