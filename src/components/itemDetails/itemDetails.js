import React, {Component} from 'react';
import './itemDetails.css';
import GotService from '../../services/gotService';

const Field = ({item, field, lable}) => {
    // console.log(`char: ${typeof(char)}`) char: object
    // console.log(`field: ${typeof(field)}`) field: string
    // console.log(`lable: ${typeof(lable)}`) lable: string
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{lable}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {Field}

export default class ItemDetails extends Component {

    gotService = new  GotService()

    state = {
        item: null
    }

    componentDidMount() {
        this.updateItem()
        // console.log('mount')
    }

    componentDidUpdate(prevProps) {
        if(this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
        // console.log('upd')
        
    }

    updateItem() {
        const {itemId, getData} = this.props
        if (!itemId) {
            return;
        }
        // this.gotService.getCharacter(itemId)
        //     .then((item) => {
        //         this.setState({item})
        //     })

        getData(itemId)
            .then((item) => {
                this.setState({item})
            })
    }
    

    render() {

        if(!this.state.item) {
            return <span className='select-error'>Пожалуйста выберите персонажа</span>
        }

        const {item} = this.state;
        const {name} = item;

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">

                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }

                    {/* <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born</span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died</span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture</span>
                        <span>{culture}</span>
                    </li> */}
                </ul>
            </div>
        );
    }
}