import {
  Button,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
  Spinner
} from "reactstrap";

import { LogoSVG } from "common/icons";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "redux-hooks";
import * as Yup from "yup";
import logoLogin from "../../assets/images/login/logorotate.png";
import { LoginAction } from "../../slices/thunks";

const Login = (props: any) => {
  let { loading } = useAppSelector((state) => state.Login);
  const history = useNavigate();
  const dispatch: any = useDispatch();

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: process.env.NODE_ENV === 'development' && "abdelrahmanaosman99@gmail.com",
      password: process.env.NODE_ENV === 'development' && "adminadmin",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please enter your password"),
    }),
    onSubmit: (values) => {
      console.log(values);
      dispatch(LoginAction(values)).then((res: { payload: any; type: any }) => {
        if (res.type === "auth/login/fulfilled") {

          toast("Login successful", {
            position: "top-right",
            hideProgressBar: false,
            className: "bg-success text-white",
          });
          history("/dashboard")
        } else if (res.type === "auth/login/rejected") {

          toast(res.payload, {
            position: "top-right",
            hideProgressBar: false,
            className: "bg-danger text-white",
          });
        }
      });
    },
  });

  document.title = "Ahln | Login";

  return (

    <Container fluid className="bg-light">

      <Row className="ahln-auth-form">
        <Col
          lg={8}
          className="login-form-ahln d-flex justify-content-center align-content-center "
        >
          <Row>
            <div className="p-2 mt-4 d-flex justify-content-center align-items-center w-100">
              <img src={logoLogin} alt="" />
              <div className="d-block justify-content-center align-items-center w-100">
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    validation.handleSubmit();
                    return false;
                  }}
                  className="needs-validation w-100 block-d"
                  action="#"
                >
                  <div className="mb-3 auth-title">
                    <h3 className="text-primary auth-text-primary auth-text-bold">
                      Sign In:
                    </h3>
                    <p className="text-muted">
                      Enter your email and password to sign in
                    </p>
                  </div>
                  <div className="mb-3">
                    <Label
                      htmlFor="useremail"
                      className="form-label auth-text-primary lbl"
                    >
                      Email <span className="text-danger">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter email address"
                      type="email"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.email || ""}
                      invalid={
                        validation.touched.email && validation.errors.email
                          ? true
                          : false
                      }
                    />
                    {validation.touched.email && validation.errors.email ? (
                      <FormFeedback type="invalid">
                        <div>{validation.errors.email}</div>
                      </FormFeedback>
                    ) : null}
                  </div>

                  <div className="mb-3">
                    <Label
                      htmlFor="userpassword"
                      className="form-label auth-text-primary lbl"
                    >
                      Password <span className="text-danger">*</span>
                    </Label>
                    <Input
                      name="password"
                      type="password"
                      placeholder="Enter Password"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.password || ""}
                      invalid={
                        validation.touched.password &&
                          validation.errors.password
                          ? true
                          : false
                      }
                    />
                    {validation.touched.password &&
                      validation.errors.password ? (
                      <FormFeedback type="invalid">
                        <div>{validation.errors.password}</div>
                      </FormFeedback>
                    ) : null}
                  </div>
                  <Row >
                    <Col md={12} className="remeeber-div">
                      <Col md={4} className="remeber">
                        <div className="auth-form-check w-100">
                          <Input
                            className="form-control"
                            type="checkbox"
                            value=""
                            id="auth-remember-check"
                          />
                          <label htmlFor="">Remember me</label>
                        </div>
                      </Col>

                      <Col md={3} className="remeber">
                        <div className="mt-3 w-100">
                          <Link
                            className="text-muted fs-13 a-forget"
                            to="/forgot-password"
                          >
                            Forgot password?
                          </Link>
                        </div>
                      </Col></Col>
                  </Row>
                  <div className="">
                    <Button
                      color="success"
                      className="w-100 auth-btn-success pt-5 pb-5"
                      type="submit"
                      disabled={loading && true}
                    >
                      {loading && <Spinner size="sm"> Loading... </Spinner>}
                      Sign In
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </Row>
        </Col>

        <Col
          md={4}
          className="auth-login-ahln flex-d justify-content-center align-content-center"
        >
          <div className="align-self-center align-items-center justify-content-center d-flex">
            <LogoSVG />
          </div>
        </Col>
      </Row>
    </Container>

  );
};

export default Login;
