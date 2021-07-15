import React, {Component} from 'react';
// import {Col, Row, Container} from 'reactstrap';
import ItemList from '../../itemList';
// import ItemDetails, {Field} from '../../itemDetails';
import ErrorMessage from '../../errorMessage';
import GotService from '../../../services/gotService';
import {withRouter} from 'react-router';
// import RowBlock from '../../rowBlock';


class BooksPage extends Component {
    gotService = new GotService()

    state = {
        error: false
    }

    componentDidMount() {
        this.setState({loading: false})
    }

    render() {

        const {error} = this.state

        if (error) {
            return (<ErrorMessage/>)
        }

        return (
            <ItemList 
                onItemSelected={(itemId) => {
                    this.props.history.push(`/books/${itemId}`)
                }}
                getData={this.gotService.getAllBooks}
                renderItem={({name, numberOfPages}) => `${name} (${numberOfPages} страниц)`}/>
        )
    }
}


export default withRouter(BooksPage); // получает match, location, history 