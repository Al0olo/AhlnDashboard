
import { LogoSVG } from 'common/icons'
import { Col } from 'reactstrap'

export const AuthLogo = () => {
    return (
        <Col
            md={4}
            className="auth-login-ahln flex-d justify-content-center align-content-center"
        >
            <div className="align-self-center align-items-center justify-content-center d-flex">
                <LogoSVG />
            </div>
        </Col>
    )
}


