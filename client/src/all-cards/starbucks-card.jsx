import React from 'react';
import NumberInput from '../input'

const StarBucks = () => {
    return (
        <div>
            <div>
                <nav className="nav">
                    <a className="logo" href="/dashoard">
                        Giftcards
                    </a>
                    <ul>
                        <a href="/option">
                            Logout
                        </a>
                    </ul>
                </nav>
            </div>
            <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'cursive' }}>
                <h1>Starbucks Gift Card</h1>
                <br></br>
                <NumberInput />
            </div>
        </div>
    );
};

export default StarBucks;
