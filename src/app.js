
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

    ReactDOM.render(template, document.getElementById('app'));
};

renderApp();