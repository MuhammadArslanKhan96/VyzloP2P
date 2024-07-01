import { Box, Typography } from "@mui/material";
import { useState } from "react";
import AlertDialogSlide from "../Dailog/DailogBox";

export default function ReviewSection({ createOrder }: { createOrder: any }) {
  const [dialogContent, setDialogContent] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const openDialog = (content: string) => {
    setDialogContent(content);
    setDialogOpen(true);
  };

  const formatValue = (value: string, key: string) => {
    if (value !== "Read more")
      return <span className=" text-[#05379A]">{value}</span>;

    if (key === "terms") {
      return (
        <span
          className=" text-[#05379A] underline cursor-pointer"
          onClick={() => openDialog(createOrder?.terms)}
        >
          {value}
        </span>
      );
    } else if (key === "condition") {
      return (
        <span
          className=" text-[#05379A] underline cursor-pointer"
          onClick={() => openDialog(createOrder?.condition)}
        >
          {value}
        </span>
      );
    } else if (key === "automatic message") {
      return (
        <span
          className="text-[#05379A] underline cursor-pointer"
          onClick={() => openDialog(createOrder?.message)}
        >
          {value}
        </span>
      );
    }
  };

  const list1 = [
    { username: createOrder.userName },
    { price: createOrder.price },
    { "limits of the offers": `${createOrder.min} / ${createOrder.max}` },
    { "Minimum Limit": createOrder.min },
    { "Maximum Limit": createOrder.max },
    { method: createOrder.method },
    { condition: "Read more" },
  ];

  const list2 = [
    { Network: createOrder.blockChain },
    { Crypto: createOrder.cryptoSymbol },
    { Currency: createOrder.fiatCurrency },
    {
      "payment method": Array.isArray(createOrder.paymentMethod)
        ? createOrder.paymentMethod.join(", ")
        : createOrder.paymentMethod,
    },
    { "automatic message": "Read more" },
    { terms: "Read more" },
  ];

  return (
    <Box className="flex flex-col justify-center items-center w-full">
      <Typography sx={{ color: "black" }}>
        If everything looks good, it's time to publish your ad!
      </Typography>
      <Box className="w-full flex justify-center gap-8 items-center mt-10">
        <Box className="w-[40%]">
          {list1.map((item, index) => {
            const [key, value] = Object.entries(item)[0];
            return (
              <Box className="flex" key={index}>
                <Typography color="initial" fontSize={16}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                </Typography>
                <Typography variant="h6" color="initial" fontSize={16}>
                  {formatValue(value, key)}
                </Typography>
              </Box>
            );
          })}
        </Box>
        <Box className="w-[40%]">
          {list2.map((item, index) => {
            const [key, value] = Object.entries(item)[0];
            return (
              <div key={index} className="flex">
                <Typography color="initial">
                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                </Typography>
                <Typography color="initial ">
                  {formatValue(value, key)}
                </Typography>
              </div>
            );
          })}
        </Box>
      </Box>
      <AlertDialogSlide
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        text={dialogContent}
      />
    </Box>
  );
}
