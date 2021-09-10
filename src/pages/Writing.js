import PostPreview from '../component/PostPreview';
import FutureFeature from '../component/FutureFeature';
import routes from '../assets/js/routes';
import { fetchPosts } from '../assets/js/data';
import {
    Link,
} from "react-router-dom";

import './Writing.css';

export default function Writing() {
    return (
        <div className="ds-writing">
            <div className="ds-m-4">
                <h3>Unimportant thought</h3>
                <div className="txt-subheader">
                    Writings, just in case that I want to look back & laugh at myself
                    <br/>
                    {/* <br/>Altough less people see it but it's fine because that it's just for people that care ^^ */}
                </div>
            </div>
            <div>
                <div className="ds-container">
                    <div className="ds-row">
                        <div className="ds-col-3">
                            {/* Side Menu */}
                            <FutureFeature description="There will be some filtering here!"/>
                        </div>
                        <div className="ds-col-9 ds-m-1 ds-ml-5 ds-align-left">
                            <div className="ds-row">
                                {fetchPosts().map((post, index) => (
                                    <div className="ds-col-4" key={post.id}>    
                                        <Link 
                                            className={routes.writing[0].class}
                                            to={`${routes.writing[0].path}?writing=${post.id}&title=${post.title}&description=${post.description}&text=${post.text}&highlight=${post.highlight}`}
                                            // 
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
        </div>
    )
}