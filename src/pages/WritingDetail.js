import './Writing.css';
import {
    Link,
    useLocation
} from "react-router-dom";
import PostPreview from '../component/PostPreview';
import { fetchPosts } from '../assets/js/data';
import routes from '../assets/js/routes';
import Promote from '../component/Promote';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const posts = fetchPosts();

function fetchDetailContent(id) {
    for(let post of posts) {
        if(post.id === Number(id)) return post;
    }
}

export default function WritingDetail() {
    const query = useQuery();
    const content = fetchDetailContent(query.get("writing"));
    const preview = posts.length < 5 ? posts: posts.splice(0, 5);

    return (
        <div className="ds-writing ds-align-left">
            <div className="ds-m-4">
                <div className="ds-container ds-mt-4">
                    <div className="ds-row">
                        <div className="ds-col-8 ds-mr-5 ds-p-5 txt-writing">
                            <h1 className="prev-title">{content.title}</h1>
                            <div className="txt-subheader">
                                {content.description}
                            </div>
                            <hr className="ds-hr ds-mt-5 ds-mb-5"></hr>
                            <div className="ds-mt-3 ds-mb-4 ds-align-center">
                                <img alt="preview of the writing" 
                                    className="ds-writing-highlight" src={content.highlight}></img>
                            </div>
                            <div>
                                {content.text}
                            </div>
                        </div>
                        {/* <div className="ds-col-1"></div> */}
                        <div className="ds-col-3 ds-ml-5 ds-p-2 txt-subheader">
                            <div>
                                <Promote></Promote>
                            </div>
                            <div className="ds-m-3">
                                See other posts  
                            </div>
                            {preview.map((post, index) => (
                                <div className="ds-mt-5 ds-side-title" key={post.id}>  
                                    <Link 
                                        className={routes.writing[0].class}
                                        to={`${routes.writing[0].path}?writing=${post.id}`}
                                        exact={routes.writing[0].exact.toString()} >
                                            <PostPreview data={post}/>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}