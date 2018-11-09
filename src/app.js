class IndecisionApp extends React.Component {
    constructor(props){
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            options: []
        };
    }

    handleDeleteOptions(){
        this.setState(() => {
            return {
                // clear the whole options array
                options: []
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
        } // otherwise add the option to the options array without direct manipulation of the state object (used concat() instead of push())
        else {
            this.setState((prevState) => {
                return {
                    options: prevState.options.concat(option)
                };
            });
        }
    };

    render() {
        const subtitle = "Put your life in the hands of a computer";
        return (
            <div>
                <Header title="Indecision App" subtitle={subtitle}/>
                <Action handlePick={this.handlePick} hasOptions={this.state.options.length > 0}/>
                <Options options={this.state.options} handleDeleteOptions={this.handleDeleteOptions}/>
                <AddOption handleAddOption={this.handleAddOption}/>
            </div>
        );
    }
}

class Header extends React.Component {
    render(){
        return (
            <div>
                <h1>{this.props.title}</h1>
                <p>{this.props.subtitle}</p>
            </div>
        );
    }
}


class Action extends React.Component {
    render(){
        return(
            <div>
                {/* if there is no options then disable the button */}
                <button disabled={!this.props.hasOptions} onClick={this.props.handlePick}>What should I do?</button>
            </div>
        );
    }
}

class Option extends React.Component {
    render() {
        return (
            <div>
                <p>{this.props.optionText}</p>
            </div>
        );
    }
}


class Options extends React.Component {
    render() {
        return (
            <div>
                <button onClick={this.props.handleDeleteOptions}>Remove All</button>
                {
                    this.props.options.map((option) => <Option key={option} optionText={option}/>)
                }
            </div>
        );
    }
}

class AddOption extends React.Component {
    constructor(props){
        super(props);
        // bind the method
        this.handleAddOption = this.handleAddOption.bind(this);
        // set default value for the error
        this.state = {
            error: undefined
        }
    }

    handleAddOption(e) {
        // prevent default page refresh
        e.preventDefault();
        // remove unnecessary whitespaces
        const option = e.target.elements.option.value.trim();
        // get the value that is comming from the parent
        const error = this.props.handleAddOption(option);

        this.setState(() => {
            return {
                // set the sate to the variable that holds the value from the parent component
                error // same as error: error
            };
        });
        // clear the input after adding an option
        e.target.elements.option.value = '';
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


ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
