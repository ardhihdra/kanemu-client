import logo from '../assets/img/logo/logo-horizontal.png';
import OrderForm from './OrderForm';
import ig from '../assets/img/028-instagram.png';
import wa from '../assets/img/041-whatsapp.png';
import './Home.css';

export default function Home() {


    return (
        <div className="pages-container">
            <img src={logo} className="App-logo" alt="logo" />
            <div className="txt-header ds-pb-5">Ramah di Harga, Mewah di Rasa!</div>
            <div className="ds-border form-container ds-shadow ds-p-3">
                <OrderForm/>
            </div>
            <div className="txt-subheader contact-info ds-pt-6">
                <div className="contact-flex">
                    <img className="logo" alt="instagram" src={ig}></img>
                    <div className="grow2 ds-ml-3">Follow us : kanemufreshdrink.id</div>
                    <img className="logo ds-ml-2" alt="whatsapp" src={wa}></img>
                    <div className="grow2 ds-ml-3">Order. Info & Kemitraan <br/>+62 896 62362510</div>
                </div>
                <div className="ds-m-6 hashtag">
                    #menemuKANEMU #KANEMUan #menyegarKANEMU
                </div>
            </div>
        </div>
    )
}