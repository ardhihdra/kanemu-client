import logo from '../assets/img/logo/logo-horizontal.png';
import FutureFeature from '../components/FutureFeature';
import './Home.css';

export default function Home() {
    return (
        <div>
            <img src={logo} className="App-logo" alt="logo" />
            <FutureFeature></FutureFeature>
        </div>
    )
}