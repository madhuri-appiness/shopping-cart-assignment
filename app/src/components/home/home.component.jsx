import { Card, Carousel, Col, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './home.scss';

const Home = () => {
    const [banners, setBanners] = useState([]);
    const [categories, setCategory] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const banners = await axios.get('http://localhost:8000/banners');
            const category = await axios.get('http://localhost:8000/categories');
            setBanners(banners.data);
            setCategory(category.data)
        }
        fetchData();
    }, [])
    return (
        <div>
            <div className='banner-section'>
                <Carousel>
                    {
                        banners.map((item) => {
                            return (
                                <Carousel.Item key={item.id}>
                                    <img
                                        className="d-block w-100"
                                        src={item.bannerImageUrl}
                                        alt={item.bannerImageAlt}
                                    />
                                </Carousel.Item>
                            )
                        })
                    }
                </Carousel>
            </div>
            <div className='category-section'>
                {
                    categories.map((item, i) => {
                        return (
                            <Card key={item.id}>
                                {
                                    i % 2 === 0 ? <Row className="justify-content-md-center">
                                        <Col xs={6} md={5}>
                                            <div className='category-img'>
                                                <Card.Img variant="top" src={item.imageUrl} alt={item.name} />
                                            </div>
                                        </Col>
                                        <Col xs={6} md={6}>
                                            <Card.Body>
                                                <div className='category-desc'>
                                                    <Card.Title>{item.name}</Card.Title>
                                                    <Card.Text>
                                                        {item.description}
                                                    </Card.Text>
                                                    <button className='btn-cls'>Explore {item.name}</button>
                                                </div>
                                            </Card.Body>
                                        </Col>
                                    </Row> : <Row className="justify-content-md-center">
                                        <Col xs={6} md={6}>
                                            <Card.Body>
                                                <div className='category-desc'>
                                                    <Card.Title>{item.name}</Card.Title>
                                                    <Card.Text>
                                                        {item.description}
                                                    </Card.Text>
                                                    <button className='btn-cls'>Explore {item.name}</button>
                                                </div>
                                            </Card.Body>
                                        </Col>
                                        <Col xs={6} md={5}>
                                            <div className='category-img'>
                                                <Card.Img variant="top" src={item.imageUrl} alt={item.name} />
                                            </div>
                                        </Col>
                                    </Row>
                                }

                            </Card>
                        )
                    })
                }
            </div>

        </div>
    );
}

export default Home;