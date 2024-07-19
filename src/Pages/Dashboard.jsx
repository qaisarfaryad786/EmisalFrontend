import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../redux/user/userSlice';
import { useTable, useSortBy, usePagination } from 'react-table';
import Header from '../components/Header';
import { logout } from '../utils/logout';
import Spinner from '../components/Spinner';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useDispatch();
  
  const { users, isLoading, isError } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const columns = useMemo(() => [
    {
      Header: "Sr",
      accessor: 'Sr' // Ensure this matches the data key
    },
    {
      Header: "Name",
      accessor: "name"
    },
    {
      Header: "Username",
      accessor: "username"
    },
    {
      Header: "IsActive",
      accessor: "isActive" // Ensure this matches the data key
    },
    {
      Header: "Action",
    }
  ], []);

  const data = useMemo(() => users ? users.map((user, index) => ({
    Sr: index + 1, // Adding a serial number
    name: user.name,
    username: user.username,
    isActive: user.isActive ? 'Yes' : 'No' // Assuming isActive is a boolean
  })) : [], [users]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using rows, we'll use page
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useSortBy,
    usePagination
  );

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    logout();
  }

  const startRow = pageIndex * pageSize + 1;
  const endRow = Math.min((pageIndex + 1) * pageSize, data.length);

  return (
    <>
      <Header />
      {isError && (
          <div>Session Expire, Please Login Again</div>
      )}
      
      <div className='container mx-auto w-9/12'>
      <div className="mt-10 p-10 bg-gray-300 rounded-sm border-none shadow-lg mb-3">
      <Link to={"/admin/createUser"} className='bg-[#454545] p-3 text-white rounded-sm hover:bg-black'>Create User</Link>
      </div>
        <div className=" my-4 shadow-lg ">
          <div>
            <select
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value));
              }}
              className="p-2 border-none bg-[#454545] text-white rounded-sm "
            >
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize} className='bg-[#454545] text-white'>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        <table {...getTableProps()} className="table-auto w-full shadow-lg mt-2 rounded-sm">
          <thead className="bg-[#454545] text-center">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())} className="px-4 py-2 t text-sm font-medium text-gray-200 border border-black text-center">
                    <div className="flex items-center">
                      {column.render("Header")}
                      <span className="ml-2">
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <FaSortDown />
                          ) : (
                            <FaSortUp />
                          )
                        ) : (
                          <FaSort />
                        )}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="">
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="hover:bg-gray-100 border border-gray-100">
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()} className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
                {/* Pagination Controls */}
        <div className="flex float-end gap-4 my-4 ">
        <div className="p-2">
            Page {startRow} to {endRow} of {data.length} Users
          </div>
          <div>
            <button 
              onClick={() => gotoPage(0)} 
              disabled={!canPreviousPage} 
              className={`p-1 border border-gray-300 rounded mr-2  ${!canPreviousPage ? 'bg-gray-200' : 'bg-white'}`}
            >
              {'First'}
            </button>
            <button 
              onClick={() => previousPage()} 
              disabled={!canPreviousPage} 
              className={`p-1 border border-gray-300 rounded ${!canPreviousPage ? 'bg-gray-200' : 'bg-white'}`}
            >
              {'Previous'}
            </button>
          </div>
          <div>
            <button 
              onClick={() => nextPage()} 
              disabled={!canNextPage} 
              className={`p-1 border border-gray-300 rounded mr-2 ${!canNextPage ? 'bg-gray-200' : 'bg-white'}`}
            >
              {'Next'}
            </button>
            <button 
              onClick={() => gotoPage(pageCount - 1)} 
              disabled={!canNextPage} 
              className={`p-1 border border-gray-300 rounded ${!canNextPage ? 'bg-gray-200' : 'bg-white'}`}
            >
              {'Last'}
            </button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Dashboard;
