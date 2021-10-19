import React, { useState, useContext, useEffect } from 'react';
import { useCallback } from 'react'

const url = 'https://artful-iudex.herokuapp.com'
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('reactions')
    const [icons, setIcons] = useState([]);
    const [active, setActive] = useState(false);
    const [reaction, setReaction] = useState('Like');
    const [reactionId, setReactionId] = useState(0);
    const [userReactionId, setUserReactionId] = useState(0);
    const [reactionDetails, setReactiondetails] = useState({});
    const fetchData = useCallback(async () => {
        try {
            //console.log(`${url}/${searchTerm}`);
            const response = await fetch(`${url}/${searchTerm}`);
            const data = await response.json();


            if (data && searchTerm === 'reactions') {
                const newEmojis = data.map((item) => {
                    const { id, name, emoji } = item;

                    return { id, name, emoji }
                })

                setIcons(newEmojis);
            }
            else {
                setIcons([])
            }
            if (data && searchTerm === 'user_content_reactions') {
                const newData = data.reduce((total, item) => {
                    const { reaction_id } = item;
                    // console.log(reaction_id);
                    if (reaction_id === 1) total.Like[0] += 1;
                    else if (reaction_id === 2) total.Love[0] += 1
                    else if (reaction_id === 3) total.Haha[0] += 1
                    else if (reaction_id === 4) total.Wow[0] += 1
                    else if (reaction_id === 5) total.Sad[0] += 1
                    else total.Angry += 1
                    return total;
                }, {
                    Like: [0, '👍'],
                    Love: [0, '❤️'],
                    Haha: [0, '😂'],
                    Wow: [0, '😮'],
                    Sad: [0, '😥'],
                    Angry: [0, '😡']
                })
                setReactiondetails(newData);
                setSearchTerm('reactions')
            }

        }
        catch (error) {
            console.log(error)
        }
    }, [searchTerm])
    useEffect(() => {
        fetchData();
    }, [searchTerm, fetchData])
    return (
        <AppContext.Provider
            value={{ icons, searchTerm, setSearchTerm, active, setActive, reaction, setReaction, reactionId, setReactionId, userReactionId, setUserReactionId, reactionDetails }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }