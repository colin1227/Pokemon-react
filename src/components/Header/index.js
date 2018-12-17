import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Menu } from "semantic-ui-react";

const Header = (props) => {
  return(
        <Menu>
            <Menu.Item>
                <Link to="/">
                  Home
                </Link>      
            </Menu.Item>
            <Menu.Item>
              <Link to="/game">
                Play Game
              </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/all">
                  View The Pokemon
                </Link>
            </Menu.Item>
            {props.super ?
            <Menu.Item>
              <Link to="/editAll">
                  Edit
              </Link>
            </Menu.Item>: true}
        </Menu>
  )
};

export default Header;