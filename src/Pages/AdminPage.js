// import React from 'react';
// import { Heading, Image, View, Card, Button, Grid, useTheme, Flex } from "@aws-amplify/ui-react";
// import logo from './../img/LOGO.png';
// import map from './../img/Map.png';


// const AdminPage = ({ signOut }) => {
//   const { tokens } = useTheme();
//   const numberOfPalletJacks = 15;
//   const [palletJacksVisibility, setPalletJacksVisibility] = useState(
//     Array(numberOfPalletJacks).fill(false)
//   );
//   // Function to toggle the visibility of a specific palletJack
//   const togglePalletJackVisibility = (index) => {
//     setPalletJacksVisibility((prevVisibility) => {
//       const updatedVisibility = [...prevVisibility];
//       updatedVisibility[index] = !updatedVisibility[index];
//       return updatedVisibility;
//     });
//   };
//   const turnOnPalletJackVisibility = (index) => {
//     setPalletJacksVisibility((prevVisibility) => {
//       const updatedVisibility = [...prevVisibility];
//       updatedVisibility[index] = true;
//       return updatedVisibility;
//     });
//   };

//   // Function to turn off the visibility of a specific palletJack
//   const turnOffPalletJackVisibility = (index) => {
//     setPalletJacksVisibility((prevVisibility) => {
//       const updatedVisibility = [...prevVisibility];
//       updatedVisibility[index] = false;
//       return updatedVisibility;
//     });
//   };

//   return (
//     <Grid
//     style={{
//       height: '100vh',
//       width: '100vw',
//     }}
//     // columnGap="0.5rem"
//     // rowGap="0.5rem"
//     templateColumns="2fr 1fr"
//     templateRows="1fr 7fr"
//   >
//     <Card
//       columnStart="1"
//       columnEnd="-1"
//       backgroundColor="#140d07"
//       width="100%"
//       height="100%"
//     >
//       <Flex alignItems="center" justifyContent="space-between">
//             <Image src={logo} width="6%" />
//           <Flex>
//           <Button colorTheme="info" variation="default" backgroundColor="#4fb9af" >
//             Change Map
//           </Button>
//           <Button colorTheme="info" variation="default" backgroundColor="#4fb9af"  >
//             Add a Pallet
//           </Button>
//           <Button colorTheme="info" variation="default" backgroundColor="#4fb9af"  >
//             Employee Details
//           </Button>
//           <Button colorTheme="info" variation="default" backgroundColor="#4fb9af" onClick={signOut}>Sign out</Button>
//           </Flex>
//         </Flex>
//     </Card>
//     <Card
//       columnStart="1"
//       columnEnd="2"
//       backgroundColor="#140d07"
//     >
//      <Image src={map}/>
//      {palletJacksVisibility.map((isVisible, index) => (
//           isVisible && (
//             <img
//               key={`palletJack-${index}`}
//               src="/img/locationTag.png"
//               alt={`palletJack-${index}`}
//               className={`gridItemImgLocation palletJack${index}`}
//             />
//           )
//           ))}
//     </Card>
//     <Card
//       columnStart="2"
//       columnEnd="-1"
//       backgroundColor="#140d07"
//     >
//       Main
//     </Card>
//   </Grid>
//   );
// };

// export default AdminPage;
import React, { useState, useEffect } from 'react';
import { Heading, Image, View, Card, Button, Grid, useTheme, Flex } from "@aws-amplify/ui-react";
import logo from './../img/LOGO.png';
import map from './../img/Map.png';
// import "../css/griItem.css";
import "../css/palletJackList.css";
import "../css/adminLayout.css";
import axios from "axios";

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input } from "@chakra-ui/react";
// import EmployeeData from "../components/EmployeesData";
import ListItem from "../components/ListItem";
import EmployeeData from "../components/EmployeesData";
import { API_BASE_URL } from '../config';

const AdminPage = ({ signOut, numberOfPalletJacksFromLambda }) => { // Receive the number of pallet jacks as a prop
  const { tokens } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onCloseEmployees = () => setIsEmployeesOpen(false);
  const [employee, setEmployees] =  useState([]);
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleAddPallet = () => {
    // Add your logic to handle pallet details submission here
    // You can access the pallet details from the state or form inputs
    // Once done, close the modal
    closeModal();
  };
  const [palletJacksVisibility, setPalletJacksVisibility] = useState(
    Array(numberOfPalletJacksFromLambda).fill(false) // Initialize visibility based on the prop
  );
  const [isEmployeesOpen, setIsEmployeesOpen] = useState(false);
  const onOpenEmployees = () => setIsEmployeesOpen(true);

  // Function to toggle the visibility of a specific palletJack
  const togglePalletJackVisibility = (index) => {
    setPalletJacksVisibility((prevVisibility) => {
      const updatedVisibility = [...prevVisibility];
      updatedVisibility[index] = !updatedVisibility[index];
      return updatedVisibility;
    });
  };

  // Function to turn on the visibility of a specific palletJack
  const turnOnPalletJackVisibility = (index) => {
    setPalletJacksVisibility((prevVisibility) => {
      const updatedVisibility = [...prevVisibility];
      updatedVisibility[index] = true;
      return updatedVisibility;
    });
  };

  // Function to turn off the visibility of a specific palletJack
  const turnOffPalletJackVisibility = (index) => {
    setPalletJacksVisibility((prevVisibility) => {
      const updatedVisibility = [...prevVisibility];
      updatedVisibility[index] = false;
      return updatedVisibility;
    });
  };
  const formData = {
    "id": "Hello from AWS IoT console"
  }
  useEffect(() => {
    axios
      .post(API_BASE_URL+'/dataget',formData) 
      .then((response) => {
        setEmployees(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
//       let palletNumber = 0;
// turnOnPalletJackVisibility(palletNumber);

// const intervalId = setInterval(() => {
//   turnOffPalletJackVisibility(palletNumber);
//   palletNumber++;

//   if (palletNumber > 2 && palletNumber !== 13) {
//     palletNumber = 13;
//   }

//   if (palletNumber > 13) {
//     clearInterval(intervalId);
//     return;
//   }

//   turnOnPalletJackVisibility(palletNumber);
// }, 10000);

// return () => clearInterval(intervalId);
  }, []);
  


  return (
    <Grid
      style={{
        height: '100vh',
        width: '100vw',
      }}
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
            <Button colorTheme="hover" variation="default" backgroundColor="#B4ECE3">
              Change Map
            </Button>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent bg="white"
              color="black"
              borderRadius="8px"
              boxShadow="lg"
              maxW="400px"
              mx="auto"
              my="auto">
        <ModalHeader bg="teal.500"
                color="white"
                p={4}
                fontSize="2xl"
                borderTopLeftRadius="8px"
                borderTopRightRadius="8px">Add a Pallet</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Pallet ID:</FormLabel>
            <Input placeholder="Enter Pallet ID" />
          </FormControl>
          <FormControl>
            <FormLabel>Assign Available Worker:</FormLabel>
            <Input placeholder="Enter Worker" />
          </FormControl>
          <FormControl>
            <FormLabel>Assign Location:</FormLabel>
            <Input placeholder="Enter Location" />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleAddPallet}>
            Submit
          </Button>
          <Button onClick={closeModal}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
            <Button colorTheme="hover" variation="default" backgroundColor="#B4ECE3" onClick={openModal}>
              Add a Pallet
            </Button>
            <Button colorTheme="hover" variation="default" backgroundColor="#B4ECE3" onClick={onOpenEmployees}>
              Employee Details
            </Button>
            <Modal isOpen={isEmployeesOpen} onClose={onCloseEmployees}>
            <ModalOverlay className="modalFileter" />
            <ModalContent
            bg="white"
            color="black"
            borderRadius="8px"
            boxShadow="lg"
            maxW="400px"
            mx="auto"
            my="auto">
              <ModalHeader bg="teal.500"
                color="white"
                p={4}
                fontSize="2xl"
                borderTopLeftRadius="8px"
                borderTopRightRadius="8px">Employees</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                Employee Data
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="teal" mr={3} onClick={onCloseEmployees}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
            <Button colorTheme="hover" variation="default" backgroundColor="#B4ECE3" onClick={signOut}>Sign out</Button>
          </Flex>
        </Flex>
      </Card>
      <Card
        columnStart="1"
        columnEnd="2"
        backgroundColor="#140d07"
      >
        <Image src={map} />
        {palletJacksVisibility.map((isVisible, index) => (
          isVisible && (
            <img
              key={`palletJack-${index}`}
              src="/img/locationTag.png"
              alt={`palletJack-${index}`}
              className={`gridItemImgLocation palletJack${index}`}
            />
          )
        ))}
      </Card>
      <Card
        columnStart="2"
        columnEnd="-1"
        backgroundColor="#140d07"
      >
        <div className="PJListMainContainer">
          <div className="PJListHeader">
            <h1>Pallet Jacks</h1>
          </div>
          <div className="PJListContainer">
          <ListItem/>
          </div>
        </div>
      </Card>
    </Grid>
  );
};

export default AdminPage;
