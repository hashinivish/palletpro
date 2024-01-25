import React from 'react';
import { Heading, Image, View, Card, Button, Grid, useTheme, Flex } from "@aws-amplify/ui-react";
import logo from './../img/LOGO.png';
import map from './../img/Map.png';


const AdminPage = ({ signOut }) => {
  const { tokens } = useTheme();

  return (
    <Grid
    style={{
      height: '100vh',
      width: '100vw',
    }}
    // columnGap="0.5rem"
    // rowGap="0.5rem"
    templateColumns="2fr 1fr"
    templateRows="1fr 7fr"
  >
    <Card
      columnStart="1"
      columnEnd="-1"
      backgroundColor="#140d07"
      width="100%"
      height="100%"
    >
      <Flex alignItems="center" justifyContent="space-between">
            <Image src={logo} width="6%" />
          <Flex>
          <Button colorTheme="info" variation="default" backgroundColor="#4fb9af" >
            Change Map
          </Button>
          <Button colorTheme="info" variation="default" backgroundColor="#4fb9af"  >
            Add a Pallet
          </Button>
          <Button colorTheme="info" variation="default" backgroundColor="#4fb9af"  >
            Employee Details
          </Button>
          <Button colorTheme="info" variation="default" backgroundColor="#4fb9af" onClick={signOut}>Sign out</Button>
          </Flex>
        </Flex>
    </Card>
    <Card
      columnStart="1"
      columnEnd="2"
      backgroundColor="#140d07"
    >
     <Image src={map}/>
    </Card>
    <Card
      columnStart="2"
      columnEnd="-1"
      backgroundColor="#140d07"
    >
      Main
    </Card>
  </Grid>
  );
};

export default AdminPage;
