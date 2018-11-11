import React from 'react';

const Action = (props) => {
    return (
        <div>
            {/* if there is no options then disable the button */}
            <button disabled={!props.hasOptions} onClick={props.handlePick}>What should I do?</button>
        </div>
    );
};

export default Action;