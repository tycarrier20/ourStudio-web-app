import React from 'react';
import App from '../App';
import Profile from '../profile';
import About from '../about';
import * as ReactBootStrap from "react-bootstrap";
import { Link } from 'react-router-dom';


const Navbar = () => {
    return (

        <ReactBootStrap.Navbar bg="light" expand="lg">
            <ReactBootStrap.Navbar.Brand href="#home">ourStudio</ReactBootStrap.Navbar.Brand>
            <ReactBootStrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
            <ReactBootStrap.Navbar.Collapse id="basic-navbar-nav">
                <ReactBootStrap.Nav className="mr-auto">
                    <ReactBootStrap.Nav.Link to="/">
                        <Link to="/">Home</Link>
                    </ReactBootStrap.Nav.Link>
                    <ReactBootStrap.Nav.Link to="/profile">
                        <Link to="/profile">Profile</Link>
                    </ReactBootStrap.Nav.Link>
                    <ReactBootStrap.Nav.Link to="/about">
                        <Link to="/about">About</Link>
                    </ReactBootStrap.Nav.Link>
                    <ReactBootStrap.Nav.Link to="/about">
                        <Link to="/upload">Upload</Link>
                    </ReactBootStrap.Nav.Link>
                </ReactBootStrap.Nav>
                <ReactBootStrap.Form inline>
                    <ReactBootStrap.FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <ReactBootStrap.Button variant="outline-success">Search</ReactBootStrap.Button>
                </ReactBootStrap.Form>
            </ReactBootStrap.Navbar.Collapse>
        </ReactBootStrap.Navbar>

    );
};

export default Navbar;