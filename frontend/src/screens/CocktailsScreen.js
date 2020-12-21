import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Cocktail from '../components/Cocktail';
import { getCocktailsList } from '../actions/cocktailActions';

const CocktailsScreen = () => {

    const cocktailList = useSelector(state => state.cocktailList);
    const { loading, error, cocktails } = cocktailList;

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCocktailsList())
    }, [dispatch])

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
