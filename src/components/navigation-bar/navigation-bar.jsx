import React from 'react';
import PropTypes from 'prop-types';

// Router
import { Link } from "react-router-dom";

// Style
import './navigation-bar.scss';

// react-bootstrap components
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

export function NavigationBar( {logOut, user} ) {

    return(
    <Navbar bg="light" variant="light" fixed="top">
        <Navbar.Brand href="#">My Flix</Navbar.Brand>
        <Nav className="me-auto">
            <Nav.Item className="nav-link">
                <Link to={`/`}>Home</Link>
            </Nav.Item>
            <Nav.Item className="nav-link">
                <Link to={`/users/${user}`}>Profile</Link>
            </Nav.Item>
        </Nav>
        <Button size="sm" className="float-end" onClick={logOut}>Log Out</Button>
    </Navbar>
    )
}

