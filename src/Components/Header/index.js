import { FiHome, FiSearch, FiSettings } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { auth } from '../../FirebaseConnection'
import { signOut } from 'firebase/auth'
import './header.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Container, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'react-bootstrap'
import Logo from '../../Assets/logo.png'
import './header.css';


export default function Header() {
    async function handleLogout() {
        await signOut(auth)
    }
    return (
        <div className='container-header'>

            <Navbar className='custom-navbar' variant='dark'>
                <Container className='container-header'>
                    <img className='Logo' src={Logo} />
                    <Navbar.Brand className='Navbrand-Home' as={Link} to="/inicio">Home</Navbar.Brand>
                    <Navbar.Brand className='Navbrand-Folha' as={Link} to="/folha_pagamento">Folha de Pagamento</Navbar.Brand>
                    <Navbar.Brand className='Navbrand-Controle_ponto' as={Link} to="/controle_ponto">Controle de Ponto</Navbar.Brand>
                    <Navbar.Brand className='Navbrand-mensagens' as={Link} to="/mensagens">Suporte</Navbar.Brand>
                    <Dropdown className='Dropdown-perfil' align={{ lg: 'end' }}>
                        <Dropdown.Toggle className='custom-dropdown-button'>
                            Menu
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Container>
            </Navbar>
        </div>
    )

}