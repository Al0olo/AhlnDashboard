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

//redux
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import withRouter from "../../Components/Common/withRouter";

import { AuthLogo } from "Components/Common/auth-logo";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import logoLogin from "../../assets/images/login/logorotate.png";
import { VerifyOtp } from "../../slices/thunks";

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

          }
          else {
            toast.error("Wrong OTP OR E-Mail");

          }
        }
      );
    },
  });


  document.title = "Verify Email | Ahln ";
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
                  <h1
                    className="auth-text-primary font-weight-bold"
                    style={{ fontSize: "27px", fontWeight: "900" }}
                  >
                    Verify Email
                  </h1>
                  <p className="text-muted">Verify Your Email with Ahln</p>
                </div>
                <Form
                  className="verify-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    validation.handleSubmit();
                    return false;
                  }}
                >
                  <div className="mb-2 mt-5">
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

                  <div className="mb-2 ">
                    <Label className="form-label lbl">OTP<span className="text-danger">*</span></Label>
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
                  <div className="mb-2">
                    <Label htmlFor="userpassword" className="form-label lbl">
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
                    <button className="auth-btn-success w-100" type="submit">
                      Verify Email
                    </button>
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

ForgetPasswordOtpPage.propTypes = {
  history: PropTypes.object,
};

export default withRouter(ForgetPasswordOtpPage);
