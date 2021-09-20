import React from 'react';
import axios from 'axios';
import thaitea from '../assets/img/products/thai_tea.jpg';
import greentea from '../assets/img/products/green_tea.jpg';
import milktea from '../assets/img/products/milktea.jpg';
import chocolate from '../assets/img/products/chocolate.jpg';
import honey from '../assets/img/products/honey_lemon.jpg';
import Input from '../components/Input'
// import Confirmation from '../components/Confirmation'

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
        this.state = {isLoaded: false, name: '', phone: '', maps: '', total: 0, products: [], isConfirmationShow: false};
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.confirmOrder = this.confirmOrder.bind(this);
        this.cancelOrder = this.cancelOrder.bind(this);
    }
    
    componentDidMount() {
        axios.get(`${MASTER_URL}/master/products`)
        .then(response => {
            let result = response.data
            let newState = {}
            result.map(rs => {
                this.products_price[rs.name] = rs.price
                newState[rs.name] = -1
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
        const count = this.state[name] === -1 ? 0: (this.state[name] || 0)
        const diff = (value - count) * this.products_price[name]
        total = this.state.total + diff
        
        return total
    }

    handleChange(event) {
        // console.log("diff price", this.state[event.target.name], event.target.value)
        const name = event.target.name
        const value = event.target.value
        const payload = {[name]: value}
        if(this.products_price[name]) {
            payload.total = this.calcPrice(name, value)
        }

        this.setState(payload)
    }
  
    handleSubmit(event) {
        event.preventDefault();
        this.setState({'isConfirmationShow': false})
        const data = new FormData()
        const form = {}
        const payload = ['name', 'phone', 'maps', 'total', ...this.state.products.map(pr => pr.name)]
        for(let st in this.state) {
            if(payload.includes(st)) {
                // console.log(st, this.state[st])
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
    }

    showCounter(name, e) {
        e.preventDefault()
        const value = 1
        const total = this.calcPrice(name, value)
        this.setState({[name]: value, total})
    }

    confirmOrder() {
        this.setState({'isConfirmationShow': true})
    }
    cancelOrder() {
        this.setState({'isConfirmationShow': false})
    }

    styling() {
        const button = {
            width: '6.5rem',
            height: '2.5rem',
            marginLeft: 'auto',
            marginRight: 'auto',
            border: '2px solid',
            borderRadius: 'var(--border-radius-norm)',
        }
        const largeButton = {
            width: '8rem',
            height: '3.5rem',
            fontSize: 'larger'
        }
        return {
            listproducts: {
                display: 'flex',
                width: '100%',
                overflowX: 'scroll'
            },
            productsimg: {
                'width': '11rem',
                'borderRadius': '8px',
                'justifyContent': 'center'
            },
            ordercounter: {
                'display': 'flex',
                'flexDirection': 'column',
                borderRadius: 'var(--border-radius-norm)',
                boxShadow: '5px 2px 8px #c3c3c3'
            },
            button: button,
            buttonClear: {
                ...button,
                backgroundColor: 'white',
                borderColor: 'var(--green)',
                color: 'var(--green)'
            },
            largeButton: largeButton,
            buttonSolid: {
                ...button,
                ...largeButton,
                backgroundColor: 'var(--green-secondary)',
                borderColor: 'var(--green-secondary)',
                color: 'white'
            },
            cancelButtonSolid: {
                ...button,
                ...largeButton,
                backgroundColor: 'white',
                borderColor: 'var(--red)',
                color: 'var(--red)'
            },
            flex: {
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '200px',
                marginLeft: 'auto',
                marginRight: 'auto'
            },
            flexRow: {
                display: 'flex',
                flexDirection: 'row',
            },
            summaryBox: {
                backgroundColor: Number(this.state.total) ? 'white': 'transparent',
                maxWidth: '400px',
                marginLeft: 'auto',
                marginRight: 'auto'
            }
        }
    }

    render() {
        const { error, isLoaded, products } = this.state;
        const style = this.styling()
        if(error) return <div>Error: {error.message} </div>;
        else if(!isLoaded) return <div>Loading...</div>;
        else 
        return (
            <div> 
                { !this.state.isConfirmationShow ? 
                <form onSubmit={this.handleSubmit}>
                    <div style={style.flex}>
                        <Input label="Nama" name="name" value={this.state.name} placeholder="name" 
                            onChange={this.handleChange.bind(this)} />
                        <Input label="Telepon" name="phone" value={this.state.phone} placeholder="Nomor WA/Telegram" 
                            onChange={this.handleChange.bind(this)} />
                        <Input label="Alamat" name="maps"
                            value={this.state.name} placeholder="Dianter kemana?" 
                            onChange={this.handleChange.bind(this)} />
                    </div>
                    <h5 className="ds-m-4 ds-mt-5" style={{color: 'var(--green)'}}>Choose Products :</h5>
                    <div style={style.listproducts}>
                        {products.map((pr,idx) => {
                            return (
                                <div key={idx} className="ds-m-5 ds-p-3" style={style.ordercounter}>
                                    <img src={this.products_img[pr.name]} style={style.productsimg} className="ds-border ds-mb-4" alt="logo" />
                                    { Number(this.state[pr.name]) >= 0 ? 
                                        <Input className="ds-m-2" name={pr.name} value={this.state[pr.name]} min="0" type="number"
                                        placeholder="Dianter kemana?" onChange={this.handleChange.bind(this)} /> :
                                        <button type="button" style={style.buttonClear} onClick={this.showCounter.bind(this, pr.name)}>Pesan</button>
    
                                    }
                                </div>
                            )
                        })}
                    </div>
                    <div className="ds-m-6" style={{color: 'var(--green)'}}><b>Total Rp. {this.state.total}</b></div>
                    <button className="ds-m-2" style={style.buttonSolid} type="button" value="Submit" onClick={this.confirmOrder}>Submit</button>
                </form>
                : 
                <div className="ds-border ds-m-6" style={style.summaryBox}>
                    {Number(this.state.total) ? <div className="ds-m-6" ><b>Kak {this.state.name}, konfirmasi pesanan kamu ya :</b></div>: ''}
                    <div className="ds-m-3">dianter ke {this.state.maps}</div>
                    {products.map((pr,idx) => {
                            return (
                                Number(this.state[pr.name]) ? 
                                    <div className="ds-m-3">🍹<b>{this.state[pr.name]}</b> {pr.name} : {this.products_price[pr.name] * this.state[pr.name]}</div>
                                    : ''
                            )
                    })}
                    <div className="ds-m-5">Kami bakal hubungi kamu lewat WA/Telgram ke <b>{this.state.phone}</b>, mohon ditunggu 😉</div>
                    <div style={style.flexRow}>
                        <button className="ds-mt-5 ds-mb-1" style={style.cancelButtonSolid} type="button" onClick={this.cancelOrder} placeholder="Kembali ke menu">Cancel</button>
                        <button className="ds-m-5" style={style.buttonSolid} type="submit" value="Confirm">Pesan Sekarang</button>
                    </div>
                </div>
                }
            </div>
        );
    }
}

export default OrderForm;