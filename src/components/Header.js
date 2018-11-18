import React from 'react';

const Header = (props) => (
    <div>
        <h1>{props.title}</h1>
        {/* display the paragraph only if there is subtitle passed */}
        {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
);
// set default props for the title if it hasnt been passed in
Header.defaultProps = {
    title: "Indecision App"
};

export default Header;