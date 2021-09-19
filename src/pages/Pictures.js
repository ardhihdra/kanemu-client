import React from 'react';
import logo from '../assets/img/logo/logo-horizontal.png';
import img1 from '../assets/img/products-real/thai_tea.jpg';
import img2 from '../assets/img/products-real/green_tea.jpg';
import img3 from '../assets/img/products-real/chocolate.jpg';
import img4 from '../assets/img/products-real/milktea.jpg';
import img5 from '../assets/img/products-real/honey_lemon.jpg';
import './Pictures.css';

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
        const productDescription = {
        }
        return (
            <div className="ds-pictures">
                <img src={logo} className="App-logo" alt="logo" />
                <div className="txt-header ds-pb-5">Produk Kami</div>
                <div className="txt-subheader"></div>
                <div className="ds-container">
                    <div className="ds-row ds-m-auto">
                        {this.state.fetchedImages.map((img, idx) => (
                            <div className="ds-col-6 ds-mb-5">
                                <div className="txt-subheader">Minuman A</div>
                                <a href="/" onClick={this.expandImage.bind(this, img)}>
                                    <img src={img.img} alt="content" className="post-img" style={{'objectFit': 'contain'}}/>
                                </a>
                                <div className="ds-border ds-p-3" style={productDescription}>Description alflasdkfj</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="ds-modal">
                    {FullPreview}
                </div>
            </div>   
        )
    }
}