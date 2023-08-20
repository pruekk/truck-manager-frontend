import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

import { useNavigate } from "react-router-dom";
import * as Constants from "./constants/Constants";

//Services
import { LoginWithGoogle } from "./services/LoginServices";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';


const LoginContainer = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#ffffff",
  padding: (theme) => theme.spacing(8, 4),
  borderRadius: "10px",
  boxShadow: "0px 3px 6px #00000029",
});

const LoginPage = (props) => {
    const navigate = useNavigate();

    const loginWithGoogle = async (credentialResponse) => {
        const response = await LoginWithGoogle(credentialResponse.credential);

        if (response.success) {
            localStorage.setItem('isLoggedIn', JSON.stringify(true));
            localStorage.setItem('userToken', credentialResponse.credential);
            localStorage.setItem('userObject', JSON.stringify(response.data));
            props.onLogIn();
            return navigate("/");
        }

        localStorage.setItem('isLoggedIn', JSON.stringify(false));
        return;
    }
    return (
        <div style={{ width: "75%", margin: "auto" }}>
        <Grid container component="main" sx={{ height: "75vh", marginTop: "10%" }}>
            <Grid item xs={false} sm={4} md={7} sx={{ backgroundImage: "url('https://images-global.nhst.tech/image/SEZRdU1DUys3M2s1VjdNR2IwT3JaZzQ4SnNiblNCZUIvRk9QNEt4SE1mZz0=/nhst/binary/92885359a07529500b8c0f7f0584a800')", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }} />
            <Grid item xs={12} sm={8} md={5} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <LoginContainer>
                    <Grid item align="center" xs={12}>
                        <GoogleOAuthProvider clientId={Constants.GOOGLE_OAUTH_CLIENT_ID}>
                            <GoogleLogin
                                onSuccess={credentialResponse => {
                                    loginWithGoogle(credentialResponse);
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                                cookiePolicy={'single_host_origin'}
                                width="285"
                            />
                        </GoogleOAuthProvider>
                    </Grid>
                </LoginContainer>
            </Grid>
        </Grid>
        </div>
    );
};

export default LoginPage;
