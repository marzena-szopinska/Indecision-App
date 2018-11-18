import React from 'react';
import Modal from 'react-modal';

const OptionModal = (props) => {
    return (
        <Modal isOpen={props.selectedOption} contentLabel="Selected Option">
            <h2>OptionModal component</h2>
            {props.selectedOption && <p>{props.selectedOption}</p>}
            <button>Close</button>
        </Modal>
    )
};

export default OptionModal;