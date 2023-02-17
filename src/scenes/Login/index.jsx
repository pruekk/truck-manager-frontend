import React from "react";
import { useNavigate } from "react-router-dom";

//Material UI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// import Typography from "@mui/material/Typography";

//Constants
import * as Constants from "./constants/Constants";

//Services
import { LoginWithGoogle } from "./services/LoginServices";

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

export default function Login(props) {
    const navigate = useNavigate();

    const loginWithGoogle = async (credentialResponse) => {
        const response = await LoginWithGoogle(credentialResponse.credential);

        if (response.success) {
            localStorage.setItem('isLoggedIn', JSON.stringify(true));
            props.onLogIn();
            
            return navigate("/");
        }

        localStorage.setItem('isLoggedIn', JSON.stringify(false));
        return;
    }

    return (
        <Container sx={{ paddingTop: "2rem", marginLeft: "1rem" }} maxWidth="xl">
            <Grid container spacing={2} sx={{ paddingLeft: "1rem" }}>
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
            </Grid>
        </Container>
    );
}