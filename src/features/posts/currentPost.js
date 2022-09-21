import { getPost } from "../../API/API";

export function CurrentPost(props){
    const data = [props.subreddit ,props.id]
    const post = getPost(data);

    return (
        <div>
            <h1>{props.id}</h1>
        </div>
    )
}