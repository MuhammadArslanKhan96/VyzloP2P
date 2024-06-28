import { Box, Typography } from "@mui/material";

export default function ReviewSection({ createOrder }: { createOrder: any }) {
    const list1 = [
        { price: createOrder.price },
        { "available Cryptos": "" },
        { "limit of the offers:": `${createOrder.min} / ${createOrder.max}` },
        { "Minimum Limit": createOrder.min },
        { "Maximum Limit": createOrder.max },
        { method: createOrder.method },
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
        { Location: createOrder.country },
        { "automatic message": createOrder.message },
        { "terms and conditions": createOrder.terms + createOrder.conditions },
    ];
    return (
        <Box className="flex flex-col  justify-center items-center  w-full ">
            <Typography sx={{ color: "black" }}>
                If everything looks good, it's time to publish your ad!
            </Typography>
            <Box className="w-full flex justify-center  gap-8 items-center mt-10  ">
                <Box className="w-[40%]">
                    {list1.map((item, index) => {
                        const [key, value] = Object.entries(item)[0];
                        return (
                            <Box className="flex" key={index}>
                                <Typography color="initial" fontSize={16}>
                                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                                </Typography>
                                <Typography
                                    variant="h6"
                                    color="initial"
                                    fontSize={16}
                                >
                                    {value}
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
                                <Typography key={index} color="initial">
                                    {value}
                                </Typography>
                            </div>
                        );
                    })}
                </Box>
            </Box>
        </Box>
    )
}