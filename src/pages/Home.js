import logo from '../assets/img/logo/logo-horizontal.png';
import OrderForm from './OrderForm';
import './Home.css';

export default function Home() {


    return (
        <div>
            <img src={logo} className="App-logo" alt="logo" />
            <div className="txt-header ds-pb-5">Order Now!</div>
            <div className="ds-border form-container ds-shadow ds-p-3 ds-pt-6">
                <OrderForm/>
            </div>
        </div>
    )
}