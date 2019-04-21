import React from "react";
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col, Alert
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import * as emailjs from "emailjs-com";

class RegisterPage extends React.Component {
  state = {
    squares1to6: "",
    squares7and8: "",
    name: "",
    email: "",
    message: "",
    sent: false,
    error: false,
    disabledButton: false,
  };
  constructor(props) {
    super(props);
    this.commonChange = this.commonChange.bind(this);
    this.sendMail = this.sendMail.bind(this);
  }

  componentDidMount() {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", this.followCursor);
  }
  componentWillUnmount() {
    document.body.classList.toggle("register-page");
    document.documentElement.removeEventListener(
      "mousemove",
      this.followCursor
    );
  }
  followCursor = event => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    this.setState({
      squares1to6:
        "perspective(500px) rotateY(" +
        posX * 0.05 +
        "deg) rotateX(" +
        posY * -0.05 +
        "deg)",
      squares7and8:
        "perspective(500px) rotateY(" +
        posX * 0.02 +
        "deg) rotateX(" +
        posY * -0.02 +
        "deg)"
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
      "from_name": "SIAMES Beta Request - " + this.state.name,
      "to_name": "Daniel",
      "message_html": this.state.message
    }

    var service_id = "default_service";
    var template_id = process.env.REACT_APP_EMAILJS_TEMPLATE;
    var user_id = process.env.REACT_APP_EMAILJS_USER_ID;
    var result = emailjs.send(service_id, template_id, template_params, user_id)
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
          <div className="page-header">
            <div className="page-header-image" />
            <div className="content">
              <Alert style={{ display: (!error && sent ? 'block' : 'none') }} color="success">Thank you! We will answer you as soon as posible</Alert>
              <Alert style={{ display: (error && sent ? 'block' : 'none') }} color="danger">Your message colud not be sent. Please, try again or send an email to info@siames.social</Alert>
              <Container style={{ display: (sent ? 'none' : 'block') }}>
                <Row>
                  <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                    <div
                      className="square square-7"
                      id="square7"
                      style={{ transform: this.state.squares7and8 }}
                    />
                    <div
                      className="square square-8"
                      id="square8"
                      style={{ transform: this.state.squares7and8 }}
                    />
                    <Card className="card-register">
                      <CardHeader>
                        <CardImg
                          alt="..."
                          src={require("assets/img/square-purple-1.png")}
                        />
                        <CardTitle tag="h4">Request <span className="text-white"> beta access</span></CardTitle>
                      </CardHeader>
                      <CardBody>
                        <Form className="form">
                          <InputGroup
                            className={classnames({
                              "input-group-focus": this.state.fullNameFocus
                            })}
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-single-02" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Full Name"
                              type="text"
                              onFocus={e =>
                                this.setState({ fullNameFocus: true })
                              }
                              onBlur={e =>
                                this.setState({ fullNameFocus: false })
                              }
                              onChange={this.commonChange}
                              name="name"
                            />
                          </InputGroup>
                          <InputGroup
                            className={classnames({
                              "input-group-focus": this.state.emailFocus
                            })}
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-email-85" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Email"
                              type="text"
                              onFocus={e => this.setState({ emailFocus: true })}
                              onBlur={e => this.setState({ emailFocus: false })}
                              onChange={this.commonChange}
                              name="email"
                            />
                          </InputGroup>
                          <InputGroup
                              className={classnames({
                                "input-group-focus": this.state.descriptionFocus
                              })}
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-align-left-2" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                placeholder="Why you want try SIAMES?"
                                type="textarea"
                                onFocus={e => this.setState({ descriptionFocus: true })}
                                onBlur={e => this.setState({ descriptionFocus: false })}
                                onChange={this.commonChange}
                                name="message"
                            />
                          </InputGroup>
                          <FormGroup check className="text-left">
                            <Label check>
                              <Input type="checkbox" />
                              <span className="form-check-sign" />I agree to the{" "}
                              <a
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                              >
                                terms and conditions
                              </a>
                              .
                            </Label>
                          </FormGroup>
                        </Form>
                      </CardBody>
                      <CardFooter>
                        <Button className="btn-round" color="primary" size="lg" onClick={this.sendMail} disabled={disabledButton}>
                          Send request
                        </Button>
                      </CardFooter>
                    </Card>
                  </Col>
                </Row>
                <div className="register-bg" />
                <div
                  className="square square-1"
                  id="square1"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-2"
                  id="square2"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-3"
                  id="square3"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-4"
                  id="square4"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-5"
                  id="square5"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-6"
                  id="square6"
                  style={{ transform: this.state.squares1to6 }}
                />
              </Container>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }
}

export default RegisterPage;
