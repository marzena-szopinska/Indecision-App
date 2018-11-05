"use strict";

// JSX expression

var app = {
    title: "Indecision App",
    subtitle: "Put your life in the hands of a computer",
    options: []
};

var onFormSubmit = function onFormSubmit(e) {
    // stop full page refresh
    e.preventDefault();
    // grab the option that has been typed in
    // e.target - points to the element that the event started on
    var option = e.target.elements.option.value;
    // if there in an option the...
    if (option) {
        // push the option to the options array
        app.options.push(option);
        // clear the input
        e.target.elements.option.value = '';
        // rerender
        renderApp();
    }
};

var removeOptions = function removeOptions() {
    // remove all items from the options array
    app.options = [];
    // rerender
    renderApp();
};

var renderApp = function renderApp() {
    var template = React.createElement(
        "div",
        null,
        React.createElement(
            "h1",
            null,
            app.title
        ),
        app.subtitle && React.createElement(
            "p",
            null,
            app.subtitle + "!"
        ),
        React.createElement(
            "p",
            null,
            app.options.length > 0 ? "Here are your options:" : "No options"
        ),
        React.createElement(
            "p",
            null,
            app.options.length
        ),
        React.createElement(
            "button",
            { onClick: removeOptions },
            "Remove All"
        ),
        React.createElement(
            "ol",
            null,
            " ",
            app.options.map(function (option) {
                return React.createElement(
                    "li",
                    { key: option },
                    option
                );
            })
        ),
        React.createElement(
            "form",
            { onSubmit: onFormSubmit },
            React.createElement("input", { type: "text", name: "option" }),
            React.createElement(
                "button",
                null,
                "Add Option"
            )
        )
    );

    ReactDOM.render(template, document.getElementById('app'));
};

renderApp();
