import React from "react";
import { scaleDown as Menu } from "react-burger-menu";

export default props => {
    return (
        // Pass on our props
        
        <Menu {...props}>
            <a className="menu-item" href="/">
                Koti
            </a>

            <p className="nimi">Tavaraa</p>
            
            <a className="menu-item" href="/koulut">
                Koulut
            </a>

            <a className="menu-item" href="/opettajat">
                Opettajat
            </a>

            <a className="menu-item" href="/contact">
                Ota yhteyttä
            </a>
            <a className="menu-item" href="/SignIn">
                SignIn
            </a>
        </Menu>
        
    );
};