import ReactionComponent from '../src/EmojiApp';
function Example() {

    return <>
        <div className="img-container">
            <div className="profile-container">

                <img id="dpimg" src="/dp.jpeg" alt="" />
                <span id="profile-name">SriRaman</span>
            </div>
            <img id="imgOne" src="/nature.jpeg" alt="" />

        </div>
        <ReactionComponent />

    </>
}
export default Example;