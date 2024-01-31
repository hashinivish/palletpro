import React from 'react';
import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react';
import { Button, Heading, Image, View, Card } from "@aws-amplify/ui-react";
import logo from './../img/PALLETPRO.png';
import { signOut } from 'aws-amplify/auth';

const LandingPage = () => (
  <View backgroundColor="#140d07">
    <Heading level={1} alignItems="center" color="#FFFFFF">Welcome to PalletPro!</Heading>
    <Image src={logo} />
    <Card>
      
      <Button onClick={Authenticator}>Sign In/Up</Button>
      <button onClick={signOut}>Sign Out</button>
    </Card>
  </View>
);

export default withAuthenticator(LandingPage);