import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import Cocktail from '../components/Cocktail';

//import cocktails from '../cocktails'

const CocktailsScreen = () => {
    const [cocktails, setCocktails] = useState([]);
    useEffect(() => {
        const fetchCocktails = async () => {
            const { data } = await axios.get('/api/cocktails')

            setCocktails(data)
        }
        fetchCocktails()
    }, [])

    return (
        <Row>
            {cocktails.map((c, index) => (
                <Col key={index} sm={12} md={6} lg={4} xl={3}>
                    <Cocktail cocktail={c} />
                </Col>
            ))}
        </Row>
    )
}

export default CocktailsScreen
