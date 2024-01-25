import React from 'react';
import { Heading, Image, View, Card, Button } from "@aws-amplify/ui-react";
import logo from './../img/PALLETPRO.png';

const EmployeePage = ({ signOut }) => (
  <View>
    <Heading level={1}>Welcome to Employee Page!</Heading>
    <Image src={logo} />
    {/* Employee-specific content */}
    <Card>
      <Button onClick={signOut}>Sign out</Button>
    </Card>
  </View>
);

export default EmployeePage;