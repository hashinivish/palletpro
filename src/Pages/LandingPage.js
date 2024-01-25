import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Button, Heading, Image, View, Card } from "@aws-amplify/ui-react";
import logo from './../img/PALLETPRO.png';

const LandingPage = () => (
  <View backgroundColor="#140d07">
    <Heading level={1} alignItems="center" color="#FFFFFF">Welcome to PalletPro!</Heading>
    <Image src={logo} />
    <Card>
      
      <Button>Sign In/Up</Button>
    </Card>
  </View>
);

export default withAuthenticator(LandingPage);