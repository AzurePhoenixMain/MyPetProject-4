import React, {Component} from 'react';
// import {Col, Row, Container} from 'reactstrap';
import ItemList from '../../itemList';
import ItemDetails, {Field} from '../../itemDetails';
import ErrorMessage from '../../errorMessage';
import GotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';


export default class HousesPage extends Component {
    gotService = new GotService()

    state = {
        selectChar: 130,
        error: false
    }

    componentDidMount() {
        this.setState({loading: false})
    }

    

    onItemSelected = (id) => {
        this.setState({
            selectChar: id
        })
    }

    render() {

        const {error} = this.state

        

        if (error) {
            return (<ErrorMessage/>)
        }

        const itemList = (
            
            <ItemList 
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllHouses}
                renderItem={(item) => `${item.name} (${item.region})` }/>
        )

        const itemDetails = (
            <ItemDetails itemId={this.state.selectChar} getData={this.gotService.getHouse}>
                <Field field='region' lable='Region' />
                <Field field='words' lable='Words' />
            </ItemDetails>
        )

        return (
            <RowBlock left={itemList} right={itemDetails}/>
        )
    }
}
