import React, { useState } from 'react';
import { useGlobalContext } from './context'
import Reactions from '../src/components/ReactionApp'

export default function EmojiApp() {
    const { icons, active, setActive, setReaction, reactionId, setReactionId, reactionDetails } = useGlobalContext();
    //console.log(icons);

    const [activeReaction, setActiveReaction] = useState({});
    const likeStyle = `button ${reactionId} ${active ? '' : 'inactive'}`;

    const onUpdate = (id) => {
        let reaction = icons.filter(e => e.id === id)[0];
        setReaction(reaction);
        setReactionId(id);
        setActive(true);
        let icon = reaction.emoji;
        const obj = activeReaction;
        for (let i in obj) {
            obj[i] = false;
        }
        obj[icon] = true;

        setActiveReaction(obj)
    }
    const displayReactionsHandle = () => {
        let arr = [];
        for (let i in reactionDetails) {
            if (reactionDetails[i][0] > 0) {
                arr.push(`${reactionDetails[i][1]} . ${reactionDetails[i][0]}`)
            }

        }
        return arr;
    }
    return (
        <div >
            <div className="buttons">
                {active &&


                    displayReactionsHandle().map((item, index) => {
                        let isactive = activeReaction[String.fromCodePoint(item.codePointAt(0))];
                        //console.log(activeReaction[String.fromCodePoint(item.codePointAt(0))])


                        //else isactive = activeReaction[String.fromCodePoint(item.codePointAt(0))];
                        return <div className={`reaction-container ${isactive && 'border'}`} key={`${new Date().getTime()}${index}`} > {item}</div>
                    })

                }
                <Reactions onUpdate={onUpdate} items={icons}>
                    <button className={likeStyle}>

                        <img id="add-reaction" src="/reaction.jpg" alt="add reaction" />
                    </button>
                </Reactions>
            </div>
        </div>
    )
}