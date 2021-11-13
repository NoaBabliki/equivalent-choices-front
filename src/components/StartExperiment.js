import React from 'react'
import '../App.css'

const CLASS_NAME_WELCOME = 'title-1'
const CLASS_NAME_INSTRUCTIONS = 'title-2'
const INSTRUCTIONS_TITLE = 'Instructions'

export class StartExperiment extends React.PureComponent {
    constructor(props){
        super(props)
        this.state = {
            page: 1,
        }
    }

    showPage = (title, instructions, className) => {
        return(
            <div>
            <h1 className={className}>{title}</h1>
            <h2 className='instructions'>{instructions}</h2>
            <h2 className='continue'>Press the 'next' button to continue</h2>
            {this.nextButton()}
            </div>
        )
    }

    nextButton = () => {
        return (
            <button className='next-button' onClick={() => {this.nextButtonAction()}}>next</button>
        )
    }

    nextButtonAction = () => {
        this.setState({page: this.state.page + 1})
        if (this.state.page === 3){
            this.props.setFlow()
        }

    }
    
    render(){
        return (
            <div>
                {(this.props.flow === 3 && this.state.page === 1)?
                this.setState({page: this.state.page + 1}) :
                this.state.page === 1?
                this.showPage(this.props.first_title, '', CLASS_NAME_WELCOME) : 
                this.state.page === 2?
                this.showPage(this.props.second_title, '', CLASS_NAME_WELCOME) : 
                this.state.page === 3?
                this.showPage(INSTRUCTIONS_TITLE, this.props.instructions, CLASS_NAME_INSTRUCTIONS) :
                null}
            </div>
        )
    }
}

export default StartExperiment