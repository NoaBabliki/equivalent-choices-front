import React from 'react'
import '../App.css'
import RateSingleOption from './RateSingleOption';


export class RateSingleOptionWrapper extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            disable_next_button: true,
            cur_rating: 0,
        }
        this.ratingChange = this.ratingChange.bind(this)
    }

    main(){
        return(
            <div>
                {this.instructions()}
                <RateSingleOption
                key={this.props.option.id}
                option={this.props.option}
                ratingChange={this.ratingChange}>
                </RateSingleOption>
            </div>
        )
    }

    ratingChange(value){
        this.setState({
            disable_next_button: false,
            cur_rating: value
        })
    }

    instructions(){
        return (
            <div>
            <h3 className='instructions'>What is your preference for</h3>
            <h3 className='category-name'>{this.props.option.name}</h3>
            <h3 className='instructions'>?</h3>
            </div>
        )
    }


    nextButtonAction(){
        let new_option = this.props.option
        new_option.rating = this.state.cur_rating
        this.props.next_option(new_option)
    }


    render() {
        return (
            <div>
            {this.props.option? this.main() : null}
            <button className='next-button' disabled={this.state.disable_next_button} 
                onClick={()=>{this.nextButtonAction()}}>next</button>
            </div>
        )
    }
}

export default RateSingleOptionWrapper