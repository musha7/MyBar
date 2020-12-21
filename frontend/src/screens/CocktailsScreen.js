import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import Cocktail from '../components/Cocktail';

const CocktailsScreen = () => {
    const [cocktails, setCocktails] = useState([])
    useEffect(() => {
        const fetchCocktails = async () => {
            const { data } = await axios.get('/api/cocktails')

            setCocktails(data.cocktails)
        }
        fetchCocktails()
    }, [])

    return (
        <>
            <h1 className='text-center'>Cocktails</h1>
            <Row>
                {cocktails.map((c, index) => (
                    <Col key={index} sm={12} md={6} lg={4} xl={3}>
                        <Cocktail cocktail={c} ings={false} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default CocktailsScreen
