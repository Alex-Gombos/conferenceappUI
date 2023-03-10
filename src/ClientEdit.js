import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar.js';

class ClientEdit extends Component {
    
    emptyItem = {
        session_name: '',
        session_id: 0,
        session_length: 0,
        session_description: ''
    };

    constructor(props) {
        console.log("EDIT");
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const client = await (await fetch(`/api/v1/sessions/${this.props.match.params.id}`)).json();
            this.setState({item: client});
            console.log("MOUNTED");
        }
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        var value = target.value;
        // if(name =="session_id" || name == "session_length"){
        //     value = Number(value)
        // }
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }
    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
        console.log(item);
        await fetch('/api/v1/sessions' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/sessions');
        window.location.reload();
    }

    render() {
        const {item} = this.state;
        const title = <h2>Edit Session</h2>;
        function refreshPage(){ 
            window.location.reload(); 
        }
        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="session_name" id="session_name"
                               onChange={this.handleChange} autoComplete="session_name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="id">ID</Label>
                        <Input type="number" name="session_id" id="session_id"
                               onChange={this.handleChange} autoComplete="session_id"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="length">Length</Label>
                        <Input type="number" name="session_length" id="session_length"
                               onChange={this.handleChange} autoComplete="session_length"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="length">Description</Label>
                        <Input type="text" name="session_description" id="session_description"
                               onChange={this.handleChange} autoComplete="session_description"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/sessions" onClick={refreshPage}>Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}
export default withRouter(ClientEdit);