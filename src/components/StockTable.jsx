

const StockTable = ({ stocks }) => {
  return (
    <table className="w-2/3 opacity-85  block h-[400px] table-collapse min-w-[500px] overflow-x-scroll snap-y-center sm:overflow-x-hidden  mx-auto rounded-xl drop-shadow-xl bg-white border-black p-2">
      <thead className=" p-2 sticky top-0   bg-white">
        <tr>
          <th className="text-left p-4 w-[10%] border-b border-gray-300">
            S.No.
          </th>
          <th className="text-left p-4 w-[10%] border-b border-gray-300">
            Ticker
          </th>
          <th className="text-left p-4 w-[70%] border-b border-gray-300">
            Name
          </th>
          <th className="text-left p-4 w-[40%] border-b border-gray-300">
            Market
          </th>
        </tr>
      </thead>
      <tbody className="h-[400px]">
        {stocks &&
          stocks?.map((stock, index) => (
            <tr
              key={stock.ticker}
              className="w-full hover:bg-slate-100 cursor-pointer"
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
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default StockTable;