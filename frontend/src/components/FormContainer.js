import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const FormContainer = ({ children, smd, sxs }) => {
    return (
        <Container>
            <Row className='justify-content-md-center'>
                <Col xs={smd ? smd : 12} md={sxs ? sxs : 7}>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default FormContainer
