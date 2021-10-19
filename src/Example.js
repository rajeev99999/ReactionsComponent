import ReactionComponent from '../src/EmojiApp';
function Example() {

    return <>

        <div className="img-container">

            <div className="center">
                <img id="dpimg" src="/dp.jpeg" alt="" />

                <div className="details">
                    <span className="profile-name">Rajeev</span>
                    <span id="post">Posted on: 12 Feb 2021</span>
                </div>
            </div>
            <div className="underline"></div>
            <img id="imgOne" src="/nature.jpeg" alt="" />


            <ReactionComponent />
        </div>


    </>
}
export default Example;