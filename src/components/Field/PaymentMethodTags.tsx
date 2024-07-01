import React, { useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
} from "@mui/material";

const PaymentMethodTags = ({
  createOrder,
  mutlipleMethod,
}: {
  createOrder: any;
  mutlipleMethod: (methods: string[]) => void;
}) => {
  const [paymentMethods, setPaymentMethods] = useState<string[]>(
    createOrder?.paymentMethod || []
  );
  const [selectedMethods, setSelectedMethods] = useState<string[]>(
    createOrder?.paymentMethod ? [createOrder?.paymentMethod] : []
  );
  const [customMethod, setCustomMethod] = useState<string>("");

  const handleSelectChange = (event: any) => {
    setSelectedMethods(event.target.value);
  };

  const handleCustomMethodChange = (event: any) => {
    setCustomMethod(event.target.value);
  };

  const handleAddCustomMethod = () => {
    if (customMethod && !paymentMethods.includes(customMethod)) {
      const updatedMethods = [...paymentMethods, customMethod];
      setPaymentMethods(updatedMethods);
      setSelectedMethods([customMethod]);
      mutlipleMethod(updatedMethods);
      setCustomMethod("");
    }
  };
  // const handleDeleteMethod = (methodToDelete: any) => () => {
  //   setPaymentMethods(
  //     paymentMethods.filter((method) => method !== methodToDelete)
  //   );
  //   setSelectedMethods(
  //     selectedMethods.filter((method) => method !== methodToDelete)
  //   );
  // };

  return (
    <div className="flex flex-col justify-center items-start">
      <Box className="flex justify-center">
        <TextField
          type="text"
          id="custom-method"
          label="Type Custom Payment Method"
          value={customMethod}
          onChange={handleCustomMethodChange}
          sx={{ m: 1, minWidth: 300 }}
          required
        />
        <button className="  text-[#05379A] " onClick={handleAddCustomMethod}>
          Add
        </button>
      </Box>

      <FormControl sx={{ m: 1, minWidth: 400 }}>
        <InputLabel id="payment-method-label " className="bg-white">
          Payment Method
        </InputLabel>
        <Select
          labelId="payment-method-label"
          id="payment-method-select"
          value={selectedMethods}
          onChange={handleSelectChange}
          defaultValue={createOrder?.paymentMethod}
        >
          {paymentMethods.map((method) => (
            <MenuItem key={method} value={method}>
              {method}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default PaymentMethodTags;
