import React, {useEffect, useState} from 'react';
import { Hint } from 'react-autocomplete-hint';
import '../App.css'

const InputAutoFill = (props) => {
 
    const [hintData, setHintData] = useState([])
    const [text, setText] = useState('')
    const [changed, setChanged] = useState(false)

    const getData = () => {
        const res = props.category
        var hintArray = []
        res.map(a => hintArray.push(a.name.toLowerCase()))
        if (hintData !== hintArray){
            setHintData(hintArray)
        }  
    }

    useEffect(()=> {
        if (hintData.length === 0){
            getData()
        }
    })

    const handleChange = (event) => {
        const cur_text = event.target.value
        setText(cur_text)
        if (hintData.includes(cur_text.toLowerCase())){
            let values = props.category.filter(item => item.name.toLowerCase() === cur_text.toLowerCase())
            props.handleSubmit(values[0])
            setChanged(true)
        }
        else if (changed){
            const default_msg = {
                id: -1,
                name: props.default_msg,
            }
            props.handleSubmit(default_msg)
            setChanged(false)
        }
    }

  
    return (
        <div>
            <label className='option-attr'>
            {props.title}:
            <div className='option-fill'>
                <Hint options={hintData} allowTabFill>
                <input className='input-with-hint'
                    value={text}
                    onChange={e => handleChange(e)}
                    disabled={props.disable}
                    />
                </Hint>
            </div>
            </label>
        </div>
      );

}

export default InputAutoFill