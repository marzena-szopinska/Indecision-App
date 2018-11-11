import React from 'react';
import AddOption from './AddOption';
import Header from './Header';
import Action from './Action';
import Options from './Options';

class IndecisionApp extends React.Component {
    constructor(props){
        super(props);
        // bind methods
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.state = {
            options: []
        };
    }
    // fires immediately after the component is mounted (inserted into the tree), on page refresh and first page load
    componentDidMount() {
        // check for json validation
        try {
            // gets key's values that has been stored
            const json = localStorage.getItem('options');
            // temporary test
            console.log(`json in componentDidMount: ${json}`);
            // change the string representation into a true js object
            const options = JSON.parse(json);

            if(options) {
                // update the state
                this.setState(() => ({ options: options }));
            }

        } catch (e) {
            // Do nothing
        }
    }
    // fires on every update
    componentDidUpdate(prevProps, prevState) {
        // if the previous state has different length than current one, save the data
        if(prevState.options.length !== this.state.options.length){
            // convert the true javascript into a string
            const json = JSON.stringify(this.state.options);
             // temporary test
            console.log(`json in componentDidUpdate: ${json}`);
            //adds the key to the storage
            localStorage.setItem('options', json);
        }
    }

    handleDeleteOptions(){
        // set options array to an empty array
        this.setState(() => ({ options: [] }));
    };

    handleDeleteOption(optionToRemove) {
        this.setState((prevState) => {
            return {
                //filter out the optionToRemove from the options array and return the new array that doesnt contain optionToRemove
                options: prevState.options.filter((option) => {
                    return optionToRemove !== option;
                })
            };
        });
    };

    handlePick() {
        // get the random number between zero and the number of options together
        const randNumber = Math.floor(Math.random() * this.state.options.length);
        // get an option that has a number index generated above
        const option = this.state.options[randNumber];
        // display picked option
        alert(option);
    };

    handleAddOption(option) {
        // validation check
        // if there is no option, show this message
        if(!option){
            return "Enter valid value to add item";
        } // if option that has been typed in already exists in the options array, show this message
        else if(this.state.options.indexOf(option) > -1){
            return "This option already exist";
        } 
        else {
            // otherwise add the option to the options array without direct manipulation of the state object (used concat() instead of push())
            this.setState((prevState) => ({ options: prevState.options.concat(option)}));
        }
    };

    render() {
        return (
            <div>
                <Header subtitle={"Put your life in the hands of a computer"}/>
                <Action handlePick={this.handlePick} hasOptions={this.state.options.length > 0}/>
                <Options options={this.state.options} handleDeleteOptions={this.handleDeleteOptions} 
                handleDeleteOption={this.handleDeleteOption}/>
                <AddOption handleAddOption={this.handleAddOption}/>
            </div>
        );
    }
}

export default IndecisionApp;