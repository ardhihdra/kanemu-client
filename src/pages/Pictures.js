import './Pictures.css';
import img1 from '../assets/img/products-real/thai_tea.jpg';
import img2 from '../assets/img/products-real/green_tea.jpg';
import img3 from '../assets/img/products-real/chocolate.jpg';
import img4 from '../assets/img/products-real/milktea.jpg';
import img5 from '../assets/img/products-real/honey_lemon.jpg';
import React from 'react';

const fetchedImages = [
    {id: 1, img: img1}, {id:2, img:img2}, {id:3, img:img3}, {id: 4, img:img4}, {id:5, img:img5}, 
];

export default class Picture extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isFullPreview: false,
            fetchedImages: []
        };
    }

    async fetchPosts() {
        return fetchedImages;
    }

    expandImage(e, image) {
        // e.preventDefault();
        this.setState((state, props) => ({
            isFullPreview:  !state.isFullPreview
        }));
    }

    componentDidMount() {
        this.fetchPosts().then(response =>
            this.setState({
                fetchedImages: response
            })
        );

    }
  
    componentWillUnmount() {
    }

    render() {
        let FullPreview = <div></div>;
        if(this.state.isFullPreview) {
            FullPreview = <div>FullScreen</div>
        }    
        return (
            <div className="ds-pictures">
                <div className="ds-m-4">
                    <h4>How I see the world</h4>
                    <div className="txt-subheader">
                        I always think why we need to put our photos in those pink app ?
                        <br/>So I made up my own damn place ^^ 
                        {/* <br/>Altough less people see it but it's fine because that it's just for people that care ^^ */}
                    </div>
                </div>
                <div>
                    <div className="ds-container">
                        <div className="ds-row">
                            {this.state.fetchedImages.map((img, idx) => (
                                <div className="ds-col-6">
                                    <a href="/" onClick={this.expandImage.bind(this, img)}>
                                        <img src={img.img} alt="content" className="post-img" style={{'objectFit': 'contain'}}/>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="ds-modal">
                    {FullPreview}
                </div>
            </div>   
        )
    }
}