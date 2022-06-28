import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './form.scss';

const Login = () => {
    const initialValue = {  email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValue);
    const [errors, setErrors] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false)
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validate(formValues));
        setIsSubmit(true);
    }
    const validate = (values) => {
        const errors = {};
        const regx = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email) {
            errors.email = 'Email is required';
        } else if (!regx.test(values.email)) {
            errors.email = 'This is not valid email format';
        }
        if (!values.password) {
            errors.password = 'Password is required';
        }
        return errors;
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmit) {
            navigate('/')
        }
    }, [errors])

    return (
        <div className='form-sec'>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <div className='signup-data'>
                        <h3>Login</h3>
                        <p>Get access to your Orders,Wishlists and Recommendations</p>
                    </div>
                </Col>
                <Col md={4}>
                    <Form onSubmit={handleSubmit} >
                        <div className='form-group'>
                            <label>Email</label>
                            <input type="text" className={errors.email ? 'error-border' : ''} name="email" value={formValues.email} onChange={handleChange} />
                            <p className='error'>{errors.email}</p>
                        </div>
                        <div className='form-group'>
                            <label>Password</label>
                            <input type="password" className={errors.password ? 'error-border' : ''} name="password" value={formValues.password} onChange={handleChange} />
                            <p className='error'>{errors.password}</p>
                        </div>
                        <button type="submit" className='btn-cls login-btn'>Login</button>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

export default Login;