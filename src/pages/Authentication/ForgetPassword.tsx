import PropTypes from "prop-types";
import {
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Row
} from "reactstrap";

import { AuthLogo } from "Components/Common/auth-logo";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import logoLogin from "../../assets/images/login/logorotate.png";
import withRouter from "../../Components/Common/withRouter";
import { ForgetPasswordAction } from "../../slices/thunks";

const ForgetPasswordPage = () => {

  const dispatch: any = useDispatch();
  const history = useNavigate();
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
    }),
    onSubmit: (values) => {
      dispatch(ForgetPasswordAction(values)).then(
        (res: { payload: { success: any; message: any }; type: any }) => {
          if (res.type === "auth/forgetpwd/fulfilled") {
            toast.success("OTP Sent Successfully To Your Email");
            const { success, message } = res.payload;
            if (success && message === "OTP_SENT_SUCCESSFULLY") {
              history("/forgot-password-otp");
            }
          }
          else if (res.type === "auth/forgetpwd/rejected") {

            toast.error("Your Email is not registered");

          }
        }
      );
    },
  });



  document.title = "Reset Password | Ahln ";
  return (
    <Container fluid className="bg-light">
      <Row className="ahln-auth-form">
        <Col
          lg={8}
          className="login-form-ahln d-block justify-content-center align-content-center "
        >
          <Row>

            <div className="p-2 mt-4 d-flex justify-content-center align-items-center w-100">
              <img src={logoLogin} alt="" />
              <div className="wrap-form d-block justify-content-center align-items-center w-50">
                <div className="mb-3 auth-title">
                  <h1 className="text-primary auth-text-primary auth-text-bold">
                    Forgot Password?</h1>
                  <p className="text-muted" role="alert">
                    Enter your email and instructions will be sent to you!
                  </p>
                </div>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    validation.handleSubmit();
                    return false;
                  }}
                >
                  <div className="mb-5">
                    <Label className="form-label lbl">Email<span className="text-danger">*</span></Label>
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

                  <div className="text-center mt-4">
                    <button className=" auth-btn-success w-100" type="submit">
                      Send Reset Link
                    </button>
                  </div>
                  <div className="mt-4 ">
                    <p className="mb-0">
                      Wait, I remember my password...
                      <Link
                        to="/login"
                        className="fw-semibold text-primary text-decoration-underline"
                      >
                        Click here
                      </Link>
                    </p>
                  </div>
                </Form>
              </div>
            </div>
          </Row>
        </Col>
        <AuthLogo />
      </Row>
    </Container>

  );
};

ForgetPasswordPage.propTypes = {
  history: PropTypes.object,
};

export default withRouter(ForgetPasswordPage);
