import React from 'react'
import '../App.css'
import RateSingleOptionWrapper from './RateSingleOptionWrapper';

export class RateOptions extends React.Component{

    constructor(props){
        super(props)
        const data = this.props.categories[this.props.index].sort(function(){ return Math.random() - 0.5});
        const paginatedData = data.filter(item => item.id < this.props.max_id)
        const restOfData = data.filter(item => item.id >= this.props.max_id)
        this.state = {
            category_items: paginatedData,
            rest_of_data: restOfData,
            cur_option_index: 0,
        }
        this.nextOption=this.nextOption.bind(this)
    }

    nextOption(new_option){
        let new_category_items = this.state.category_items.slice(0)
        new_category_items[this.state.cur_option_index] = new_option
        let new_categpry_items_full = new_category_items.concat(this.state.rest_of_data)
        this.props.setCategories(new_categpry_items_full)
        if (this.state.cur_option_index + 1 < this.state.category_items.length){
            this.setState({
                category_items: new_category_items,
                cur_option_index: this.state.cur_option_index + 1
            })
        }
        else{
            this.props.setFlow()
        }
    }
    
    render(){
        return (
            <div>
                {this.state.category_items? <RateSingleOptionWrapper
                key={this.state.cur_option_index}
                option={this.state.category_items[this.state.cur_option_index]}
                next_option={this.nextOption}>
                </RateSingleOptionWrapper> : console.log('no categories')}
            </div>
        )
    }
}

export default RateOptions