import React from 'react'
import * as constants from '../constants.js'
import ChooseOptions from './ChooseOptions';
import AddCustomItems from './AddCustomItems';
import RateOptions from './RateOptions';
import OverallRatings from './OverallRatings.js';
import DatabaseActions from './DatabaseActions.js';

export class FirstStageWrapper extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            flow: 1,
            category_index: 0,
            save_data: false,
            read_data: false
        }
        this.setFlow = this.setFlow.bind(this)
    }

    setFlow(){
        this.setState({flow: this.state.flow + 1})
    }

    setCategoryIndex(){
        if (this.state.category_index + 1 < this.props.categories.length){
            this.setState({
                category_index: this.state.category_index + 1,
                flow: 1,
            })
            this.props.setCategoryIndex()
        }
        else{
            this.props.setFlow()
        }
    }

    setCategory = () => {
        const names = [constants.CATEGORY_1, constants.CATEGORY_2]
        return (names[this.state.category_index])     
    }

    setSaveData = () => {
        this.setState({save_data: !this.state.save_data})
    }

    setReadData = () => {
        this.setState({read_data: !this.state.read_data})
    }

    saveData = () => {
        this.setSaveData()
        return (
            <DatabaseActions
            action={2}
            database_name={"client_categories"}
            item={this.props.client_categories}>
            </DatabaseActions>
        )
    }

    readData = () => {
        this.setReadData()
        return (
            <DatabaseActions
            action={1}
            index={this.state.category_index}
            database_name={"client_categories"}
            getDatabaseData={this.props.getDatabaseDataClientCategories}>
            </DatabaseActions>
        )
    }
    

    render() {
        let flow = this.state.flow
        return(
        <main>
        <div>
            {this.state.save_data ? this.saveData() : null}
            {this.state.read_data? this.readData() : null}
        </div>
        <div>  
      {(this.props.categories && flow === 1)?
      <ChooseOptions key={this.state.category_index} 
        categories={this.props.categories} 
        index={this.state.category_index}
        setCategories={this.props.setCategories}
        setCategory={this.setCategory}
        setSaveData={this.setSaveData}
        setFlow={this.setFlow}>
      </ChooseOptions> : null}
      </div>
      <div>
        {flow === 2?
        <AddCustomItems
        key={this.state.category_index}
        index={this.state.category_index}
        setCategory={this.setCategory}
        addParticipentOptions={this.props.addParticipentOptions}
        numCategories={this.props.categories.length}
        maxId={this.props.max_id}
        setSaveData={this.setSaveData}
        setReadData={this.setReadData}
        setFlow={this.setFlow}>
        </AddCustomItems> : null}
      </div>
      <div>{(flow === 3 && this.props.categories)?
      <RateOptions
      key={this.state.category_index}
      index={this.state.category_index}
      max_id={this.props.max_id}
      categories={this.props.client_categories}
      setCategories={this.props.setCategories}
      setFlow={this.setFlow} >
      </RateOptions> : null}
      </div>
      <div>
        {(flow === 4 && this.props.categories)?
       <OverallRatings
       key={this.state.category_index}
       index={this.state.category_index}
       categories={this.props.client_categories}
       setCategories={this.props.setCategories}
       client_categories={this.props.client_categories}
       setFlow={this.setFlow}>
       </OverallRatings>: null}
      </div>
      <div>
          {flow === 5? this.setCategoryIndex(): null}
      </div>
        </main>)
    }
}

export default FirstStageWrapper