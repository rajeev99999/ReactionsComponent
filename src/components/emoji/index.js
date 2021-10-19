
import { useGlobalContext } from '../../context';

function Emoji({ title, link, id, hover = false, width = '40px', reactionClickHandle, removeReactionHandle }) {

    const { active, userReactionId } = useGlobalContext();
    const iconStyles = {
        transition: 'all 0.2s',
        transform: hover ? 'translateY(-2px) scale(1.2)' : 'translateY(0px) scale(1)',
        transformOrigin: 'bottom',
        width: width,
        height: '32px',
        margin: '2px',
        fontSize: hover ? '32px' : '16px',

    };
    const iconNameStyles = {
        background: '#161616',
        color: 'white',
        padding: '12px 16px',
        fontSize: '12px',
        borderRadius: '2px',
        position: 'absolute',
        top: '-30px',
        alignItems: 'center',
        left: 'calc(15% - 16px)',
        textAlign: 'center',
        opacity: hover ? 1 : 0,
        transform: hover ? 'translateY(-6px)' : 'translateY(0px)',
        transition: 'all 0.1s',
        marginBottom: hover ? '5px' : '2px'
    };
    const onUserReactionClick = (e) => {

        return active ? removeReactionHandle(e, userReactionId, id) : reactionClickHandle(id);
    }
    return (
        <div>
            <span style={iconNameStyles}>{title}</span>
            <p style={iconStyles} onClick={onUserReactionClick}>{link}</p>
        </div>
    );
}


export default Emoji;