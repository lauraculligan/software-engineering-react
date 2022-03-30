import Tuits from "../tuits";
import * as service from "../../services/dislikes-service";
import {useEffect, useState} from "react";

const MyDisLikes = () => {
    const [dislikedTuits, setDisLikedTuits] = useState([]);
    const findTuitsIDisLike = () =>
        service.findAllTuitsDisLikedByUser("me")
            .then((tuits) => setDisLikedTuits(tuits));
    useEffect(findTuitsIDisLike, []);

    return(
        <div>
            <Tuits tuits={dislikedTuits} refreshTuits={findTuitsIDisLike}/>
        </div>
    );
};
export default MyDisLikes;