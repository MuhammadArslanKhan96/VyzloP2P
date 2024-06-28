import React, { useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const PaymentMethodTags = ({
  mutlipleMethod,
}: {
  mutlipleMethod: (methods: string[]) => void;
}) => {
  const [paymentMethods, setPaymentMethods] = useState<string[]>([]);
  const [selectedMethods, setSelectedMethods] = useState<string[]>([]);
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
    <div className="flex justify-center items-center">
      <FormControl sx={{ m: 1, minWidth: 400 }}>
        <InputLabel id="payment-method-label">Payment Method</InputLabel>
        <Select
          labelId="payment-method-label"
          id="payment-method-select"
          value={selectedMethods}
          onChange={handleSelectChange}
        >
          {paymentMethods.map((method) => (
            <MenuItem key={method} value={method}>
              {method}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        type="text"
        id="custom-method"
        label="Type Custom Payment Method"
        value={customMethod}
        onChange={handleCustomMethodChange}
        sx={{ m: 1, minWidth: 300 }}
      />

      <Button onClick={handleAddCustomMethod}>Add</Button>
    </div>
  );
};

export default PaymentMethodTags;
