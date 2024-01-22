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

  

useEffect(() => {
  getCurrentUser()
    .then(user => {
      const userGroups = user.signInUserSession.accessToken.payload['cognito:groups'];
      if (userGroups && userGroups.includes('Admin')) {
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