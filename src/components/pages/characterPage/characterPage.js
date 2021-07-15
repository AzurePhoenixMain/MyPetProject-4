import React, {Component} from 'react';
// import {Col, Row, Container} from 'reactstrap';
import ItemList from '../../itemList';
import ItemDetails, {Field} from '../../itemDetails';
import ErrorMessage from '../../errorMessage';
import GotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';


export default class CharacterPage extends Component {
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
                getData={this.gotService.getAllCharacters}
                renderItem={(item) => `${item.name} (${item.gender})` }/>
        )

        const itemDetails = (
            <ItemDetails itemId={this.state.selectChar} getData={this.gotService.getCharacter}>
                <Field field='gender' lable='Gender' />
                <Field field='born' lable='Born' />
                <Field field='died' lable='Died' />
                <Field field='culture' lable='Culture' />
            </ItemDetails>
        )

        return (
            <RowBlock left={itemList} right={itemDetails}/>
        )
    }
}
