import React from 'react';
import {PlusMinus,Data} from '../App';

function Right(props) {
    return (
        <>
        <aside>
            <PlusMinus section="right" handle={props.handle} />
            <div className="section">Right:{props.data.right}</div>
            <Data data={props.data} />
        </aside>
        </>
    )
}

export default Right //{ Right, PlusMinus, Data}