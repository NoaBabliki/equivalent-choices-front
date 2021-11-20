import React from 'react';
import './App.css';
//import {createApiClient, createApiClientChoices} from './api'; //connection to server
import StartExperiment from './components/StartExperiment';
import * as constants from './constants.js'
import FirstStageWrapper from './components/FirstStageWrapper';
import SecondStageWrapper from './components/SecondStageWrapper';
import DatabaseActions from './components/DatabaseActions';


const FIRST_TITLE = 'Welcome'
const INTRODUCTION = 'Welcome to the equivalent choices experiment! Follow the instructions on the screen, and press the "next" button when you\'re done with the screen.'
const SECOND_TITLE_PART_1 = 'Part 1: what do you prefer?'
const SECOND_TITLE_PART_2 = 'Part 2: make the two options equal'
const INSTRUCTIONS_PART_1 = 'In this task, we ask you to rate your preferences in a given category. You will see different options in a given category. Please rate them one by one on a scale of 1-1000.'
const INSTRUCTIONS_PART_2 = 'In this task, we ask you to compare between two options, each including a ' + constants.CATEGORY_1_SINGULAR + ' and a ' + constants.CATEGORY_2_SINGULAR + '. At each screen, you will see two options and their attributes, with one attribute value missing. Please type in an attribute value that will make the two options equally preferred, from the pools of the first task.'


export type AppState = {
  flow: number,
  category_index: number,
  max_id: number,
  write_choices: boolean,
  client_catigories: object[][],
  categories: object[][],
  choices: object[][]
}

//const api = createApiClient()
//const apiChoices = createApiClientChoices()


export class App extends React.PureComponent<{}, AppState> {

 
  state: AppState = {
    flow: 1,
    category_index: 0,
    max_id: 1000,
    write_choices: false,
    client_catigories: [[],[]],
    categories: [[],[]],
    choices: []
	}

  getCategories(){
    if (this.state.client_catigories !== [[],[]]){
      return (this.state.client_catigories)
    }
    return this.state.categories
  }

 
  //from strig array to json array ---> save client data as json
  createOptions = (str_arr: string[], id_inc: number) => {
    let options_array = []
    for (let i = 0; i < str_arr.length; i++){
      let temp_option = {
        id: i + id_inc,
        name: str_arr[i],
        rating: 0,
      }
      options_array.push(temp_option)
    }
    return options_array
  }

  setCategoryIndex = () => {
    let add_to_index = 1
    if (this.state.category_index === add_to_index){
      add_to_index = -1
    }
    this.setState({
      category_index: this.state.category_index + add_to_index
    })
  }

  setCategories = async (newCategory: object[]) => {
    var new_client_categories = this.state.client_catigories.slice(0)
    new_client_categories[this.state.category_index] = newCategory
    this.setState({
      client_catigories: new_client_categories,
   //   categories: new_client_categories
    })
  }

  setFlow = () => {
    localStorage.setItem('flow', String(this.state.flow + 1));
    this.setState({
      flow: this.state.flow + 1
    })
  }

  addParticipentOptions = async (new_caterories: object[]) => {
    var new_client_categories = this.state.client_catigories.slice(0)
    new_client_categories[this.state.category_index] = new_client_categories[this.state.category_index].concat(new_caterories)
    this.setState({
      client_catigories: new_client_categories,
    //  categories: new_client_categories
    })

  }

setMaxCategoryId(){
  let max_id = constants.MAX_CATEGORY_DISPLAY
  if (this.state.categories){
    for (let category of this.state.categories){
      let temp_id = category.length
      if (temp_id > max_id){
        max_id = temp_id
      }
    }
  }
  this.setState({max_id: max_id})
}

setChoices = async (choices: object[][]) => {
  this.setState(
    {
      choices: choices,
      write_choices: true
    }
    )
 
}

writeChoices = () => {
  this.setState({write_choices: false})
  return (
    <div>
    <DatabaseActions
    action={2}
    database_name={"choices"}
    item={this.state.choices}>
    </DatabaseActions>
    </div>
  )
}

getDatabaseData = (data: object[], i:number) =>{
  if (this.state.categories[i].length === 0){
    const temp_categories = this.state.categories
    temp_categories[i] = data
    this.setState({
      categories: temp_categories
    })
    this.setMaxCategoryId()
  }
}

getDatabaseDataClientCategories = (data: object[], i:number)  => {
  if (this.state.client_catigories[i] !== data){
    const temp = this.state.client_catigories
    temp[i] = data
    this.setState({
      client_catigories: temp
    })
  }
}

getCategoriesFromFirebase = () => {
  return (
      <div>
        <DatabaseActions
            key={1}
            getDatabaseData={this.getDatabaseData}
            action={1}
            index={0}
            database_name={"0"}>
            </DatabaseActions>
            <DatabaseActions
            key={2}
            getDatabaseData={this.getDatabaseData}
            action={1}
            index={1}
            database_name={"1"}>
            </DatabaseActions>
        </div>
    )
}

writeClientCategoriesToDatabase = () => {
  return (
    <div>
      <DatabaseActions
      key={3}
      action={2}
      database_name={"client_categories"}
      item={this.state.client_catigories}>
      </DatabaseActions>
    </div>
  )
}

  render() {
    let title_2 = SECOND_TITLE_PART_1
    let instructions = INSTRUCTIONS_PART_1
    if (this.state.flow === 3){
      title_2 = SECOND_TITLE_PART_2
      instructions = INSTRUCTIONS_PART_2
    }
    return( 
    <main className='main'>
        <div>
        {this.getCategoriesFromFirebase()}
        {this.state.write_choices ? this.writeChoices() : null}
        </div>
      <div>
        {(this.state.flow === 1 || this.state.flow === 3)?
        <StartExperiment 
        first_title={FIRST_TITLE}
        second_title={title_2}
        instructions={instructions}
        introduction={INTRODUCTION}
        flow={this.state.flow}
        setFlow={this.setFlow}>
        </StartExperiment> : null}
      </div> 
      <div>
        {(this.state.flow === 2 && this.state.categories)?
        <FirstStageWrapper
        categories={this.state.categories}
        client_categories={this.state.client_catigories}
        max_id={this.state.max_id}
        instructions={INSTRUCTIONS_PART_1}
        setCategories={this.setCategories}
        addParticipentOptions={this.addParticipentOptions}
        setCategoryIndex={this.setCategoryIndex}
        getDatabaseDataClientCategories={this.getDatabaseDataClientCategories}
        setFlow={this.setFlow}>
        </FirstStageWrapper>
        : null}
      </div>
      <div>
        {this.state.flow === 3? this.writeClientCategoriesToDatabase() : null}
      </div>
      <div>
      {this.state.flow === 4?
       <SecondStageWrapper
       categories={this.state.client_catigories}
       setChoices={this.setChoices}>
       </SecondStageWrapper>
       :null}
      </div>   
    </main>
    )
  }

}

export default App;
