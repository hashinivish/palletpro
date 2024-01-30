import React from 'react';
import { Heading, Image, View, Card, Button, Grid, useTheme, Flex } from "@aws-amplify/ui-react";
import logo from './../img/LOGO.png';
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
import { useState } from 'react';


const EmployeePage = ({ signOut }) => {
  const { tokens } = useTheme();
  const [isRequestPalletOpen, setIsRequestPalletOpen] = useState(false);
  const onCloseRequestPallet = () => setIsRequestPalletOpen(false);
  const onOpenRequestPallet = () => setIsRequestPalletOpen(true);

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

export default EmployeePage;