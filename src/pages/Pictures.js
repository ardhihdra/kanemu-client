import React from 'react';
import axios from 'axios';
import logo from '../assets/img/logo/logo-horizontal.png';
import img1 from '../assets/img/products-real/thai_tea.jpg';
import img2 from '../assets/img/products-real/green_tea.jpg';
import img3 from '../assets/img/products-real/chocolate.jpg';
import img4 from '../assets/img/products-real/milktea.jpg';
import img5 from '../assets/img/products-real/honey_lemon.jpg';
import './Pictures.css';

const MASTER_URL = process.env.REACT_APP_MASTER_URL

const fetchedImages = [
    {id: 1, img: img1, name: 'Thai Tea', description: 'Thai Tea dengan Jelly'}, 
    {id:2, img:img2, name: 'Green Thai Tea', description: 'Green Thai Tea dengan Jelly'}, 
    {id:3, img:img3, name: 'Milktea', description: 'Milktea dengan krim premium'}, 
    {id: 4, img:img4, name: 'Chocolate', description: 'Chocolate dengan krim premium'}, 
    {id:5, img:img5, name: 'Honey Lemon', description: 'Honey dengan Lemon tanpa gula tambahan'}, 
];

export default class Picture extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isFullPreview: false,
            fetchedImages: [],
            products: [],
            isLoaded: false
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
        axios.get(`${MASTER_URL}/master/products`)
        .then(response => {
            let result = response.data
            result.map(rs => {
                return rs
            })
            this.setState({
                isLoaded: true,
                products: result,
            });
        }, (error) => {
            this.setState({
                isLoaded: true,
                error
            });
        }).catch(function (error) {
            console.log(error);
        })

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
            <div className="pages-container">
                <img src={logo} className="App-logo" alt="logo" />
                <div className="txt-header ds-pb-5">Produk Kami</div>
                <div className="txt-subheader"></div>
                <div className="ds-row ds-ml-auto ds-mr-auto ds-mt-5">
                    {this.state.fetchedImages.map((img, idx) => (
                        <div className="ds-col-12 ds-mb-5">
                            <div className="txt-header"><h4>{img.name}</h4></div>
                            <a href="/" onClick={this.expandImage.bind(this, img)}>
                                <img src={img.img} alt="content" className="post-img" style={{'objectFit': 'contain'}}/>
                            </a>
                            <div className="ds-border ds-p-3 ds-m-5" style={productDescription}>{img.description}</div>
                        </div>
                    ))}
                </div>
                <div className="ds-modal">
                    {FullPreview}
                </div>
            </div>   
        )
    }
}