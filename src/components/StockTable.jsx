/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useEffect, useState } from "react";

const StockTable = ({ stocks }) => {
  const [priceData, setPriceData] = useState([]);

  const fetchAndUpdatePrice = (ticker, refreshInterval) => {
    const updatePrice = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/stock/price/${ticker}`
        );
        const updatedPriceData = response && {
          ticker,
          data: response.data.price
            ? response.data.price[0]
            : {
                T: ticker,
                v: "N/A",
                vw: "N/A",
                o: "N/A",
                c: "N/A",
                h: "N/A",
                l: "N/A",
                t: "N/A",
                n: "N/A",
              },
        };

        setPriceData((prevData) => {
          const existingIndex = prevData.findIndex(
            (item) => item.ticker === ticker
          );

          if (existingIndex !== -1) {
            const newData = [...prevData];
            newData[existingIndex] = updatedPriceData;
            return newData;
          } else {
            return [...prevData, updatedPriceData];
          }
        });
      } catch (error) {
        console.error(`Error fetching price for ${ticker}:`, error);
      }
    };
    useEffect(() => {

      updatePrice();
      const intervalId = setInterval(updatePrice, refreshInterval * 10000);
      return () => clearInterval(intervalId);
    }, [refreshInterval, ticker]);

    return priceData;
  };

  const getPriceData = (ticker) => {
    const price = priceData.find((val) => {
      if (val.ticker === ticker) {
        return val;
      }
    });
    return price;
  };

  return (
    <table className="w-fit opacity-85  block h-[400px] table-auto border-collapse  overflow-x-scroll snap-y-center sm:overflow-x-scroll  mx-auto rounded-xl drop-shadow-xl bg-white border-black p-2">
      <thead className=" p-2 sticky top-0   bg-white">
        <tr>
          <th className="text-left p-4 w-fit border-b border-gray-300">
            S.No.
          </th>
          <th className="text-left p-4 w-fit border-b border-gray-300">Name</th>
          <th className="text-left p-4 w-fit border-b border-gray-300">
            Market
          </th>
          <th className="text-left p-4 w-fit border-b border-gray-300">
            Symbol
          </th>
          <th className="text-left p-4 w-fit border-b border-gray-300">
            Closing
          </th>
          <th className="text-left p-4 w-fit border-b border-gray-300">
            Highest
          </th>
          <th className="text-left p-4 w-fit border-b border-gray-300">
            Opening
          </th>
          <th className="text-left p-4 w-fit border-b border-gray-300">
            Lowest
          </th>
          <th className="text-left p-4 w-fit border-b border-gray-300">
            Volume
          </th>
          <th className="text-left p-4 w-fit border-b border-gray-300">
            Vol. Weight
          </th>
        </tr>
      </thead>
      <tbody className="h-[400px]">
        {stocks &&
          stocks?.map((stock, index) => {
            const price = fetchAndUpdatePrice(
              stock.ticker,
              stock.refreshInterval
            );
            return (
              <tr
                key={stock.ticker}
                className="w-full hover:bg-slate-100 text-slate-600 cursor-pointer"
                title={`Row no. ${index + 1}`}
              >
                <td className="p-4 px-4 w-6 text-center text-sm border-b border-gray-300">
                  {index + 1}
                </td>
                <td className="p-4 text-left text-sm border-b font-semibold text-slate-700 border-gray-300">
                  {stock.name}
                </td>
                <td className="p-4 text-left text-sm border-b border-gray-300 capitalize">
                  {stock.market}
                </td>
                <td className="p-4 text-left text-sm border-b border-gray-300">
                  {price && priceData.length > 0 && getPriceData(stock.ticker)
                    ? getPriceData(stock.ticker).data.T
                    : "--"}
                </td>
                <td className="p-4 text-left text-sm border-b border-gray-300">
                  {price && priceData.length > 0 && getPriceData(stock.ticker)
                    ? getPriceData(stock.ticker).data.c
                    : "--"}
                </td>
                <td className="p-4 text-left text-sm border-b border-gray-300">
                  {price && priceData.length > 0 && getPriceData(stock.ticker)
                    ? getPriceData(stock.ticker).data.h
                    : "--"}
                </td>
                <td className="p-4 text-left text-sm border-b border-gray-300">
                  {price && priceData.length > 0 && getPriceData(stock.ticker)
                    ? getPriceData(stock.ticker).data.l
                    : "--"}
                </td>
                <td className="p-4 text-left text-sm border-b border-gray-300">
                  {price && priceData.length > 0 && getPriceData(stock.ticker)
                    ? getPriceData(stock.ticker).data.o
                    : "--"}
                </td>
                <td className="p-4 text-left text-sm border-b border-gray-300">
                  {price && priceData.length > 0 && getPriceData(stock.ticker)
                    ? getPriceData(stock.ticker).data.v
                    : "--"}
                </td>
                <td className="p-4 text-left text-sm border-b border-gray-300">
                  {price && priceData.length > 0 && getPriceData(stock.ticker)
                    ? getPriceData(stock.ticker).data.vw
                    : "--"}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default StockTable;
