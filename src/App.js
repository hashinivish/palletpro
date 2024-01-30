// import logo from './img/PALLETPRO.png'
// import './App.css';
// import "@aws-amplify/ui-react/styles.css";
// import { Amplify } from 'aws-amplify';
// import config from './aws-exports';
// import { fetchAuthSession } from 'aws-amplify/auth';
// import AdminPage from './Pages/AdminPage';
// import EmployeePage from './Pages/EmployeePage';
// import { useEffect, useState } from 'react';
// import { getCurrentUser } from '@aws-amplify/auth';
// import {
//   withAuthenticator,
//   Button,
//   Heading,
//   Image,
//   View,
//   Card,} from "@aws-amplify/ui-react";
//   Amplify.configure(config);


// function App({signOut}) {
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

// async function currentSession() {
//   try {
//     const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
//     return accessToken;
//   } catch (err) {
//     console.log(err);
//   }
// }

// useEffect(() => {
//   currentSession()
//     .then(accessToken => {
//       // console.log(accessToken);
      
//       const userGroups = accessToken.payload['cognito:groups'];
//       // console.log(userGroups);
//       if (userGroups && userGroups[0] == 'Admin') {
//         setIsAdmin(true); 
//       }
//       setIsLoading(false);
//     })
//     .catch(err => {
//       console.log('Error getting current user:', err);
//       setIsLoading(false);
//     });
// }, []);

//   return (
//     <View>
//     <Heading level={1}>Welcome to Amplify!</Heading>
//     <Image src={logo} />
//     {isAdmin ?  <AdminPage /> : < EmployeePage /> }
//     <Card>
//       <Button onClick={signOut}>Sign out</Button>
//     </Card>
//     ) : (
//   <View>
//     <Heading level={1}>Welcome to Employee Page!</Heading>
//     <Image src={logo} />
//     <EmployeePage />
//     <Card>
//       <Button onClick={signOut}>Sign out</Button>
//     </Card>
//   </View>
//   </View>
//   );
// }

// export default withAuthenticator(App);


import React, { useEffect, useState } from 'react';
import { Amplify } from 'aws-amplify';
import config from './aws-exports';
import { withAuthenticator } from "@aws-amplify/ui-react";
import { fetchAuthSession } from 'aws-amplify/auth';
import LandingPage from './Pages/LandingPage';
import AdminPage from './Pages/AdminPage';
import EmployeePage from './Pages/EmployeePage';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { ChakraProvider } from '@chakra-ui/react'


Amplify.configure(config);


function App({ signOut }) {
  const [userRole, setUserRole] = useState(null);
  // Import the AWS SDK for JavaScript
// const AWS = require('aws-sdk');

// // Create an STS (Security Token Service) client
// const sts = new AWS.STS();

// // Specify the ARN of the IAM role in the other AWS account
// const roleToAssume = 'arn:aws:iam::997905384037:role/dollyDynamo';

// // Assume the role
// sts.assumeRole({
//   RoleArn: roleToAssume,
//   RoleSessionName: 'Session1', // Provide a unique session name
// }, (err, data) => {
//   if (err) {
//     console.error('Error assuming role:', err);
//   } else {
//     // Create a new AWS DynamoDB client using the temporary credentials obtained
//     const dynamoDB = new AWS.DynamoDB({
//       accessKeyId: data.Credentials.accessKeyId,
//       secretAccessKey: data.Credentials.SecretAccessKey,
//       sessionToken: data.Credentials.SessionToken,
//     });

//     const params = {
//       TableName: 'empDataDB', // Specify the name of your DynamoDB table
//     };
//     dynamoDB.scan(params, (err, data) => {
//       if (err) {
//         console.error('Error retrieving data from DynamoDB:', err);
//       } else {
//         // Process the retrieved data
//         console.log('Retrieved data from DynamoDB:', data);
//         // Data will be in the format { Items: [Array of items], ...}
//       }
//     });
//   }
// });
// const AWS = require('aws-sdk');
// AWS.config.update({
//   region: 'us-east-1', 
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });
// const dynamodb = new AWS.DynamoDB.DocumentClient();

// async function fetchData() {
//   const params = {
//     TableName: 'PalletProUsers',
//     KeyConditionExpression: 'UserID = :value',
//     ExpressionAttributeValues: {
//       ':value': '001', // Replace with the UserID you want to query
//     },
//   };

//   try {
//     const data = await dynamodb.query(params).promise();
//     console.log('Retrieved Data:', data.Items);

//     // Handle the data in your frontend as needed.
//   } catch (error) {
//     console.error('Error:', error);

//     // Handle the error in your frontend as needed.
//   }
// }

// // Call the fetchData function to retrieve data from DynamoDB.
// fetchData();



  useEffect(() => {
    const currentSession = async () => {
      try {
        const { accessToken } = (await fetchAuthSession()).tokens ?? {};
        const userGroups = accessToken.payload['cognito:groups'];
        setUserRole(userGroups && userGroups[0]);
      } catch (err) {
        console.log('Error getting current user:', err);
      }
    };

    currentSession();
  }, []);
  
  const renderContent = () => {
    switch (userRole) {
      case 'Admin':
        return <AdminPage signOut={signOut} />;
      case 'Employees':
        return <EmployeePage signOut={signOut} />;
      default:
        return <LandingPage />;
    }
  };

  return renderContent();
}

export default withAuthenticator(App);
