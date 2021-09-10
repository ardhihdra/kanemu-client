import logo from '../logo.svg';
import FutureFeature from '../component/FutureFeature';

export default function Home() {
    return (
        <div>
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                Edit <code>src/App.js</code> and save to reload.
            </p>
            <FutureFeature></FutureFeature>
        </div>
    )
}