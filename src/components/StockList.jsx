// StockList.js

import { useEffect, useState } from "react";
import axios from "axios";

const StockList = () => {
  const [stocks, setStocks] = useState([]);
  const [numberOfStocks, setNumberOfStocks] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchStockData = async () => {
    try {
      setIsLoaded(true);
      if (numberOfStocks) {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/stocks/${numberOfStocks}`
        );
        setStocks(response.data.stocks);
        setIsLoaded(false);
      }
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    setNumberOfStocks(value);
    if (e.target.value.length === 0) {
      setStocks([]);
    }
  };

  return (
    <div className=" w-full h-screen overflow-hidden fixed top-0 box-border flex flex-col p-16 gap-y-12 bg-slate-800">
      <div className="w-full text-7xl text-slate-300 drop-shadow-lg  font-bold mb-4">
        <strong className="text-slate-300 text-8xl drop-shadow-xl font-semibold">
          S
        </strong>
        TOCK
        <strong className="text-slate-300 text-8xl  font-semibold">S</strong>
        HARE
      </div>

      <div className="search-bar-wrapper text-slate-300 box-border w-fit mx-auto rounded-full border-gray-400 border-2 outline-2 hover:border-blue~-500">
        <input
          type="number"
          id="stockNumber"
          placeholder="Enter the number of stock you wish to display"
          value={numberOfStocks || ""}
          onChange={handleInputChange}
          className="w-96 h-12 p-4 rounded-lg bg-transparent border-0 outline-0 outline-slate-800"
        />
        <button
          className="border-l-2 w-36 border-gray-400 p-4 box-border hover:font-bold delay-500  rounded-r-full"
          onClick={fetchStockData}
        >
          Fetch Stocks
        </button>
      </div>
      {!isLoaded && numberOfStocks.length !== 0 && stocks.length > 0 ? (
        <table className="w-2/3 opacity-85  h-1/2 overflow-x-hidden  mx-auto rounded-xl drop-shadow-xl bg-white border-black p-2">
          <thead className=" p-2">
            <tr>
              <th className="text-left p-4 border-b border-gray-300">S.No.</th>
              <th className="text-left p-4 border-b border-gray-300">Ticker</th>
              <th className="text-left p-4 border-b border-gray-300">Name</th>
              <th className="text-left p-4 border-b border-gray-300">Market</th>
            </tr>
          </thead>
          <tbody className="w-32 overflow-y-scroll h-32">
            {stocks &&
              stocks?.map((stock, index) => (
                <tr
                  key={stock.symbol}
                  className="hover:bg-slate-100 cursor-pointer"
                  title={`Row no. ${index + 1}`}
                >
                  <td className="p-4 px-4 w-6 text-center text-sm border-b border-gray-300">
                    {index + 1}
                  </td>
                  <td className="p-4 text-left text-sm border-b border-gray-300">
                    {stock.ticker}
                  </td>
                  <td className="p-4 text-left text-sm border-b font-semibold text-slate-700 border-gray-300">
                    {stock.name}
                  </td>
                  <td className="p-4 text-left text-sm border-b border-gray-300">
                    {stock.market}
                  </td>
                  {/* Display other stock information */}
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <div
          className={` w-2/4 mx-auto text-3xl ${
            numberOfStocks > 0 && isLoaded && "animate-pulse"
          } duration-500 font-semibold text-slate-300 hover:text-slate-100  cursor-pointer`}
        >
          {numberOfStocks > 0 && isLoaded
            ? "Stocks are fetching..."
            : "Nothing to show, enter how many stock you want to see?"}
        </div>
      )}
    </div>
  );
};

export default StockList;
