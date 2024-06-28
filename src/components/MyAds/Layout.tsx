import { Box, Typography } from "@mui/material";
import React, { FormEvent, ReactNode } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


interface CreateLayoutProps { children: ReactNode, activeModel: number, prevStep: () => void, nextStep: () => void, handleSubmit: (e: FormEvent<HTMLFormElement>) => void }

export default function CreateLayout({ children, activeModel, prevStep, nextStep, handleSubmit }: CreateLayoutProps) {

    return (
        <form onSubmit={handleSubmit} className="flex  flex-col px-8 py-6 justify-center items-center gap-x-6 mx-auto w-full xl:w-[80%] rounded-lg bg-white mt-4">
            <div className="flex  flex-col  justify-center items-center gap-x-6 mx-auto w-full ">
                <Box className="w-full flex mb-10">
                    <ArrowBackIcon onClick={prevStep} className="cursor-pointer" />
                    <Box className="flex flex-col">
                        <Typography color="initial">
                            Creation of a purchase annoucement.
                        </Typography>
                        <Typography color="initial">Step {activeModel + 2} of 4</Typography>
                    </Box>
                </Box>
                {children}
            </div>

            <div className="w-full flex justify-end items-center">
                <button
                    className="text-blue-500 bg-white px-3 py-1 rounded border border-blue-500 mr-2"
                    onClick={prevStep}
                >
                    Previous
                </button>
                {activeModel === 2 ? (
                    <button
                        type="submit"
                        className="bg-[#05379A] px-3 py-1 rounded text-white hover:bg-opacity-75"
                    >
                        Publish Ad
                    </button>
                ) : (
                    <button
                        className="bg-[#05379A] px-3 py-1 border rounded text-white hover:bg-opacity-75"
                        onClick={nextStep}
                    >
                        Next
                    </button>
                )}
            </div>
        </form>
    )
}