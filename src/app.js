
// JSX expression

const app = {
    title: "Indecision App",
    subtitle: "Put your life in the hands of a computer",
    options: []
};

const onFormSubmit = (e) => {
    // stop full page refresh
    e.preventDefault();
    // grab the option that has been typed in
    // e.target - points to the element that the event started on
    const option = e.target.elements.option.value;
    // if there in an option the...
    if(option){
        // push the option to the options array
        app.options.push(option);
        // clear the input
        e.target.elements.option.value = '';
        // rerender
        renderApp();
    }
};

const removeOptions = () => {
    // remove all items from the options array
    app.options = [];
    // rerender
    renderApp();
}

const onMakeDecision = () => {
    // get a random number between zero and a number of items
    const randNumber = Math.floor(Math.random() * app.options.length);
    // get the specific option
    const option = app.options[randNumber];
    alert(option);
}

const renderApp = () => {
    const template = (
        <div>
            <h1>{app.title}</h1>
            {app.subtitle && <p>{app.subtitle + "!"}</p>}
            <button disabled={app.options.length === 0} onClick={onMakeDecision}>What should I do?</button>
            <button onClick={removeOptions}>Remove All</button>
            <p>{app.options.length > 0 ? "Here are your options:" : "No options"}</p>
            <ol> {/* loop through the options array and turn it into array of li elements*/}
            {   app.options.map((option) => {
                    return <li key={option}>{option}</li>;
                })
            }
            </ol>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option" />
                <button>Add Option</button>
            </form>
        </div>
    );

};

class IndecisionApp extends React.Component {
    constructor(props){
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.state = {
            options: ["OptionOne", "OptionTwo", "OptionThree"]
        };
    }

    handleDeleteOptions(){
        this.setState(() => {
            return {
                // clear the whole options array
                options: []
            };
        });
    }

    handlePick() {
        // get the random number between zero and the number of options together
        const randNumber = Math.floor(Math.random() * this.state.options.length);
        // get an option that has a number index generated above
        const option = this.state.options[randNumber];
        // display picked option
        alert(option);
    }

    render() {
        const subtitle = "Put your life in the hands of a computer";
        return (
            <div>
                <Header title="Indecision App" subtitle={subtitle}/>
                <Action onPick={this.handlePick} hasOptions={this.state.options.length > 0}/>
                <AddOption />
                <Options options={this.state.options} onDeleteOptions={this.handleDeleteOptions}/>
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
                <button disabled={!this.props.hasOptions} onClick={this.props.onPick}>What should I do?</button>
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
                <button onClick={this.props.onDeleteOptions}>Remove All</button>
                {
                    this.props.options.map((option) => <Option key={option} optionText={option}/>)
                }
            </div>
        );
    }
}

class AddOption extends React.Component {
    addOption(e) {
        e.preventDefault();

        const option = e.target.elements.option.value.trim();

        if(option){
            alert('addOption method');
        }
    }

    render(){
        return (
            <div>
                <form onSubmit={this.addOption}>
                    <input type="text" name="option" />
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}


ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
