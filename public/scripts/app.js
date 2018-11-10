'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndecisionApp = function (_React$Component) {
    _inherits(IndecisionApp, _React$Component);

    function IndecisionApp(props) {
        _classCallCheck(this, IndecisionApp);

        // bind methods
        var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

        _this.handleDeleteOptions = _this.handleDeleteOptions.bind(_this);
        _this.handlePick = _this.handlePick.bind(_this);
        _this.handleAddOption = _this.handleAddOption.bind(_this);
        _this.handleDeleteOption = _this.handleDeleteOption.bind(_this);
        _this.state = {
            options: []
        };
        return _this;
    }
    // fires immediately after the component is mounted (inserted into the tree), on page refresh and first page load


    _createClass(IndecisionApp, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            // check for json validation
            try {
                // gets key's values that has been stored
                var json = localStorage.getItem('options');
                // temporary test
                console.log('json in componentDidMount: ' + json);
                // change the string representation into a true js object
                var options = JSON.parse(json);

                if (options) {
                    // update the state
                    this.setState(function () {
                        return { options: options };
                    });
                }
            } catch (e) {
                // Do nothing
            }
        }
        // fires on every update

    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            // if the previous state has different length than current one, save the data
            if (prevState.options.length !== this.state.options.length) {
                // convert the true javascript into a string
                var json = JSON.stringify(this.state.options);
                // temporary test
                console.log('json in componentDidUpdate: ' + json);
                //adds the key to the storage
                localStorage.setItem('options', json);
            }
        }
    }, {
        key: 'handleDeleteOptions',
        value: function handleDeleteOptions() {
            // set options array to an empty array
            this.setState(function () {
                return { options: [] };
            });
        }
    }, {
        key: 'handleDeleteOption',
        value: function handleDeleteOption(optionToRemove) {
            this.setState(function (prevState) {
                return {
                    //filter out the optionToRemove from the options array and return the new array that doesnt contain optionToRemove
                    options: prevState.options.filter(function (option) {
                        return optionToRemove !== option;
                    })
                };
            });
        }
    }, {
        key: 'handlePick',
        value: function handlePick() {
            // get the random number between zero and the number of options together
            var randNumber = Math.floor(Math.random() * this.state.options.length);
            // get an option that has a number index generated above
            var option = this.state.options[randNumber];
            // display picked option
            alert(option);
        }
    }, {
        key: 'handleAddOption',
        value: function handleAddOption(option) {
            // validation check
            // if there is no option, show this message
            if (!option) {
                return "Enter valid value to add item";
            } // if option that has been typed in already exists in the options array, show this message
            else if (this.state.options.indexOf(option) > -1) {
                    return "This option already exist";
                } else {
                    // otherwise add the option to the options array without direct manipulation of the state object (used concat() instead of push())
                    this.setState(function (prevState) {
                        return { options: prevState.options.concat(option) };
                    });
                }
        }
    }, {
        key: 'render',
        value: function render() {
            var subtitle = "Put your life in the hands of a computer";
            return React.createElement(
                'div',
                null,
                React.createElement(Header, { subtitle: subtitle }),
                React.createElement(Action, { handlePick: this.handlePick, hasOptions: this.state.options.length > 0 }),
                React.createElement(Options, { options: this.state.options, handleDeleteOptions: this.handleDeleteOptions, handleDeleteOption: this.handleDeleteOption }),
                React.createElement(AddOption, { handleAddOption: this.handleAddOption })
            );
        }
    }]);

    return IndecisionApp;
}(React.Component);

var Header = function Header(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            props.title
        ),
        props.subtitle && React.createElement(
            'h2',
            null,
            props.subtitle
        )
    );
};
// set default props for the title if it hasnt been passed in
Header.defaultProps = {
    title: "Indecision App"
};

var Action = function Action(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            { disabled: !props.hasOptions, onClick: props.handlePick },
            'What should I do?'
        )
    );
};

var Options = function Options(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            { onClick: props.handleDeleteOptions },
            'Remove All'
        ),
        props.options.length === 0 && React.createElement(
            'p',
            null,
            'Please add an option to get started!'
        ),
        props.options.map(function (option) {
            return React.createElement(Option, { key: option, optionText: option, handleDeleteOption: props.handleDeleteOption });
        })
    );
};

var Option = function Option(props) {
    // temporary styling
    var style = {
        display: "inline",
        color: "green"
    };

    return React.createElement(
        'div',
        null,
        React.createElement(
            'p',
            { className: 'option', style: style },
            props.optionText
        ),
        React.createElement(
            'button',
            { onClick: function onClick(e) {
                    props.handleDeleteOption(props.optionText);
                } },
            'Remove'
        )
    );
};

var AddOption = function (_React$Component2) {
    _inherits(AddOption, _React$Component2);

    function AddOption(props) {
        _classCallCheck(this, AddOption);

        // bind the method
        var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

        _this2.handleAddOption = _this2.handleAddOption.bind(_this2);
        // set default value for the error
        _this2.state = {
            error: undefined
        };
        return _this2;
    }

    _createClass(AddOption, [{
        key: 'handleAddOption',
        value: function handleAddOption(e) {
            // prevent default page refresh
            e.preventDefault();
            // remove unnecessary whitespaces
            var option = e.target.elements.option.value.trim();
            // get the value that is comming from the parent
            var error = this.props.handleAddOption(option);
            // set the sate to the variable that holds the value from the parent component
            this.setState(function () {
                return { error: error };
            }); // same as error: error
            // clear the input after adding an option, if there was no error
            if (!error) {
                e.target.elements.option.value = '';
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'form',
                    { onSubmit: this.handleAddOption },
                    this.state.error && React.createElement(
                        'p',
                        null,
                        this.state.error
                    ),
                    React.createElement('input', { type: 'text', name: 'option' }),
                    React.createElement(
                        'button',
                        null,
                        'Add Option'
                    )
                )
            );
        }
    }]);

    return AddOption;
}(React.Component);

ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById('app'));
