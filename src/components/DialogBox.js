import { useState } from 'react'
import '../App.css'

const QUESTION = 'Are the options equivalent now?'
const OPTION_1 = 'Yes, they are approximately the same'
const OPTION_2 = 'I still highly prefer option 1'
const OPTION_3 = 'I still highly prefer option 2'

const DialogBox = (props) => {

    const [answer, setAnswer] = useState(0)
    const [disable, setDisable] = useState(true)

    const onChange = (value) => {
        setAnswer(value)
        setDisable(false)
    }

    return (
        <div className='dialog-box'>
            <label className='option-title'>{QUESTION}</label>
            <div>
                <input type="radio" checked={answer === 1} className="radio-option" onChange={()=>{onChange(1)}}/> 
                <label className="radio-title"> 
                {<button className='button-dialog' onClick={()=> {onChange(1)}}>{OPTION_1}</button>} 
                </label>
                <div className='under'></div>
                <input type="radio" checked={answer === 2} className="radio-option" onChange={()=>{onChange(2)}}/>
                <label className="radio-title"> 
                {<button className='button-dialog' onClick={()=> {onChange(2)}}>{OPTION_2}</button>} 
                </label>
                <div className='under'></div>
                <input type="radio" checked={answer === 3} className="radio-option" onChange={()=>{onChange(3)}}/>
                <label className="radio-title"> 
                {<button className='button-dialog' onClick={()=> {onChange(3)}}>{OPTION_3}</button>} 
                </label>
            </div>
            <button className='confirm-button' disabled={disable} onClick={()=>{props.save_answer(answer)}}>Confirm</button>
        </div>
    )
}

export default DialogBox