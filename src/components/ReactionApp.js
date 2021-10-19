import React, { useState } from 'react';
import EmojiContainer from '../components/emojiContainer';
import { useGlobalContext } from '../context';

export default function ReactionApp({ onUpdate, items, children }) {

    const [open, setOpen] = useState(false);
    const { setActive, reaction, setUserReactionId, setSearchTerm } = useGlobalContext();
    const width = items.length * 52;

    const toggleOpen = (openState) => {
        setOpen(openState);
    }
    const optionsStyles = {
        position: 'relative'
    };

    const reactionClickHandle = async (id) => {
        const response = await fetch('https://artful-iudex.herokuapp.com/user_content_reactions', {
            method: "POST",

            // Adding body or contents to send
            body: JSON.stringify({
                "user_id": 11,
                "reaction_id": id,
                "content_id": 1
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        const data = await response.json();

        setUserReactionId(data.id);
        setSearchTerm('user_content_reactions')
    }

    const removeReactionHandle = async (e, user_reactionid, id) => {

        const response = await fetch(`https://artful-iudex.herokuapp.com/user_content_reactions/${user_reactionid}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        });

        if (response.status === 200) {
            setActive(false);
            //setUserReactionId(data.id)
        }

        if (e.target.innerHTML !== reaction.emoji) {
            setActive(true);
            const newresponse = await fetch('https://artful-iudex.herokuapp.com/user_content_reactions', {
                method: "POST",

                // Adding body or contents to send
                body: JSON.stringify({
                    "user_id": 11,
                    "reaction_id": id,
                    "content_id": 1
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            const newdata = await newresponse.json();
            console.log(newdata);
            setUserReactionId(newdata.id);
            setSearchTerm('user_content_reactions')
        }

    }

    const elementsStyles = {
        listStyle: 'none',
        padding: 0,
        margin: 'auto',
        background: '#FFF',
        boxShadow: '0 0 0 1px rgba(0, 0, 0, .08), 0 2px 2px rgba(0, 0, 0, .15)',
        borderRadius: '30px',
        visibility: open ? 'visible' : 'hidden',
        opacity: open ? 1 : 0,
        transition: 'all 0.2s 0.2s',
        display: 'inline-block',
        position: 'absolute',
        width: `${width}px`,
        left: 0,
        bottom: 'calc( 100% + 4px )',
        zIndex: '9999',
    }
    const listIcons = items.map((item, i) => {
        return <EmojiContainer key={item.id} onUpdate={onUpdate} reactionClickHandle={reactionClickHandle}
            id={item.id} index={i} img={item.emoji} title={item.name} show={open} removeReactionHandle={removeReactionHandle}>
        </EmojiContainer>
    });
    return (
        <span style={optionsStyles}
            onMouseEnter={() => toggleOpen(true)}
            onMouseLeave={() => toggleOpen(false)} >
            <ul style={elementsStyles}>
                {listIcons}
            </ul>
            <div>
                {children}
            </div>
        </span>
    );
}