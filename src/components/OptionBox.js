import * as constants from '../constants'
import '../App.css'
import 'react-slidedown/lib/slidedown.css'
import SelectOptionTable from './SelectOptionTable'


const OptionBox = (props) => {


    const showSlider = (title, index) => {
        return(
            <SelectOptionTable
            category={props.categories[index]}
            index={props.index}
            title={title}
            default_msg={props.default_msg}
            disable={props.disable}
            handleSubmit={props.handleSubmit}/>
        )
    }

    const showAttr = (attr, title) => {
        return (
            <label className='option-attr'>{title}: {attr.name}</label>
        )
    }

    const showBox = () => {
        return (
            <div className='box'>
                <label className='option-title'>Option {props.index}</label>
                {props.attr1? showAttr(props.attr1, constants.CATEGORY_1_SINGULAR): showSlider(constants.CATEGORY_1_SINGULAR, 0)}
                {props.attr2? showAttr(props.attr2, constants.CATEGORY_2_SINGULAR): showSlider(constants.CATEGORY_2_SINGULAR, 1)}
                
            </div>
        )
    }


    return (
        <div>
            {showBox()}
        </div>
    )

}

export default OptionBox