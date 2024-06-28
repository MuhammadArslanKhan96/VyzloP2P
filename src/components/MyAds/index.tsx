import { networkIds } from "@/constants/rpcs";
import { useAppContext } from "@/context/AppContext";
import { CreateOrder } from "@/hooks/createOrders";
import { GetToken } from "@/hooks/getTokensByIdName";
import { SupportedBlockchains } from "@/types";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
    Alert,
    Box,
    Snackbar,
    Typography
} from "@mui/material";
import { FormEvent, useCallback, useEffect, useState } from "react";
import FirstStep from "./FirstStep";
import CreateLayout from "./Layout";
import MyAds from "./Myads";
import ReviewSection from "./ReviewSection";
import SecondStep from "./SecondStep";
import { update } from "firebase/database";

const MyAdsPage = () => {
    const [activeModel, setActiveModel] = useState(0);
    const [nextStep, setNextStep] = useState(false);
    const [newAds, setNewAds] = useState(false);
    const [networkData, setNetworkData] = useState<any[]>([]);
    const fields = [
        ["wallet", "blockChain", "cryptoSymbol", "fiatCurrency", "min", "max", "paymentMethod", "price"],
        ["country", "condition", "message", "terms"]
    ];
    const fieldsNames = [
        ["wallet", "Network", "Coin", "Fiat Currency", "Minimum Offer", "Maximum Offer", "Payment Method", "Price"],
        ["Country", "Condition", "Message", "Terms"]
    ];

    const { wallet, getEthersInstance } = useAppContext();
    const [createOrder, setCreateOrder] = useState<{ [key: string]: any }>({
        blockChain: "",
        cryptoSymbol: "",
        fiatCurrency: "",
        method: "",
        selectedUserId: 0,
        wallet: wallet,
        txType: "P2P",
        uid: 0,
        value: "0.0001",
        message: "",
        paymentMethod: "",
        terms: "",
        country: "",
        min: "",
        max: "",
        price: "",
        condition: "",
    });
    const [notification, setNotification] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const updateFields = useCallback(async (key: string, value: any) => {
        setCreateOrder((prevOrder: any) => ({
            ...prevOrder,
            [key]: value,
        }));

        if (key === "blockChain") {
            const { data } = await GetToken(value);
            setNetworkData(data);
            getEthersInstance(
                networkIds[value as SupportedBlockchains],
                value as SupportedBlockchains
            );
        }
    }, []);

    const updateMethod = (method: "buy" | 'sell') => {
        updateFields("method", method);
        setNextStep(true);
    }
    const updateStep = async (isPrev?: boolean) => {
        let valid = true;

        if (!isPrev && activeModel < 2) {
            valid = await validateStep(activeModel);
        }

        if (!valid) return;

        setActiveModel((prevModel) => isPrev ? (prevModel - 1 < 0 ? 0 : prevModel - 1) : (prevModel < 2 ? prevModel + 1 : prevModel));
        if (isPrev) {
            if (activeModel === 0) {
                setNextStep(false);
            }
            if (nextStep === false) {
                setNewAds(false);
            }
        }
    };
    const handleClose = () => {
        setNotification({ ...notification, open: false });
    };
    const submitAds = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        for (const [key, value] of Object.entries(createOrder)) {
            if (value === "" || value === undefined) {
                setNotification({
                    open: true,
                    message: `${key === "wallet"
                        ? "Please connect your wallet "
                        : `${key} Field cannot be left blank`
                        } `,
                    severity: "error",
                });
                return;
            }
        }

        try {
            await CreateOrder(createOrder);
            setNotification({
                open: true,
                message: "Order created successfully",
                severity: "success",
            });
        } catch (error) {
            console.error("Error creating order:", error);
            setNotification({
                open: true,
                message: "Error creating order",
                severity: "error",
            });
        }
    };

    const handleChange = async (e: { target: { name: string, value: any } }) => {
        const { name, value } = e.target;
        updateFields(name, value);
    }

    const validateStep = (currentStep: number) => {
        try {
            const validationFields: string[] = fields[currentStep];
            validationFields.forEach((fieldName) => {
                const fieldExists = !!createOrder[fieldName];

                if (!fieldExists) {
                    throw new Error(`${fieldName === "wallet"
                        ? "Please connect your wallet "
                        : `${fieldsNames[currentStep][validationFields.indexOf(fieldName)]} Field cannot be left blank`
                    } `)
                }
            });
            return true;
        } catch (error: any) {
            setNotification({
                open: true,
                message: error.message,
                severity: "error",
            });
            return false;
        }
    }

    useEffect(() => {
        updateFields("wallet", wallet);
    }, [wallet])

    return (
        <Box className="bg-[#d4ebfc] max-lg:pt-16 pt-32 sm:w-screen  h-full min-h-screen pb-5">
            <Snackbar
                open={notification.open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={handleClose}
                    severity={notification.severity as "success" | "error"}
                >
                    {notification.message}
                </Alert>
            </Snackbar>
            {!newAds && (
                <MyAds newAdsBtn={() => setNewAds(true)} />
            )}
            {nextStep ? (
                <CreateLayout handleSubmit={submitAds} activeModel={activeModel} prevStep={() => updateStep(true)} nextStep={() => updateStep()}>
                    {activeModel === 0 && (
                        <FirstStep networkData={networkData} updateFields={handleChange} />
                    )}
                    {activeModel === 1 && (
                        <SecondStep updateFields={handleChange} />
                    )}
                    {activeModel === 2 && (
                        <ReviewSection createOrder={createOrder} />
                    )}
                </CreateLayout>
            ) : (
                newAds && (
                    <div className="flex  flex-col px-8 py-6 justify-center items-center gap-x-6 mx-auto w-full lg:w-[70%] xl:w-[80%] rounded-lg bg-white max-lg:mt-16">
                        <Box className="w-full flex mb-10 items-start">
                            <ArrowBackIcon
                                onClick={() => updateStep(true)}
                                fontSize="small"
                                className="mt-[2px] mr-2 cursor-pointer"
                            />
                            <Box className="flex flex-col">
                                <Typography color="initial">Create new Ad</Typography>
                                <Typography color="initial">Step 1 of 4</Typography>
                            </Box>
                        </Box>
                        <Box className="flex flex-col justify-center items-center">
                            <Typography sx={{ color: "black", fontWeight: "bold" }}>
                                Hi! To begin with
                            </Typography>
                            <Typography sx={{ color: "black" }}>
                                What kind of ad are you looking to create?
                            </Typography>
                            <Box className="w-full flex justify-center gap-x-3 mt-10  ">
                                <button
                                    className="bg-[#05379A] px-2  py-1 text-white rounded-lg hover:bg-opacity-75"
                                    onClick={() => updateMethod("buy")}
                                >
                                    Purchase Ad
                                </button>
                                <button
                                    className="bg-[#05379A] px-2  py-1 text-white rounded-lg hover:bg-opacity-75"
                                    onClick={() => updateMethod("sell")}
                                >
                                    Sales Ad
                                </button>
                            </Box>
                        </Box>
                    </div>
                )
            )}
        </Box>
    );
};

export default MyAdsPage;
