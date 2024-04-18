import { Box, Button, FormControl, FormLabel, Input, Text, VStack, useToast } from "@chakra-ui/react";
import { FaPrint } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
  const [formData, setFormData] = useState({
    email: "",
    sampleInfo: "",
  });
  const [uniqueNumber, setUniqueNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateUniqueNumber = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUniqueNumber = generateUniqueNumber();
    setUniqueNumber(newUniqueNumber);
    setSubmitted(true);
    sendEmail(formData.email, newUniqueNumber);
    toast({
      title: "Form Submitted",
      description: "Your shipment tracking and sample information has been submitted.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const sendEmail = (email, trackingNumber) => {
    // Simulate email sending
    console.log(`Email sent to ${email} with tracking number ${trackingNumber}`);
  };

  return (
    <Box bg="#002F5D" minH="100vh" p={8} color="white">
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input name="email" type="email" placeholder="Enter your email" onChange={handleInputChange} bg="white" color="black" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Sample Information</FormLabel>
          <Input name="sampleInfo" placeholder="Describe the sample" onChange={handleInputChange} bg="white" color="black" />
        </FormControl>
        <Button type="submit" colorScheme="green" bg="#6CB42C" size="lg" mt={4}>
          Submit
        </Button>
        {submitted && (
          <>
            <Text mt={4}>Unique Number: {uniqueNumber}</Text>
            <Button leftIcon={<FaPrint />} colorScheme="green" bg="#6CB42C" onClick={() => window.print()}>
              Print Shipping Label
            </Button>
            <Box as="pre" p={4} bg="white" color="black" w="full" mt={4}>
              Cyklop CSC Att.: SampleLab M.Slot {uniqueNumber} Wilhelm Röntgenstraat 10, 8013NC, Zwolle, Nederland
            </Box>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default Index;
