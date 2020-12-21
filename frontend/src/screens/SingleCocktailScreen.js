import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Cocktail from '../components/Cocktail';
import { getCocktailById } from '../actions/cocktailActions'

function SingleCocktailScreen({ match }) {

    const cocktailById = useSelector(state => state.cocktailById);
    const { cocktail } = cocktailById;

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCocktailById(match.params.id))
    }, [dispatch, match])

    return (
        <Row>
            <Col sm={12} md={6} lg={4} xl={3}>
                <Cocktail cocktail={cocktail} ings={true} />
            </Col>
        </Row>
    )
}

export default SingleCocktailScreen
