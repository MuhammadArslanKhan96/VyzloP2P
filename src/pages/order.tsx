import React, { useState, useEffect } from "react";
import useFirestoreListener from "@/hooks/useFirestoreListener";
import { useAppContext } from "@/context/AppContext";

const Order = () => {
  const [data, setData] = useState([]);
  const { wallet } = useAppContext();
  const getData = (tableData: any) => {
    const filterData = tableData.filter((item: any) => {
      return item.takerAddress === wallet;
    });
    setData(filterData);
  };
  const listener = useFirestoreListener("createOrder", getData);

  useEffect(() => {
    listener();
  }, []);

  const headTableName = [
    "Advertisers",
    "price",
    "payment",
    "Limits",
    "Available",
    "",
  ];

  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h1 className="text-center text-4xl my-3  pt-[90px] uppercase font-bold">
          Orders List
        </h1>
        <div className="w-full h-full flex justify-center items-center">
          <div className="mx-auto w-full  xl:w-[72vw] h-[400px] my-8 overflow-auto selectscroll">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {headTableName.map((item, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-6 py-3 font-bold text-left text-xs   uppercase tracking-wider"
                    >
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.length > 0 ? (
                  data.map((item: any) => (
                    <tr key={item.key} className="bg-white">
                      <td className="px-6 py-4 text-sm text-gray-500 capitalize ">
                        {item.userName ? item.userName : "no name"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {item.price} {item.fiatCurrency.toUpperCase()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {item.paymentMethod && item.paymentMethod.join(", ")}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500 ">
                        <div>
                          {item.fiatCurrency.toUpperCase()} {item.min}
                        </div>
                        <div>
                          {item.fiatCurrency.toUpperCase()} {item.max}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500 ">
                        <div>
                          {item.price} {item.cryptoSymbol}
                        </div>
                        <div>{item.blockChain}</div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-4 text-sm text-gray-500 text-center w-full  mx-auto"
                    >
                      Data is currently unavailable. Please try again shortly{" "}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
