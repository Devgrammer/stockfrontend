// StockList.js

import { useState } from "react";
import StockTable from "../components/StockTable";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineStock } from "react-icons/ai";
import { RiStockLine } from "react-icons/ri";
import { VscLoading } from "react-icons/vsc";















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
    <div className="stock-share-main-container w-full h-screen overflow-hidden fixed top-0 box-border flex flex-col p-16 gap-y-12 bg-slate-800">
      <div className=" stock-share-heading-container w-full text-7xl text-slate-300 drop-shadow-lg  font-bold mb-4">
        <strong className="text-slate-300 text-8xl drop-shadow-xl font-semibold">
          S
        </strong>
        TOCK
        <strong className="text-slate-300 text-8xl  font-semibold">S</strong>
        HARE
      </div>

      <div className="search-bar-wrapper flex items-center justify-center text-slate-300 box-border w-fit mx-auto rounded-full border-gray-400 border-2 outline-2 hover:border-blue~-500">
        <input
          type="number"
          id="stockNumber"
          placeholder="Enter the number of stock you wish to display"
          value={numberOfStocks || ""}
          onChange={handleInputChange}
          min={1}
          max={50}
          className="w-96 h-12 p-4 rounded-lg bg-transparent border-0 outline-0 outline-slate-800"
        />
        <button
          className="border-0 w-12 h-12 flex justify-center items-center border-gray-400 p-4 box-border hover:font-bold delay-500  rounded-r-full"
          onClick={() => setNumberOfStocks("")}
        >
          {numberOfStocks ? <RxCross2 size={28} /> : ""}
        </button>
        <button
          className="border-l-2 w-36 h-12 border-gray-400 flex items-center justify-center p-4 box-border hover:font-bold delay-500  rounded-r-full"
          onClick={fetchStockData}
        >
          Fetch Stocks
        </button>
      </div>

      <div className="table-container">
        {!isLoaded && numberOfStocks.length !== 0 && stocks.length > 0 ? (
          <>
            <StockTable stocks={stocks} />
            <div className="fetch-highlight text-slate-300 text-md m-4">{`Fetched ${stocks.length} of ${
              stocks.length
            } ${stocks.length > 0 ? "stocks" : "stock"}`}</div>
          </>
        ) : (
          <div
            className={` w-2/4 mx-auto text-3xl ${
              numberOfStocks > 0 && isLoaded && "animate-pulse"
            } duration-500 font-semibold text-slate-300 hover:text-slate-100  cursor-pointer`}
          >
            {numberOfStocks > 0 && isLoaded ? (
              <div className="flex flex-col items-center  justify-center gap-y-12">
                {" "}
                <div className="icon ">
                  <VscLoading className="animate-spin" size={80} />
                </div>
                <div className="content">Stocks are fetching...</div>
              </div>
            ) : (
              <div className="mx-auto flex flex-col justify-center items-center">
                <div className="empty-icon flex  ">
                  <RiStockLine size={80} />
                  <AiOutlineStock size={80} />
                  <RiStockLine size={80} />
                </div>
                <div className="empty-msg">
                  Nothing to show, enter how many stock you want to see?
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StockList;
