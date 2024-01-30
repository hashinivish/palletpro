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
import map10 from './../img/map10.png';
import map21 from './../img/map21.png';
import map30 from './../img/map30.png';
import map32 from './../img/map32.png';
import map41 from './../img/map41.png';
import Map0 from './../img/Map0.png';
import locationTag from './../img/locationTag.png';
// import "../css/griItem.css";
import "../css/palletJackList.css";
import "../css/adminLayout.css";
import axios from "axios";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
// import EmployeeData from "../components/EmployeesData";
import ListItem from "../components/ListItem";
import EmployeeData from "../components/EmployeesData";
import { API_BASE_URL } from '../config';


const AdminPage = ({ signOut, numberOfPalletJacksFromLambda }) => { // Receive the number of pallet jacks as a prop
  const { tokens } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onCloseEmployees = () => setIsEmployeesOpen(false);
  const [palletJacks, setPalletJacks] = useState([]);
  const [palletData, setPalletData] = useState({
    id: '',
    worker: '',
    row: '',
    col: ''
  });

  const [formData, setFormData] = useState({
    id: "1"
  });

  const [selectedWorker, setSelectedWorker] = useState('');
  const [employees, setEmployee] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const newEmployees = [];

      for (let i = 1; i < 5; i++) {
        const formData = {
          id: `${i}`
        };

        try {
          const response = await axios.post(API_BASE_URL + '/userget', formData, {
            headers: { 'Content-Type': 'application/json' }
          });

          newEmployees.push(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('There was an error fetching Pallet Jacks data!', error);
        }
      }

      setEmployee(newEmployees);
    };

    fetchData();
  }, []);
  
  
  const listPalletJacks = async () => {
    try {
      const promises = [];
      for (let i = 1; i < 2; i++) {
        const formData = {
          id: `${i}`
        };
        const promise = axios.post(API_BASE_URL+'/dataget', formData, {
          headers: { 'Content-Type': 'application/json' }
        });
        promises.push(promise);
      }
  
      const responses = await Promise.all(promises);
  
      const palletJacksData = responses.map(response => response.data);
      console.log(palletJacksData);
  
      setPalletJacks(palletJacksData);
    } catch (error) {
      console.error('There was an error fetching Pallet Jacks data!', error);
    }
  };
  
  useEffect(() => {
    const fetchDataInterval = setInterval(() => {
      listPalletJacks();
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(fetchDataInterval);
  }, []);
  

  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddPallet = (e) => {
    const { name, value } = e.target;
    setPalletData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addPalletJack = () => {
    console.log(palletData);
    // Assuming there's validation logic here before sending data to the server
    axios.post(`${API_BASE_URL}/publish`, palletData, { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        console.log('Data successfully sent to the server:', response.data);
        // Optionally, you can perform additional actions upon successful submission
        // For example, close the modal
        closeModal();
      })
      .catch((error) => {
        console.error('Error sending data to the server:', error);
        // Optionally, handle the error and provide user feedback
      });
      listPalletJacks();
  };

  const [palletJacksVisibility, setPalletJacksVisibility] = useState(
    Array(palletJacks.location).fill(false) // Initialize visibility based on the prop
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

// useEffect(() => {
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

// });


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
            <Input
              type="text"
              name="id"
              value={palletData.palletId}
              onChange={handleAddPallet}
              placeholder="Enter Pallet ID"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Assign Worker:</FormLabel>
            <Select
            name="worker"
            value={selectedWorker}
            onChange={(e) => {
              setSelectedWorker(e.target.value);
              handleAddPallet(e); // Call handleAddPallet with the event
            }}
            placeholder="Select Worker"
          >
            {employees.map((employee) => (
              <option key={employee.email} value={employee.name}>
                {employee.name}
              </option>
            ))}
          </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Assign Row:</FormLabel>
            <Input
              type="text"
              name="row"
              value={palletData.row}
              onChange={handleAddPallet}
              placeholder="Enter Row"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Assign Column:</FormLabel>
            <Input
              type="text"
              name="col"
              value={palletData.column}
              onChange={handleAddPallet}
              placeholder="Enter Column"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={addPalletJack}>
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
                <EmployeeData employees={employees}/>
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
        
        {palletJacks && Array.isArray(palletJacks) && palletJacks.length > 0 && palletJacks[0].location && (
        palletJacks[0].location === '1, 0' ? <Image src={map10} /> :
        palletJacks[0].location === '2, 1' ? <Image src={map21} /> :
        palletJacks[0].location === '3, 0' ? <Image src={map30} /> :
        palletJacks[0].location === '3, 2' ? <Image src={map32} /> :
        palletJacks[0].location === '4, 1' ? <Image src={map41} /> : <Image src={Map0}/>
        
)}

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
          <ListItem palletJacks={palletJacks}/>
          </div>
        </div>
      </Card>
    </Grid>
  );
};

export default AdminPage;
