import { Col,Tab,Row,Nav} from 'react-bootstrap'
import './tab.scss';

function Tabs({ tabs }) {
    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="1">
            <Row>
                <Col sm={12}>
                    <Nav variant="pills" >
                        {
                            tabs.map((content, i) =>
                                <Nav.Item key={content.id}>
                                    <Nav.Link eventKey={content.id}>{content.title}</Nav.Link>
                                </Nav.Item>
                            )}
                    </Nav>
                </Col>
                <Col sm={12}>
                    <Tab.Content>
                        {
                            tabs.map((tab, i) =>
                                <Tab.Pane key={tab.id} eventKey={tab.id}>
                                    {tab.content}
                                </Tab.Pane>)
                        }
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
}

export default Tabs;