import React from 'react';

const Option = (props) => (
    <div>
        <p className="option">{props.optionText}</p>
        {/* call a function to get the optionText value instead of the whole object */}
        <button onClick={(e) => {props.handleDeleteOption(props.optionText)}}>Remove</button>
    </div>
);

export default Option;