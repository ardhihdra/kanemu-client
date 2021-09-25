import logo from '../assets/img/logo/logo-horizontal.png';
import OrderForm from './OrderForm';
import ContactInfo from '../components/ContactInfo';
import './Home.css';

export default function Home() {
    return (
        <div className="pages-container">
            <img src={logo} className="App-logo" alt="logo" />
            <div className="txt-header ds-pb-5">Ramah di Harga, Mewah di Rasa!</div>
            <div className="ds-border form-container ds-p-3">
                <OrderForm/>
            </div>
            <div className="txt-subheader contact-info ds-pt-6">
                <ContactInfo />
            </div>
        </div>
    )
}