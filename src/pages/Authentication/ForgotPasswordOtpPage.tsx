import PropTypes from "prop-types";
import {
  Row,
  Col,
  Alert,
  Card,
  CardBody,
  Container,
  FormFeedback,
  Input,
  Label,
  Form,
} from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import withRouter from "../../Components/Common/withRouter";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// action
import { VerifyOtp } from "../../slices/thunks";

// import images
// import profile from "../../assets/images/bg.png";
import logoLight from "../../assets/images/ahln_logo.jpeg";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import { createSelector } from "reselect";
import { toast } from "react-toastify";

const ForgetPasswordOtpPage = (props: any) => {
  const dispatch: any = useDispatch();
  const history = useNavigate();
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
      otp: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      otp: Yup.string().required("Please Enter Your OTP Sent To Your Email"),
      newPassword: Yup.string().required("Please Enter Your New Password"),
    }),
    onSubmit: (values) => {
      dispatch(VerifyOtp(values)).then(
        (res: {
          payload: { success: any; message: any; token: any };
          type: any;
        }) => {
          if (res.type === "auth/verifyOtp/fulfilled") {
            toast.success("Password Updated successfully");
            const { success, message } = res.payload;
            if (success && message === "PASSWORD_RESET_SUCCESS") {
              history("/login");
            }
            // setLoader(false);
          }
        }
      );
    },
  });

  const selectLayoutState = (state: any) => state;
  const verifyEmailPageData = createSelector(selectLayoutState, (state) => ({
    verifyError: state.Login.error,
    loading: state.Login.loading,
    errorMsg: state.Login.errorMsg,
    verifySuccessMsg: state.Login.success,
  }));

  const { verifyError, verifySuccessMsg } = useSelector(verifyEmailPageData);

  document.title = "Verify Email | Ahln - React Admin & Dashboard";
  return (
    <ParticlesAuth>
      <div className="auth-page-content mt-lg-5">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mt-sm-5 mb-4 text-white-50">
                <div>
                  <Link to="/" className="d-inline-block auth-logo">
                    <img src={logoLight} alt="" height="20" />
                  </Link>
                </div>
                <p className="mt-3 fs-15 fw-medium">
                  Premium Admin & Dashboard Template
                </p>
              </div>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="mt-4">
                <CardBody className="p-4">
                  <div className="text-center mt-2">
                    <h5 className="text-primary">Verify Email</h5>
                    <p className="text-muted">Verify Your Email with Ahln</p>

                    <i className="ri-mail-send-line display-5 text-success mb-3"></i>
                  </div>

                  <Alert
                    className="border-0 alert-warning text-center mb-2 mx-2"
                    role="alert"
                  >
                    Enter your email and otp sent to it!
                  </Alert>
                  <div className="p-2">
                    {verifyError && verifyError ? (
                      <Alert color="danger" style={{ marginTop: "13px" }}>
                        {verifyError}
                      </Alert>
                    ) : null}
                    {verifySuccessMsg ? (
                      <Alert color="success" style={{ marginTop: "13px" }}>
                        {verifySuccessMsg}
                      </Alert>
                    ) : null}
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      <div className="mb-4">
                        <Label className="form-label">Email</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
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

                      <div className="mb-4">
                        <Label className="form-label">OTP</Label>
                        <Input
                          name="otp"
                          className="form-control"
                          placeholder="Enter otp"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.otp || ""}
                          invalid={
                            validation.touched.otp && validation.errors.otp
                              ? true
                              : false
                          }
                        />
                        {validation.touched.otp && validation.errors.otp ? (
                          <FormFeedback type="invalid">
                            <div>{validation.errors.otp}</div>
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label htmlFor="userpassword" className="form-label">
                          New Password <span className="text-danger">*</span>
                        </Label>
                        <Input
                          name="newPassword"
                          type="password"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.newPassword || ""}
                          invalid={
                            validation.touched.newPassword &&
                            validation.errors.newPassword
                              ? true
                              : false
                          }
                        />
                        {validation.touched.newPassword &&
                        validation.errors.newPassword ? (
                          <FormFeedback type="invalid">
                            <div>{validation.errors.newPassword}</div>
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="text-center mt-4">
                        <button className="btn btn-success w-100" type="submit">
                          Verify Email
                        </button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </ParticlesAuth>
  );
};

ForgetPasswordOtpPage.propTypes = {
  history: PropTypes.object,
};

export default withRouter(ForgetPasswordOtpPage);
function setLoader(arg0: boolean) {
  throw new Error("Function not implemented.");
}
