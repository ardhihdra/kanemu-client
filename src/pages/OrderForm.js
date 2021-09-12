import React from 'react';
import axios from 'axios';
import thaitea from '../assets/img/products/thai_tea.jpg';
import greentea from '../assets/img/products/green_tea.jpg';
import milktea from '../assets/img/products/milktea.jpg';
import chocolate from '../assets/img/products/chocolate.jpg';
import honey from '../assets/img/products/honey_lemon.jpg';

const MASTER_URL = process.env.REACT_APP_MASTER_URL

class OrderForm extends React.Component {
    constructor(props) {
        super(props);
        this.products_img = {
            'Thai Tea': thaitea,
            'Green Thai Tea': greentea,
            'Milktea': milktea,
            'Chocolate': chocolate,
            'Honey Lemon': honey,
        }
        this.products_price = {}
        this.state = {isLoaded: false, name: '', phone: '', maps: '', total: 0, products: []};
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount() {
        axios.get(`${MASTER_URL}/master/products`)
        .then(response => {
            let result = response.data
            let newState = {}
            result.map(rs => {
                this.products_price[rs.name] = rs.price
                newState[rs.name] = 0
                return rs
            })
            this.setState({
                isLoaded: true,
                products: result,
                ...newState
            });
        }, (error) => {
            this.setState({
                isLoaded: true,
                error
            });
        }).catch(function (error) {
            console.log(error);
        })
    }

    calcPrice(name, value) {
        let total = 0
        if(this.products_price[name]) {
            const diff = (value - (this.state[name] || 0)) * this.products_price[name]
            total = this.state.total + diff
        }
        return total
    }

    handleChange(event) {
        // console.log("diff price", this.state[event.target.name], event.target.value)
        const name = event.target.name
        const value = event.target.value
        const payload = {[name]: value}
        payload.total = this.calcPrice(name, value)

        this.setState(payload)
    }
  
    handleSubmit(event) {
        const data = new FormData()
        const form = {}
        const payload = ['name', 'phone', 'maps', 'total', ...this.state.products.map(pr => pr.name)]
        for(let st in this.state) {
            if(payload.includes(st)) {
                console.log(st, this.state[st])
                form[st] = this.state[st]
                data.append(st, this.state[st])
            }
        }
        axios.post(`${MASTER_URL}/order`, data, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            })
            .then(response => {
                if(response instanceof Error) {
                    alert('Gagal Order')
                } else {
                    alert('Berhasil Order, pantengin WA/Telegram kamu ya')
                }
            }).catch(function (error) {
                alert('Gagal Order')
                console.log(error);
            })
        event.preventDefault();
    }

    showCounter(name, e) {
        e.preventDefault()
        const value = 1
        const total = this.calcPrice(name, value)
        this.setState({[name]: value, total})
    }

    render() {
        const { error, isLoaded, products } = this.state;
        const listproducts = {
            display: 'flex',
            width: '100%',
            overflowX: 'scroll'
        }
        const productsimg = {
            'width': '11rem',
            'borderRadius': '8px',
            'justifyContent': 'center'
        }
        const ordercounter = {
            'display': 'flex',
            'flexDirection': 'column',
            borderRadius: 'var(--border-radius-norm)',
            boxShadow: '5px 2px 8px #c3c3c3'
        }
        const smallinput = {
            width: '80px',
            marginLeft: 'auto',
            marginRight: 'auto'
        }
        const button = {
            width: '6.5rem',
            height: '2.5rem',
            marginLeft: 'auto',
            marginRight: 'auto',
            border: '2px solid',
            borderRadius: 'var(--border-radius-norm)',
        }
        const buttonClear = {
            ...button,
            backgroundColor: 'white',
            borderColor: 'var(--green)',
            color: 'var(--green)'
        }
        const largeButton = {
            width: '7.5rem',
            height: '3.5rem',
            fontSize: 'larger'
        }
        const buttonSolid = {
            ...button,
            ...largeButton,
            backgroundColor: 'var(--green-secondary)',
            borderColor: 'var(--green-secondary',
            color: 'white'

        }
        if(error) return <div>Error: {error.message} </div>;
        else if(!isLoaded) return <div>Loading...</div>;
        else
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="ds-m-5">
                    Nama:
                    <input className="ds-ml-3" name="name" type="text" value={this.state.name} onChange={this.handleChange} />
                </div>
                <div className="ds-m-5">
                    Whatsapp/Telegram:
                    <input type="text" className="ds-ml-3" name="phone" value={this.state.phone} onChange={this.handleChange}/>
                </div>
                <div className="ds-m-5">
                    Alamat/Maps:
                    <input type="text" className="ds-ml-3" name="maps" value={this.state.maps} onChange={this.handleChange}/>
                </div>
                <div className="ds-m-4 ds-mt-6">Choose Products:</div>
                <div style={listproducts}>
                    {products.map((pr,idx) => {
                        return (
                            <div key={idx} className="ds-m-5 ds-p-3" style={ordercounter}>
                                <img src={this.products_img[pr.name]} style={productsimg} className="ds-border ds-mb-4" alt="logo" />
                                { !this.state[pr.name] || Number(this.state[pr.name]) === 0 ? 
                                    <button type="button" style={buttonClear} onClick={this.showCounter.bind(this, pr.name)}>Pesan</button> : 
                                    <input className="ds-m-2" style={smallinput} name={pr.name} type="number"
                                        value={this.state[pr.name]} min="0" onChange={this.handleChange}/>
                                }
                            </div>
                        )
                    })}
                </div>
                <div className="ds-m-5">Total Rp. {this.state.total}</div>
                <button className="ds-m-2" style={buttonSolid} type="submit" value="Submit">Submit</button>
            </form>
        );
    }
}

export default OrderForm;