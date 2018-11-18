import React from 'react';
import Modal from 'react-modal';

const OptionModal = (props) => (
    <Modal isOpen={!!props.selectedOption} 
        contentLabel="Selected Option"
        onRequestClose={props.handleClearSelectedOption}
    >
        <h2>Selected Option:</h2>
        {props.selectedOption && <p>{props.selectedOption}</p>}
        <button onClick={props.handleClearSelectedOption}>Close</button>
    </Modal>
);

export default OptionModal;