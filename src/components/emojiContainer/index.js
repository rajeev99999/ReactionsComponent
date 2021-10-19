import React, { useState } from 'react';
import Emoji from '../emoji';


function EmojiContainer({ index, img, id, title, show = false, onUpdate, reactionClickHandle, removeReactionHandle }) {

    const [hover, setHover] = useState(false);
    const delay = index / 20 + 0.2;

    const clicked = (id) => {

        onUpdate(id);
    }

    const hovering = (hoverState) => {
        setHover(hoverState)
    }

    const divStyles = {
        position: 'relative',
        display: 'inline-block',
        padding: '6px 4px 0px',
        transition: `transform 0.2s ${delay}s cubic-bezier(.76,.26,.28,1.4), opacity 0.1s ${delay}s`,
        transform: show ? 'translateY(0px) scale(1)' : 'translateY(30px) scale(0.8)',
        opacity: show ? 1 : 0,
        cursor: 'pointer'
    };
    return (
        <li style={divStyles}
            onClick={() => clicked(id)}
            onMouseEnter={() => hovering(true)}
            onMouseLeave={() => hovering(false)}>
            <Emoji index={index} link={img} id={id} title={title} hover={hover} reactionClickHandle={reactionClickHandle} removeReactionHandle={removeReactionHandle} />
        </li>
    )

}


export default EmojiContainer;
