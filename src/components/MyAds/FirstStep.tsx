import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import PaymentMethodTags from "../Field/PaymentMethodTags";

export default function FirstStep({
  updateFields,
  networkData,
}: {
  updateFields: (e: { target: { name: string; value: any } }) => void;
  networkData: any;
}) {
  return (
    <Box className="flex flex-col justify-center items-center w-full">
      <Typography sx={{ color: "black", fontWeight: "bold" }}>
        Great!
      </Typography>
      <Typography sx={{ color: "black" }}>
        Now we will ask you to provide us some details of the transaction.
      </Typography>

      <Box className="w-full flex flex-col justify-center  items-center mt-10 ">
        <Box className="w-full flex flex-wrap justify-center  gap-x-10 ">
          <Box sx={{ m: 1, minWidth: 800, maxWidth: 800 }}>
            <Box>
              <Typography sx={{ color: "gray" }}>
                Enter your name here
              </Typography>
              <TextField
                placeholder="name*"
                required
                name="userName"
                onChange={updateFields}
                sx={{ m: 1, minWidth: 400 }}
              ></TextField>
            </Box>
          </Box>
          <Box sx={{ m: 1, minWidth: 300 }}>
            <Typography sx={{ color: "gray" }}>
              Which network are you going to use to make the exchange?
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 300 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Network
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                onChange={updateFields}
                name="blockChain"
                label="Network"
                required
              >
                <MenuItem value="BSC">BSC</MenuItem>
                <MenuItem value="POLYGON">POLYGON</MenuItem>
                <MenuItem value="ZETA">ZETA</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ m: 1, minWidth: 300 }}>
            <Typography sx={{ color: "gray" }}>
              Which currency do you want to buy?
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 300 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Coin
              </InputLabel>
              <Select
                required
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                onChange={updateFields}
                name="cryptoSymbol"
                label="Coin"
              >
                {networkData.length > 0 ? (
                  networkData.map((item: any) =>
                    Object.entries(item).map(([key, value]: [string, any]) => (
                      <MenuItem key={key} value={value?.symbol as any}>
                        {key}
                      </MenuItem>
                    ))
                  )
                ) : (
                  <MenuItem disabled>No coins available</MenuItem>
                )}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box>
          <Box sx={{ m: 1, minWidth: 400, maxWidth: 400 }}>
            <Box>
              <Typography sx={{ color: "gray" }}>
                Which fiat currency do you want to use?
              </Typography>
              <TextField
                required
                name="fiatCurrency"
                onChange={updateFields}
                sx={{ m: 1, minWidth: 400 }}
              ></TextField>
            </Box>
            <Box className="flex flex-col justify-start  my-3  items-start ">
              <Typography sx={{ color: "gray" }}>
                Do You want to set limit to your offer?{" "}
              </Typography>
              <Box className="flex justify-start items-center">
                <Box sx={{ m: 1, width: 160 }}>
                  <Typography sx={{ color: "gray", fontSize: 12 }}>
                    Minimum offer
                  </Typography>
                  <TextField
                    required
                    type="number"
                    name="min"
                    onChange={updateFields}
                    sx={{ width: 160 }}
                  ></TextField>
                </Box>
                <Box sx={{ m: 1, width: 160 }}>
                  <Typography sx={{ color: "gray", fontSize: 12 }}>
                    Maximum offer
                  </Typography>
                  <TextField
                    required
                    type="number"
                    name="max"
                    onChange={updateFields}
                    sx={{ width: 160 }}
                  ></TextField>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ m: 1, minWidth: 800 }}>
            <Typography sx={{ color: "gray" }}>
              Which one or more payment methods?
            </Typography>
            <PaymentMethodTags
              mutlipleMethod={(methods: string[]) =>
                updateFields({
                  target: { name: "paymentMethod", value: methods },
                })
              }
            />
            <Typography sx={{ color: "gray" }}>Price:</Typography>
            <TextField
              required
              type="number"
              onChange={updateFields}
              name="price"
              sx={{ m: 1, minWidth: 400 }}
            ></TextField>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
