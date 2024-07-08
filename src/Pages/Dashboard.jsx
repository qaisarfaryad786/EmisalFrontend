import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers, reset } from '../redux/user/userSlice';
import { useTable, useSortBy } from 'react-table';
import Header from '../components/Header';
import { logout } from '../utils/logout';
import Spinner from '../components/Spinner';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';


const columns = [
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
    Header:"Action",
    Cell: ({ row }) => (
      <div className="flex space-x-2">
        <FaEdit 
          className="text-blue-500 cursor-pointer hover:text-blue-700"
          onClick={() => handleEdit(row.original)}
        />
        <FaTrashAlt
          className="text-red-500 cursor-pointer hover:text-red-700"
          onClick={() => handleDelete(row.original)}
        />
      </div>
    )
  }
    

];

const Dashboard = () => {
  const dispatch = useDispatch();
  
  const { users, isLoading, isError, message,status } = useSelector((state) => state.user);
  

  useEffect(() => {
    dispatch(getUsers());
    return () => {
      dispatch(reset());
    }
  }, [dispatch]);


  const data = users ? users.map((user, index) => ({
    Sr: index + 1, // Adding a serial number
    name: user.name,
    username: user.username,
    isActive: user.isActive ? 'Yes' : 'No' // Assuming isActive is a boolean
  })) : [];

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data
  },  
  );

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    logout();
  }
  

  return (
    <>
      <Header />
      {isError && (
          <div>Session Expire, Please Login Again</div>
        )}
      {/* table */}
      <div className='container mx-auto flex items-center justify-center my-7'>
        <table {...getTableProps()} className="table-auto w-3/4 shadow-lg">
          <thead className="bg-[#2F3645]">
            {headerGroups.map((hg) => (
              <tr {...hg.getHeaderGroupProps()}>
                {hg.headers.map((header) => (
                  <th {...header.getHeaderProps()} className="px-4 py-2 text-left text-sm font-medium text-gray-200  border border-gray-200">
                    {header.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="">
            {rows.map((row) => {
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
      </div>

    </>
  );
};

export default Dashboard;
