import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Home extends Component {
    render() {
        function refreshPage(){ 
            window.location.reload(); 
        }
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <Button onClick={ refreshPage } color="link"><Link to="/clients">Clients</Link></Button>
                </Container>
            </div>
        );
    }
}
export default Home;