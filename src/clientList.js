import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar.js';
import { Link } from 'react-router-dom';
import { useHistory  } from "react-router-dom";

class sessionList extends Component {
    constructor(props) {
        super(props);
        this.state = {sessions: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/api/v1/sessions')
            .then(response => response.json())
            .then(data => this.setState({sessions: data}));
    }
    async remove(id) {
        console.log("Delete method");
        await fetch(`/api/v1/sessions/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedsessions = [...this.state.sessions].filter(i => i.id !== id);
            this.setState({sessions: updatedsessions});
            window.location.reload()
        });
    }
    
    render() {
        function refreshPage(){ 
            window.location.reload(); 
        }
        const {sessions, isLoading} = this.state;
    
        if (isLoading) {
            return <p>Loading...</p>;
        }
        const sessionList = sessions.map(session => {
            return <tr key={session["session_id"]}>
                <td style={{whiteSpace: 'nowrap'}}>{session["session_name"]}</td>
                <td>{session["session_length"]}</td>
                <td>{session["session_description"]}</td>
                <td>
                    <ButtonGroup>
                        <Button  size="sm" color="primary" tag={Link} to={"/sessions/" + session["session_id"]} >Edit</Button>
                        {/* <Link to={{pathname:"/sessions/" + session["session_id"]}} onClick={refreshPage}>Home</Link> */}
                        <Button size="sm" color="danger" onClick={() => this.remove(session["session_id"])}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/sessions/new">Add session</Button>
                    </div>
                    <h3>sessions</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="40%">Topic</th>
                            <th width="10%">Duration</th>
                            <th width="40%">Description</th>
                            <th width="10%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sessionList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default sessionList;