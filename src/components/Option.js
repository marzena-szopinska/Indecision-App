import React from 'react';

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

export default Option;