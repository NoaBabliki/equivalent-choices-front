import { useState } from "react"

const SelectOptionTable = (props) => {

    const shuffled_category = props.category.sort(function(){ return Math.random() - 0.5});

    const default_msg = {
        id: -1,
        name: props.default_msg,
    }

    const [chosen, setChosen] = useState(default_msg)
    const [show, setShow] = useState(false)
    const [margin, setMargin] = useState('') 

    const handleChange = (obj) => {
        if (chosen !== obj){
            setChosen(obj)
            props.handleSubmit(obj)
            setShow(false)
        }
    }

    function createTable(){
        const n_cols = 4
        var two_d_data = []
        const category_arr_copy = shuffled_category.slice(0)
        while(category_arr_copy.length) two_d_data.push(category_arr_copy.splice(0,n_cols));
        if ((props.index === 2) && (margin !== 'margin-op2')){
            setMargin('margin-op2')
        }
        else if ((props.index === 1) && (margin !== 'margin-op1')){
            setMargin('margin-op1')   
        }
        return (
            <div className='option-box'>
            <table className={'table-border ' + margin}>
                    <tbody>
                {two_d_data.map((d, i)=> (
                    <tr key={i}>
                        {d.map((option, index) => showOption(option, index))}
                    </tr>))}
                    </tbody>
                </table>
                </div>
        )
    }

    const showOption = (option, index) => {
        return (
            <td key={index}>{remove_button(option)}</td>
        )
    }

    function remove_button(obj){
        return (
            <button className='table-button' onClick={() => {handleChange(obj)}}>{obj.name}</button>
        )
    }
    
    return(
        <div>
        <label className='option-attr'>
            {props.title}:
        </label>
        <button className='radio-option' disabled={props.disable} onClick={()=>{setShow(!show)}}>{chosen.name}</button>
        {show? createTable(): null}
        </div>
    )
}

export default SelectOptionTable