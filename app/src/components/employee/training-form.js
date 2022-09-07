import { useNavigate } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { enrollEmployeList } from '../../store/actions/employee.action';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../table/table.component';
import { Col, Form, Row, Toast } from 'react-bootstrap';
import { employeeReducer } from '../../store/reducer/employee.reducer';
import './employee.scss';
import { getEnrolledList } from '../../store/selectors/employeeListSelectors';

const TrainingForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = useSelector((state => state.employee.enrollEmp));
    const enrolledEmployees = useSelector(getEnrolledList);
    const initialValue = { name: data.emp.name, id: data.emp.id, email: data.emp.email, training_name: "" };
    const [formValues, setFormValues] = useState(initialValue);
    const [errors, setErrors] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);

    //navigation to emplist
    const gotoEmpList = (e) => {
        navigate("/")
    };

    //set form values
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    //onsubmit validation
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validate(formValues));
        setIsSubmit(true);
    }

    //formsubmit check after validation
    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmit) {
            const index = enrolledEmployees && enrolledEmployees.findIndex(object => object['id'] === formValues['id']);
            if (index == -1) {
                dispatch(enrollEmployeList(formValues));
                gotoEmpList()
            }
        }
        return (() => {
            setIsSubmit(false);
        })
    }, [errors])

    //validating form 
    const validate = (values) => {
        const formerrors = {};
        const regx = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.name) {
            formerrors.name = 'Name is required';
        }
        if (!values.id) {
            formerrors.id = 'Id is required';
        }
        if (!values.training_name) {
            formerrors.training_name = 'Training name is required';
        }
        if (!values.email) {
            formerrors.email = 'Email is required';
        } else if (!regx.test(values.email)) {
            formerrors.email = 'This is not valid email format';
        }
        return formerrors;
    }

    //table data
    const tableConstants = () => {
        return [
            {
                title: 'ID',
                render: rowData => {
                    return <span>{rowData.id}</span>;
                },
            },
            {
                title: 'Name',
                render: rowData => {
                    return <span>{rowData.name}</span>;
                },
            },
            {
                title: 'Company Name',
                render: rowData => {
                    return <span>{rowData.email}</span>;
                },
            },
            {
                title: 'Traing Name',
                render: rowData => {
                    return <span>{rowData.training_name}</span>;
                },
            }
        ];
    };

    return (
        <Fragment>
            <div className="container">
                <div className='form-sec'>
                    <Row className="justify-content-md-center">
                        <Col md={5}>
                            <h4>Adding Employees to Enrolled List</h4>
                            <Form onSubmit={handleSubmit} >
                                <div className='form-group'>
                                    <label>Name</label>
                                    <input type="text" className={errors.name ? 'error-border' : ''} name="name" value={formValues.name} onChange={handleChange} />
                                    <p className='error'>{errors.name}</p>
                                </div>
                                <div className='form-group'>
                                    <label>ID</label>
                                    <input type="text" className={errors.id ? 'error-border' : ''} name="id" value={formValues.id} onChange={handleChange} />
                                    <p className='error'>{errors.id}</p>
                                </div>
                                <div className='form-group'>
                                    <label>Email</label>
                                    <input type="email" className={errors.email ? 'error-border' : ''} name="email" value={formValues.email} onChange={handleChange} />
                                    <p className='error'>{errors.email}</p>
                                </div>
                                <div className='form-group'>
                                    <label>Training Name</label>
                                    <input type="text" className={errors.training_name ? 'error-border' : ''} name="training_name" value={formValues.training_name} onChange={handleChange} />
                                    <p className='error'>{errors.training_name}</p>
                                </div>
                                <button type="submit" className='btn btn-primary'>Enroll for training</button>
                            </Form>
                        </Col>
                    </Row>
                </div>
                <div>
                    
                    <Table cols={tableConstants()} data={enrolledEmployees} />
                </div>
            </div>
        </Fragment>

    );
}

export default TrainingForm;
