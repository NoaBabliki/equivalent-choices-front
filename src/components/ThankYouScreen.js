import '../App.css'

//also clear local storage
const ThankYouScreen = (props) => {

    return (
        <div>
            {localStorage.clear()}
            <h3 className='instructions'>Thank you for your participation! The ComDePri lab thanks you.</h3>
        </div>
    )

}

export default ThankYouScreen