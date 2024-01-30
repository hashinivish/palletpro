import React from 'react';
import { Heading, Image, View, Card, Button, Grid, useTheme, Flex } from "@aws-amplify/ui-react";
import logo from './../img/LOGO.png';
import map10 from './../img/map10.png';
import map21 from './../img/map21.png';
import map30 from './../img/map30.png';
import map32 from './../img/map32.png';
import map41 from './../img/map41.png';
import map from './../img/Map.png';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { useState,useEffect } from 'react';
import "../css/palletJackList.css";
import "../css/adminLayout.css";
import axios from "axios";
import ListItem from "../components/ListItem";
import EmployeeData from "../components/EmployeesData";
import { API_BASE_URL } from '../config';


const EmployeePage = ({ signOut }) => {
  const { tokens } = useTheme();
  const [isRequestPalletOpen, setIsRequestPalletOpen] = useState(false);
  const onCloseRequestPallet = () => setIsRequestPalletOpen(false);
  const onOpenRequestPallet = () => setIsRequestPalletOpen(true);
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
  const [employees, setEmployee] = useState([]);
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
  const handleAddPallet = (e) => {
    const { name, value } = e.target;
    setPalletData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [palletJacksVisibility, setPalletJacksVisibility] = useState(
    Array(palletJacks.location).fill(false) // Initialize visibility based on the prop
  );


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
          <Button colorTheme="hover" variation="default" backgroundColor="#B4ECE3" onClick={onOpenRequestPallet}  >
          Request a Pallet
          </Button>
          <Modal isOpen={isRequestPalletOpen} onClose={onCloseRequestPallet}>
            <ModalOverlay className="modalFileter" />
            <ModalContent
              bg="white"
              color="black"
              borderRadius="8px"
              boxShadow="lg"
              maxW="400px"
              mx="auto"
              my="auto"
            >
              <ModalHeader
                bg="teal.500"
                color="white"
                p={4}
                fontSize="2xl"
                borderTopLeftRadius="8px"
                borderTopRightRadius="8px"
              >
                Request a Pallet
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel>Section Number</FormLabel>
                  <NumberInput className = 'inputForms' min={0}>
                    <NumberInputField />
                  </NumberInput>
                  <FormLabel>Block Number</FormLabel>
                  <NumberInput className = 'inputForms' min={0}>
                    <NumberInputField />
                  </NumberInput>
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="teal" mr={3} onClick={onCloseRequestPallet}>
                  Request
                </Button>
                <Button variant="ghost" onClick={onCloseRequestPallet}>
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
        palletJacks[0].location === '4, 1' ? <Image src={map41} /> : null
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

export default EmployeePage;