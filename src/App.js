import logo from './img/PALLETPRO.png'
import './App.css';
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from 'aws-amplify';
import config from './aws-exports';
import { fetchAuthSession } from 'aws-amplify/auth';
import AdminPage from './Pages/AdminPage';
import EmployeePage from './Pages/EmployeePage';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '@aws-amplify/auth';
import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,} from "@aws-amplify/ui-react";
  Amplify.configure(config);


function App({signOut}) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

async function currentSession() {
  try {
    const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
    return accessToken;
  } catch (err) {
    console.log(err);
  }
}

useEffect(() => {
  currentSession()
    .then(accessToken => {
      // console.log(accessToken);
      
      const userGroups = accessToken.payload['cognito:groups'];
      // console.log(userGroups);
      if (userGroups && userGroups[0] == 'Admin') {
        setIsAdmin(true); 
      }
      setIsLoading(false);
    })
    .catch(err => {
      console.log('Error getting current user:', err);
      setIsLoading(false);
    });
}, []);

  return (
    <View>
      <Heading level={1}>Welcome to Amplify!</Heading>
      <Image src={logo} />
      {isAdmin ?  <AdminPage /> : < EmployeePage /> }
      <Card>
        <Button onClick={signOut}>Sign out</Button>
      </Card>
    </View>
  );
}

export default withAuthenticator(App);