import PermanentDrawer from "./PermanentDrawer";
import { drawerWidth } from "./PermanentDrawer";
import GoogleLogin from "react-google-login";
import { GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import { useEffect } from "react";
import MaterialButton from "./Button";

const CLIENT_ID = "444809496141-4q7s60so5mb0259t22fjmk9npltumhmu.apps.googleusercontent.com";
const API_KEY = "AIzaSyDy_DzC3AUKATgQDZ1A4BCx7T6UnqbCIWU";
const SCOPES = "https://mail.google.com/";

const Mainpage = ()=>{
    const responseGoogle = (res)=>{
        console.log(res);
    }

    useEffect(()=>{
        function start(){
            gapi.client.init({
                clientId:CLIENT_ID,
                apikey:API_KEY,
                scope:SCOPES
            })
        };
        gapi.load('client:auth2', start);
    })

    async function getEmails(){
            const accessToken = gapi.auth.getToken().access_token;
            const response = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=10&q=po`,{
                method:'GET',
                headers:{'Authorization':'Bearer '+accessToken},
            });
            const data = await response.json();
            console.log(data);
    }

    return(
        <div style={{display:'grid', gridTemplateColumns:`${drawerWidth}px 1fr`}}>
            <PermanentDrawer/>
            <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
            <GoogleLogin
                clientId={CLIENT_ID}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
            <GoogleLogout
                clientId={CLIENT_ID}
                buttonText="Logout"
                onLogoutSuccess={responseGoogle}
            />
            <MaterialButton variant='outlined' text='Fetch Gmail mails' handleFunction={getEmails}/>
            </div>
        </div>
    );
}

export default Mainpage;