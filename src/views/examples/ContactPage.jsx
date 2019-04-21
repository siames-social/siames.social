import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Alert,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import * as emailjs from 'emailjs-com';

let ps = null;

class ContactPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: 1,
      name: '',
      email: '',
      company: '',
      message: '',
      sent: false,
      error: false,
      disabledButton: false,
    }
    this.commonChange = this.commonChange.bind(this);
    this.sendMail = this.sendMail.bind(this);
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.body.classList.toggle("profile-page");
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
    document.body.classList.toggle("profile-page");
  }
  toggleTabs = (e, stateName, index) => {
    e.preventDefault();
    this.setState({
      [stateName]: index
    });
  };
  commonChange(event) {
    this.setState({
        [event.target.name]: event.target.value
    });
  };

  sendMail(event) {
      event.preventDefault();
      this.setState({disabledButton: true});
      var template_params = {
          "reply_to": this.state.email,
          "from_name": "SIAMES Web - " + this.state.name + "(" + this.state.company + ")" ,
          "to_name": "Daniel",
          "message_html": this.state.message
      }

      var service_id = "default_service";
      var template_id = process.env.REACT_APP_EMAILJS_TEMPLATE;
      var user_id = process.env.REACT_APP_EMAILJS_USER_ID;
      emailjs.send(service_id, template_id, template_params, user_id)
          .then((response) => {
              this.setState({sent: true, error: false})
          }, (err) => {
              this.setState({sent: true, error: true})
          });
  }

    render() {
    const sent = this.state.sent;
    const error = this.state.error;
    const disabledButton = this.state.disabledButton;
    return (
      <>
        <ExamplesNavbar />
        <div className="wrapper">
          <section className="section">
            <Container>
              <Row>
                <Col md="6">
                  <Card className="card-plain">
                    <CardHeader>
                      <h1 className="profile-title text-left">Contact</h1>
                      <h5 className="text-on-back">SIAMES</h5>
                    </CardHeader>
                    <CardBody>
                      <Alert style={{ display: (!error && sent ? 'block' : 'none') }} color="success">Thank you! We will answer you as soon as posible</Alert>
                      <Alert style={{ display: (error && sent ? 'block' : 'none') }} color="danger">Your message colud not be sent. Please, try again or send an email to info@siames.social</Alert>
                      <Form style={{ display: (sent ? 'none' : 'block') }}>
                        <Row>
                          <Col md="6">
                            <FormGroup>
                              <label>Your Name</label>
                              <Input placeholder="Daniel" type="text" name="name" onChange={this.commonChange}/>
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <label>Email address</label>
                              <Input
                                placeholder="daniel@example.com"
                                type="email"
                                onChange={this.commonChange}
                                name="email"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="6">
                            <FormGroup>
                              <label>Phone</label>
                              <Input placeholder="0034-975222222" type="text" onChange={this.commonChange} name="phone" />
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <label>Company</label>
                              <Input placeholder="SIAMES" type="text" onChange={this.commonChange} name="company" />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="12">
                            <FormGroup>
                              <label>Message</label>
                              <Input placeholder="Hello there!" type="text" onChange={this.commonChange} name="message" />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Button
                          className="btn-round float-right"
                          color="primary"
                          data-placement="right"
                          id="tooltip341148792"
                          type="button"
                          onClick={this.sendMail}
                          disabled={disabledButton}
                        >
                          Send text
                        </Button>
                        <UncontrolledTooltip
                          delay={0}
                          placement="right"
                          target="tooltip341148792"
                        >
                          Can't wait for your message
                        </UncontrolledTooltip>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
                <Col className="ml-auto" md="4">
                  <div className="info info-horizontal">
                    <div className="icon icon-primary">
                      <i className="tim-icons icon-square-pin" />
                    </div>
                    <div className="description">
                      <h4 className="info-title">Find us at the office</h4>
                      <p>
                        Calle El Collado, 28, 3º <br />
                        42002 - Soria, <br />
                        Spain
                      </p>
                    </div>
                  </div>
                  <div className="info info-horizontal">
                    <div className="icon icon-primary">
                      <i className="tim-icons icon-mobile" />
                    </div>
                    <div className="description">
                      <h4 className="info-title">Give us a ring</h4>
                      <p>
                        Daniel Hernández <br />
                        +34 679 544 579 <br />
                        Mon - Fri, 9:00-20:00
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          <Footer />
        </div>
      </>
    );
  }
}

export default ContactPage;
