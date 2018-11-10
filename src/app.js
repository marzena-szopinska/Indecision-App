class IndecisionApp extends React.Component {
    constructor(props){
        super(props);
        // bind methods
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.state = {
            options: props.options
        };
    }
    // fires immediately after the component is mounted (inserted into the tree)
    componentDidMount() {
        // check for json validation
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);

            if(options) {
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
            const json = JSON.stringify(this.state.options);
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
        const subtitle = "Put your life in the hands of a computer";
        return (
            <div>
                <Header subtitle={subtitle}/>
                <Action handlePick={this.handlePick} hasOptions={this.state.options.length > 0}/>
                <Options options={this.state.options} handleDeleteOptions={this.handleDeleteOptions} handleDeleteOption={this.handleDeleteOption}/>
                <AddOption handleAddOption={this.handleAddOption}/>
            </div>
        );
    }
}
// set default options array - to empty
IndecisionApp.defaultProps = {
    options: []
};

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {/* display the paragraph only if there is subtitle passed */}
            {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    );
};
// set default props for the title if it hasnt been passed in
Header.defaultProps = {
    title: "Indecision App"
};

const Action = (props) => {
    return (
        <div>
            {/* if there is no options then disable the button */}
            <button disabled={!props.hasOptions} onClick={props.handlePick}>What should I do?</button>
        </div>
    );
};

const Options = (props) => {
    return (
        <div>
            <button onClick={props.handleDeleteOptions}>Remove All</button>
            {props.options.length ===0 && <p>Please add an option to get started!</p>}
            {
                props.options.map((option) => <Option key={option} optionText={option} handleDeleteOption={props.handleDeleteOption}/>)
            }
        </div>
    );
};


const Option = (props) => {
    // temporary styling
    let style = {
        display: "inline",
        color: "green"
    }

    return (
        <div>
            <p className="option" style={style}>{props.optionText}</p>
            {/* call a function to get the optionText value instead of the whole object */}
            <button onClick={(e) => {props.handleDeleteOption(props.optionText)}}>Remove</button>
        </div>
    );
};

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


ReactDOM.render(<IndecisionApp options={["do shopping"]}/>, document.getElementById('app'));
