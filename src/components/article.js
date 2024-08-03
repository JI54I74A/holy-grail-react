import React from 'react';
import {App,PlusMinus,Data} from '../App';

function Article(props) {
    return (
        <>
        <article>
            <PlusMinus section="article" handle={props.handle} />
            <div className="section">Article:{props.data.article}</div>
            <Data data={props.data} />
        </article>
        </>
    )
}

export default Article //{ Article, PlusMinus, Data}