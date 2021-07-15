import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../pages/characterPage'
import {BooksPage, BooksItem} from '../pages/booksPage'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import HousesPage from '../pages/housesPage';

// import ItemList from '../itemList';
// import CharDetails from '../charDetails';



import './app.css';

export default class App extends Component {
    state = {
        showRandomChar: true,
        error: false
    }

    componentDidCatch() {
        console.log('Error')
        this.setState({error: true})
    }

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }
        const char = this.state.showRandomChar ? <RandomChar/> : null;

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <Router>
            <div className='app'> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {char}
                            <button 
                                className="toggle-btn"
                                onClick={this.toggleRandomChar}>Вкл\выкл окно рандомного персонажа</button>
                        </Col>
                    </Row>

                    <Route path='/characters' component={CharacterPage} />
                    <Route path='/houses' component={HousesPage} />
                    <Route path='/books' exact component={BooksPage} />
                    <Route path='/books/:id' render={
                        ({match}) => {
                            const {id} = match.params;
                            return <BooksItem bookId={id}/>
                        }
                    } />
                </Container>
            </div>
            </Router>
        );
    }
};