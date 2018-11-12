import React from 'react';

export default class AddOption extends React.Component {
    // set default value for the error
    state = {
        error: undefined
    };

    handleAddOption = (e) => {
        // prevent default page refresh
        e.preventDefault();
        // remove unnecessary whitespaces
        const option = e.target.elements.option.value.trim();
        // get the value that is comming from the parent
        const error = this.props.handleAddOption(option);
         // set the sate to the variable that holds the value from the parent component
        this.setState(() =>({ error }));// same as error: error
        // clear the input after adding an option, if there was no error
        if(!error){
            e.target.elements.option.value = '';
        }
        
    }

    render(){
        return (
            <div>
                <form onSubmit={this.handleAddOption}>
                {/* show the message if there is an error message */}
                    {this.state.error && <p>{this.state.error}</p>}
                    <input type="text" name="option" />
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}

