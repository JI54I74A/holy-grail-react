import React from 'react';
import {PlusMinus,Data} from '../App';

function Header(props) {
    return (
        <>
        <header>
            <PlusMinus section="header" handle={props.handle} />
            <div className="section">Header:{props.data.header}</div>
            <Data data={props.data} />
        </header>
        </>
    )
}

export default  Header//{ Header, PlusMinus, Data}