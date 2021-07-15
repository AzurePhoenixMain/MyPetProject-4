import React, {Component} from 'react';
import './itemList.css';
// import GotService from '../../services/gotService';
import Spinner from '../spner';




export default class ItemList extends Component {

    // gotService = new GotService();

    state = {
        itemList: null,
        loading: true
    }

    componentDidMount() {
        const {getData} = this.props

        getData()
        // this.gotService.getAllCharacters()
            .then (this.onItemLoaded)
    }

    onItemLoaded = (itemList) => {
        this.setState({
            itemList,
            loading: false
        })
    }

    renderItems(arr) {
        return arr.map((item) => {

            const {id} = item;
            const lable = this.props.renderItem(item)

            return(
                <li 
                    key={id}
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}>
                    {lable}
                </li>
            )
        })
    }

    render() {

        const {itemList} = this.state;

        if (!itemList) {
            return <Spinner/>
        }
        
        const items = this.renderItems(itemList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}