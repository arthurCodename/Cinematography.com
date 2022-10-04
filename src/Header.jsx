import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';

const HeaderStyles = styled.div`

    .hdr-container{
        width: 100%;
        height: 10vh;
        background-color: rgb(18,18,18);;
        color: white;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
    }
    .logo{
        padding-left: 30px;
    }
    .hdr-ablts{
        display: flex;
        flex-direction: row;
        gap: 50px;
        padding-right: 20px;
    }
    .logo{
        color: #FFF;
        text-decoration: none;
    }

`

const Header = () => {
    return (
        <HeaderStyles>
        <div className='hdr-container'>
            <div ><Link to= '/' className='logo'>Cinematography.com</Link></div>
            <div className='hdr-ablts'>
            <div>Search</div>
            <div >Profile</div>
            </div>
        </div>
        </HeaderStyles>
    );
};

export default Header;