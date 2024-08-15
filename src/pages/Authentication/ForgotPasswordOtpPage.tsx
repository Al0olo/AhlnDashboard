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
import logoLogin from "../../assets/images/login/logorotate.png";
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

  document.title = "Verify Email | Ahln ";
  return (
    <Container fluid className="bg-light">
      <Row className="ahln-auth-form w-100">
        <Col lg={8} className="login-form-ahln d-flex justify-content-center">
          <Row>
            <div className="text-center mb-2">
              <h5 className="" style={{ color: "rgba(255,255,255,0)" }}>
                Welcome Back!
              </h5>
              <p className="" style={{ color: "rgba(255,255,255,0)" }}>
                Sign in to continue to Ahln.
              </p>
            </div>
            <div className="mt-2 auth-verify auth-title">
              <h3
                className="auth-text-primary font-weight-bold"
                style={{ fontSize: "27px", fontWeight: "900" }}
              >
                Verify Email
              </h3>
              <p className="text-muted">Verify Your Email with Ahln</p>
            </div>

            <div className="">
              {/* {verifyError && verifyError ? (
                <Alert color="danger" style={{ marginTop: "13px" }}>
                  {verifyError}
                </Alert>
              ) : null}
              {verifySuccessMsg ? (
                <Alert color="success" style={{ marginTop: "13px" }}>
                  {verifySuccessMsg}
                </Alert>
              ) : null} */}

              <img src={logoLogin} alt="" />
              <Form
              className="verify-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <div className="mb-2 mt-3">
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
          </Row>
        </Col>

        <Col
          lg={4}
          className="auth-login-ahln p-0 flex-d justify-content-center  align-content-center"
        >
          <Row>
            <svg
              width="429"
              height="252"
              viewBox="0 0 429 252"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M130.738 228.932V201.55H135.634V228.932H130.738ZM150.056 229.027C145.293 229.027 143.338 227.433 143.338 223.429V211.854H140.112V208.191H143.338V203.106H148.139V208.191H152.523V211.854H148.139V222.31C148.139 224.378 148.955 225.251 150.929 225.251C151.593 225.251 151.953 225.232 152.523 225.175V228.818C151.84 228.951 150.967 229.027 150.056 229.027ZM164.8 229.35C159.525 229.35 156.337 226.921 155.938 223.41V223.372H160.626L160.645 223.41C161.138 224.852 162.523 225.858 164.876 225.858C167.229 225.858 168.861 224.795 168.861 223.239V223.201C168.861 221.987 167.95 221.19 165.673 220.678L162.314 219.919C158.367 219.046 156.489 217.186 156.489 214.131V214.112C156.489 210.374 159.904 207.793 164.8 207.793C169.848 207.793 172.865 210.298 173.169 213.656V213.694H168.728L168.709 213.637C168.368 212.328 167.002 211.265 164.781 211.265C162.675 211.265 161.157 212.29 161.157 213.846V213.865C161.157 215.08 162.03 215.82 164.269 216.332L167.628 217.072C171.689 217.983 173.605 219.71 173.605 222.727V222.765C173.605 226.712 169.905 229.35 164.8 229.35ZM178.615 212.954L180.266 201.55H185.143L181.86 212.954H178.615ZM196.832 229.35C191.557 229.35 188.369 226.921 187.97 223.41V223.372H192.657L192.676 223.41C193.17 224.852 194.555 225.858 196.908 225.858C199.261 225.858 200.893 224.795 200.893 223.239V223.201C200.893 221.987 199.982 221.19 197.705 220.678L194.346 219.919C190.399 219.046 188.521 217.186 188.521 214.131V214.112C188.521 210.374 191.936 207.793 196.832 207.793C201.88 207.793 204.897 210.298 205.201 213.656V213.694H200.76L200.741 213.637C200.4 212.328 199.033 211.265 196.813 211.265C194.707 211.265 193.189 212.29 193.189 213.846V213.865C193.189 215.08 194.062 215.82 196.301 216.332L199.66 217.072C203.72 217.983 205.637 219.71 205.637 222.727V222.765C205.637 226.712 201.937 229.35 196.832 229.35Z"
                fill="white"
              />
              <path
                d="M214.976 228.932V201.55H232.434V205.667H219.872V213.77H231.353V217.755H219.872V228.932H214.976ZM239.797 204.719C238.241 204.719 236.97 203.485 236.97 201.929C236.97 200.392 238.241 199.14 239.797 199.14C241.334 199.14 242.606 200.392 242.606 201.929C242.606 203.485 241.334 204.719 239.797 204.719ZM237.425 228.932V208.191H242.15V228.932H237.425ZM247.957 228.932V208.191H252.682V211.36H253.005C253.991 209.14 255.984 207.793 258.982 207.793C263.612 207.793 266.136 210.582 266.136 215.516V228.932H261.411V216.617C261.411 213.391 260.102 211.759 257.236 211.759C254.428 211.759 252.682 213.732 252.682 216.844V228.932H247.957ZM277.37 229.274C273.423 229.274 270.558 226.845 270.558 223.069V223.031C270.558 219.33 273.385 217.167 278.433 216.863L283.765 216.541V214.757C283.765 212.689 282.418 211.55 279.875 211.55C277.712 211.55 276.307 212.328 275.833 213.694L275.814 213.77H271.355L271.374 213.6C271.829 210.108 275.169 207.793 280.103 207.793C285.435 207.793 288.433 210.374 288.433 214.757V228.932H283.765V226.086H283.442C282.304 228.097 280.103 229.274 277.37 229.274ZM275.226 222.841C275.226 224.606 276.725 225.649 278.812 225.649C281.659 225.649 283.765 223.79 283.765 221.323V219.653L279.097 219.957C276.459 220.127 275.226 221.095 275.226 222.803V222.841ZM294.297 228.932V200.164H299.022V228.932H294.297ZM305.189 228.932V200.164H309.914V228.932H305.189ZM318.112 236.219C317.543 236.219 316.878 236.2 316.309 236.143V232.519C316.689 232.557 317.22 232.576 317.713 232.576C319.649 232.576 320.807 231.779 321.319 229.9L321.566 228.951L314.146 208.191H319.307L324.146 224.397H324.507L329.327 208.191H334.299L326.86 229.369C325.076 234.568 322.704 236.219 318.112 236.219Z"
                fill="white"
              />
              <path
                d="M342.216 228.932V201.55H347.112V212.935H360.433V201.55H365.31V228.932H360.433V217.053H347.112V228.932H342.216ZM380.472 229.35C374.304 229.35 370.566 225.213 370.566 218.609V218.59C370.566 212.062 374.342 207.793 380.244 207.793C386.145 207.793 389.789 211.93 389.789 218.192V219.748H375.291C375.348 223.467 377.36 225.63 380.566 225.63C383.128 225.63 384.589 224.34 385.045 223.391L385.102 223.258H389.599L389.542 223.429C388.878 226.105 386.108 229.35 380.472 229.35ZM380.301 211.493C377.663 211.493 375.69 213.277 375.329 216.579H385.178C384.855 213.182 382.939 211.493 380.301 211.493ZM394.514 228.932V208.191H399.239V211.379H399.562C400.264 209.159 402.161 207.85 404.894 207.85C405.615 207.85 406.355 207.945 406.811 208.077V212.309C406.051 212.157 405.273 212.043 404.457 212.043C401.307 212.043 399.239 213.922 399.239 216.882V228.932H394.514ZM419.031 229.35C412.864 229.35 409.126 225.213 409.126 218.609V218.59C409.126 212.062 412.902 207.793 418.803 207.793C424.705 207.793 428.348 211.93 428.348 218.192V219.748H413.851C413.908 223.467 415.919 225.63 419.126 225.63C421.688 225.63 423.149 224.34 423.604 223.391L423.661 223.258H428.159L428.102 223.429C427.438 226.105 424.667 229.35 419.031 229.35ZM418.86 211.493C416.223 211.493 414.249 213.277 413.889 216.579H423.737C423.415 213.182 421.498 211.493 418.86 211.493Z"
                fill="white"
              />
              <path
                d="M123.176 120.936L136.406 162.322C136.431 162.405 136.439 162.493 136.427 162.579C136.416 162.666 136.386 162.748 136.34 162.818C136.294 162.889 136.234 162.947 136.164 162.986C136.094 163.026 136.016 163.046 135.938 163.045L109.98 163.02C109.88 163.019 109.783 162.985 109.702 162.921C109.62 162.858 109.558 162.768 109.523 162.665L95.4371 120.568C95.4024 120.465 95.3401 120.375 95.2586 120.312C95.177 120.248 95.0801 120.214 94.9805 120.213H40.5762C40.472 120.213 40.3704 120.25 40.2862 120.319C40.2021 120.387 40.1397 120.483 40.1082 120.594L27.8484 162.639C27.8169 162.75 27.7545 162.846 27.6704 162.915C27.5862 162.983 27.4847 163.02 27.3804 163.02L1.4225 163.033C1.34399 163.033 1.26647 163.013 1.19645 162.974C1.12643 162.934 1.06596 162.877 1.02011 162.806C0.974261 162.735 0.944372 162.653 0.932953 162.567C0.921534 162.48 0.928918 162.392 0.954484 162.31L52.5735 0.367636C52.6063 0.261609 52.6678 0.169407 52.7495 0.103589C52.8312 0.0377707 52.9292 0.00153498 53.0301 -0.000183105L84.3531 0.0378672C84.454 0.0395853 84.552 0.075821 84.6337 0.141639C84.7154 0.207458 84.7768 0.299659 84.8097 0.405687L115.733 97.5861C115.766 97.6921 115.827 97.7843 115.909 97.8502C115.991 97.916 116.089 97.9522 116.19 97.9539L177.066 97.9793C177.197 97.9793 177.321 97.9218 177.413 97.8196C177.506 97.7173 177.557 97.5786 177.557 97.4339L177.534 87.0969C177.532 86.9994 177.554 86.9031 177.596 86.8179C177.639 86.7327 177.702 86.6618 177.777 86.6126C177.853 86.5634 177.939 86.5377 178.027 86.5381C178.115 86.5385 178.201 86.565 178.276 86.6149L212.853 108.811C212.926 108.859 212.987 108.928 213.029 109.01C213.071 109.092 213.093 109.186 213.093 109.28C213.093 109.375 213.071 109.468 213.029 109.55C212.987 109.633 212.926 109.701 212.853 109.75L178.299 131.946C178.224 131.995 178.138 132.022 178.05 132.022C177.962 132.023 177.876 131.997 177.8 131.948C177.724 131.899 177.662 131.828 177.619 131.743C177.576 131.657 177.555 131.561 177.557 131.464L177.591 120.733C177.591 120.589 177.54 120.45 177.448 120.348C177.356 120.245 177.231 120.188 177.101 120.188L123.644 120.213C123.565 120.213 123.488 120.233 123.418 120.272C123.348 120.312 123.287 120.369 123.241 120.44C123.196 120.511 123.166 120.593 123.154 120.679C123.143 120.766 123.15 120.854 123.176 120.936ZM48.6239 97.2437C48.6017 97.3091 48.5941 97.3796 48.6018 97.449C48.6096 97.5184 48.6324 97.5847 48.6684 97.6421C48.7044 97.6996 48.7523 97.7464 48.8082 97.7786C48.8641 97.8108 48.9262 97.8275 48.9892 97.8271H88.1201C88.183 97.8275 88.2451 97.8108 88.301 97.7786C88.3569 97.7464 88.4049 97.6996 88.4408 97.6421C88.4768 97.5847 88.4996 97.5184 88.5074 97.449C88.5151 97.3796 88.5076 97.3091 88.4853 97.2437L68.9199 34.8539C68.8929 34.7703 68.8433 34.698 68.7779 34.6469C68.7125 34.5958 68.6345 34.5684 68.5546 34.5684C68.4747 34.5684 68.3967 34.5958 68.3313 34.6469C68.2659 34.698 68.2163 34.7703 68.1893 34.8539L48.6239 97.2437Z"
                fill="white"
              />
              <path
                d="M169.943 54.056C171.986 52.9272 174.201 51.0373 176.564 49.9339C185.536 45.7399 194.961 44.6111 204.839 46.5474C219.519 49.4223 229.853 58.1189 235.842 72.6372C238.825 79.8668 240.347 88.6352 240.408 98.9426C240.439 105.318 240.408 126.58 240.317 162.728C240.317 162.77 240.309 162.813 240.294 162.852C240.279 162.891 240.257 162.927 240.229 162.956C240.201 162.986 240.169 163.009 240.133 163.024C240.097 163.039 240.058 163.046 240.02 163.045L217.304 162.994C216.923 162.994 216.733 162.783 216.733 162.36C216.688 122.035 216.661 100.689 216.653 98.3211C216.63 79.1184 202.955 65.4964 185.547 70.9503C182.693 71.8466 179.661 73.9774 176.449 77.3428C172.614 81.3676 170.304 86.1239 169.52 91.6116C169.491 91.8065 169.4 91.9835 169.264 92.1111C169.128 92.2388 168.956 92.309 168.778 92.3092L144.636 92.3472C144.538 92.3472 144.442 92.3259 144.352 92.2845C144.262 92.2431 144.18 92.1823 144.111 92.1058C144.042 92.0292 143.987 91.9383 143.95 91.8383C143.913 91.7383 143.894 91.6311 143.894 91.5228L143.905 0.316304C143.908 0.234425 143.939 0.156995 143.992 0.100246C144.046 0.0434969 144.117 0.0118364 144.19 0.011902L168.744 0.0372688C169.117 0.0372688 169.304 0.244431 169.304 0.658757L169.269 53.6121C169.269 54.1532 169.494 54.3012 169.943 54.056Z"
                fill="white"
              />
              <path
                d="M279.197 0.0119019H255.202C254.874 0.0119019 254.608 0.307187 254.608 0.67144V162.36C254.608 162.724 254.874 163.019 255.202 163.019H279.197C279.524 163.019 279.79 162.724 279.79 162.36V0.67144C279.79 0.307187 279.524 0.0119019 279.197 0.0119019Z"
                fill="white"
              />
              <path
                d="M317.94 55.008C326.171 48.0321 336.535 45.9393 348.099 46.7764C355.549 47.3091 362.383 49.7655 368.6 54.1455C380.929 62.8336 386.568 78.1172 386.887 94.1363C387.154 107.632 387.199 130.364 387.024 162.335C387.024 162.783 386.823 163.007 386.419 163.007L361.968 163.02C361.927 163.02 361.886 163.011 361.848 162.993C361.809 162.975 361.775 162.948 361.746 162.915C361.717 162.882 361.695 162.843 361.68 162.8C361.665 162.757 361.659 162.711 361.66 162.665C361.683 129.866 361.694 109.893 361.694 102.748C361.694 96.2798 361.888 90.0142 359.503 84.9662C355.127 75.7073 347.859 71.3189 337.7 71.8008C326.49 72.3208 317.415 82.1505 317.415 94.8212C317.438 123.816 317.438 146.333 317.415 162.373C317.415 162.813 317.217 163.033 316.822 163.033L292.587 163.007C292.207 163.007 292.017 162.796 292.017 162.373L292.028 46.9033C292.028 46.8158 292.059 46.7319 292.115 46.6701C292.171 46.6082 292.246 46.5735 292.325 46.5735L316.548 46.5862C316.943 46.5862 317.145 46.806 317.153 47.2457L317.175 54.5894C317.175 55.2997 317.43 55.4392 317.94 55.008Z"
                fill="white"
              />
              <path
                d="M168.738 128.125L144.492 128.078C144.171 128.078 143.91 128.367 143.909 128.724L143.856 162.361C143.856 162.718 144.116 163.008 144.437 163.009L168.683 163.056C169.005 163.056 169.266 162.767 169.266 162.41L169.319 128.773C169.32 128.416 169.059 128.126 168.738 128.125Z"
                fill="white"
              />
              <path
                d="M426.999 145.593V151.161C425.356 158.238 421.638 162.191 415.847 163.02C409.637 163.92 403.975 160.788 401.681 154.256C399.984 149.436 400.383 144.823 402.879 140.418C404.591 137.408 406.989 135.455 410.071 134.558C412.902 133.73 415.653 133.802 418.324 134.774C422.654 136.364 425.546 139.97 426.999 145.593Z"
                fill="white"
              />
              <path
                d="M237.555 179.102C238.64 179.102 239.519 178.126 239.519 176.921C239.519 175.716 238.64 174.739 237.555 174.739C236.471 174.739 235.592 175.716 235.592 176.921C235.592 178.126 236.471 179.102 237.555 179.102Z"
                fill="white"
              />
            </svg>
          </Row>
        </Col>
      </Row>
    </Container>

    // <Container>
    //   <Row>
    //     <Col lg={12}>
    //       <div className="text-center mt-sm-5 mb-4 text-white-50">
    //         <div>
    //           <Link to="/" className="d-inline-block auth-logo">
    //             <img src={logoLight} alt="" height="20" />
    //           </Link>
    //         </div>
    //         <p className="mt-3 fs-15 fw-medium">
    //           Premium Admin & Dashboard Template
    //         </p>
    //       </div>
    //     </Col>
    //   </Row>

    //   <Row className="justify-content-center">
    //     <Col md={8} lg={6} xl={5}>
    //       <Card className="mt-4">
    //         <CardBody className="p-4">
    //           <div className="text-center mt-2">
    //             <h5 className="text-primary">Verify Email</h5>
    //             <p className="text-muted">Verify Your Email with Ahln</p>

    //             <i className="ri-mail-send-line display-5 text-success mb-3"></i>
    //           </div>

    //           <p
    //             className="text-muted"
    //             role="alert"
    //           >
    //             Enter your email and otp sent to it!
    //           </p>
    //           <div className="p-2">
    //             {verifyError && verifyError ? (
    //               <Alert color="danger" style={{ marginTop: "13px" }}>
    //                 {verifyError}
    //               </Alert>
    //             ) : null}
    //             {verifySuccessMsg ? (
    //               <Alert color="success" style={{ marginTop: "13px" }}>
    //                 {verifySuccessMsg}
    //               </Alert>
    //             ) : null}
    //             <Form
    //               onSubmit={(e) => {
    //                 e.preventDefault();
    //                 validation.handleSubmit();
    //                 return false;
    //               }}
    //             >
    //               <div className="mb-4">
    //                 <Label className="form-label">Email</Label>
    //                 <Input
    //                   name="email"
    //                   className="form-control"
    //                   placeholder="Enter email"
    //                   type="email"
    //                   onChange={validation.handleChange}
    //                   onBlur={validation.handleBlur}
    //                   value={validation.values.email || ""}
    //                   invalid={
    //                     validation.touched.email && validation.errors.email
    //                       ? true
    //                       : false
    //                   }
    //                 />
    //                 {validation.touched.email && validation.errors.email ? (
    //                   <FormFeedback type="invalid">
    //                     <div>{validation.errors.email}</div>
    //                   </FormFeedback>
    //                 ) : null}
    //               </div>

    //               <div className="mb-4">
    //                 <Label className="form-label">OTP</Label>
    //                 <Input
    //                   name="otp"
    //                   className="form-control"
    //                   placeholder="Enter otp"
    //                   type="text"
    //                   onChange={validation.handleChange}
    //                   onBlur={validation.handleBlur}
    //                   value={validation.values.otp || ""}
    //                   invalid={
    //                     validation.touched.otp && validation.errors.otp
    //                       ? true
    //                       : false
    //                   }
    //                 />
    //                 {validation.touched.otp && validation.errors.otp ? (
    //                   <FormFeedback type="invalid">
    //                     <div>{validation.errors.otp}</div>
    //                   </FormFeedback>
    //                 ) : null}
    //               </div>
    //               <div className="mb-3">
    //                 <Label htmlFor="userpassword" className="form-label">
    //                   New Password <span className="text-danger">*</span>
    //                 </Label>
    //                 <Input
    //                   name="newPassword"
    //                   type="password"
    //                   placeholder="Enter Password"
    //                   onChange={validation.handleChange}
    //                   onBlur={validation.handleBlur}
    //                   value={validation.values.newPassword || ""}
    //                   invalid={
    //                     validation.touched.newPassword &&
    //                     validation.errors.newPassword
    //                       ? true
    //                       : false
    //                   }
    //                 />
    //                 {validation.touched.newPassword &&
    //                 validation.errors.newPassword ? (
    //                   <FormFeedback type="invalid">
    //                     <div>{validation.errors.newPassword}</div>
    //                   </FormFeedback>
    //                 ) : null}
    //               </div>
    //               <div className="text-center mt-4">
    //                 <button className="btn btn-success w-100" type="submit">
    //                   Verify Email
    //                 </button>
    //               </div>
    //             </Form>
    //           </div>
    //         </CardBody>
    //       </Card>
    //     </Col>
    //   </Row>
    // </Container>
    // </div>
    // </ParticlesAuth>
  );
};

ForgetPasswordOtpPage.propTypes = {
  history: PropTypes.object,
};

export default withRouter(ForgetPasswordOtpPage);
function setLoader(arg0: boolean) {
  throw new Error("Function not implemented.");
}
