import * as React from 'react';
import { AdjustRounded, DeleteOutlineRounded, DriveFileRenameOutlineRounded } from "@mui/icons-material";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { StoreContext } from '../../../context/StoreContext';
import AddParkingRequestAlert from './Alert/AddParkingRequestAlert';
import DeleteParkingRequest from './Alert/DeleteParkingRequest';
import { getParkingRequest } from '../../../services/admin/AdminService';

const columns = ["User Name", "Vehicle category", 'Parking time', 'Exit time', 'Total', 'Status', 'Action'];



export default function ParkingRequest() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { categoryList } = React.useContext(StoreContext)

    // get pending parking us api 

    const [parkingRequestList, setParkingRequestList] = React.useState()

    React.useEffect(() => {
        getParkingRequest()
            .then(response => {
                console.log(response)
                setParkingRequestList(response.data.content)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    console.log(parkingRequestList)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [searchText, setSearchText] = React.useState()
    const [selectedItemData, setSelectedItemData] = React.useState([]);
    const [addItemOpen, setAddItemOpen] = React.useState(false);
    const [deleteOpen, serDeleteOpen] = React.useState(false);
    const [updateOpen, serUpdateOpen] = React.useState(false);

    const closeAddItemAlert = () => { setAddItemOpen(false) }
    const closeDeleteAlert = () => { serDeleteOpen(false) }
    const closeUpdateAlert = () => { serUpdateOpen(false) }
    const openDeleteAlert = (id) => {
        setSelectedItemData(discountList.filter(item => item.id === id)[0])
        serDeleteOpen(true)
    }
    const openUpdateAlert = (id) => {
        setSelectedItemData(discountList.filter(item => item.id === id)[0])
        serUpdateOpen(true);
    }
    const openViewAlert = (id) => {
        setSelectedItemData(discountList.filter(item => item.id === id)[0])
        serViewOpen(true);
    }

    return (
        <>
            {(addItemOpen || updateOpen) && <AddParkingRequestAlert open={updateOpen ? updateOpen : addItemOpen} close={updateOpen ? closeUpdateAlert : closeAddItemAlert} data={updateOpen ? selectedItemData : null} />}
            <DeleteParkingRequest open={deleteOpen} close={closeDeleteAlert} data={selectedItemData} />

            <Paper sx={{ overflow: 'hidden' }} className='mt-10 max-w-full me-0.5'>
                <TableContainer >
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={7}>
                                    <div class="w-full max-w-sm min-w-[200px]">
                                        <div class="relative flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="absolute w-5 h-5 top-2.5 left-2.5 text-slate-500">
                                                <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                                            </svg>

                                            <input
                                                class="w-full pl-10 h-10 pr-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                                placeholder="UI Kits, Dashboards..."
                                                onChange={(e) => setSearchText(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableHead>
                            <TableRow>
                                {columns.map((column, col_id) => (
                                    <TableCell
                                        className='border-s-2 border-gray-200'
                                        key={col_id}
                                    >
                                        <p className='font-bold'>{column}</p>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {parkingRequestList && Array.isArray(parkingRequestList) && parkingRequestList
                                .filter(item => !searchText || (item.description.includes(searchText)))
                                .filter(item => item.status !== "INACTIVE")
                                .map((row, rowId) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={rowId}>
                                            <TableCell className='border-s-2 border-gray-200 '>{row.user.fullName}</TableCell>
                                            <TableCell className='border-s-2 border-gray-200 '>
                                                {
                                                    row.parkingDetails.map((item) => (
                                                        <p>{item.vehicleCategory.categoryName}</p>
                                                    ))
                                                }
                                            </TableCell>
                                            <TableCell className='border-s-2 border-gray-200 '>
                                                {
                                                    row.parkingDetails.map((item) => (
                                                        <p>{item.parkingTime}</p>
                                                    ))
                                                }
                                            </TableCell>
                                            <TableCell className='border-s-2 border-gray-200 '>
                                                {
                                                    row.parkingDetails.map((item) => (
                                                        <p>{item.exitTime}</p>
                                                    ))
                                                }
                                            </TableCell>
                                            <TableCell className='border-s-2 border-gray-200 '>{row.totalAmount.toFixed(0)}</TableCell>
                                            <TableCell className='border-s-2 border-gray-200 '>
                                                {
                                                    row.status == "ACTIVE"
                                                        ? <div className='relative text-green-300 flex justify-center'>
                                                            <AdjustRounded className='animate-ping' sx={{ fontSize: 20 }} />
                                                            <AdjustRounded className='absolute ' sx={{ fontSize: 20 }} />
                                                        </div>
                                                        : (
                                                            row.status == "PENDING" ?
                                                                <div className='relative text-yellow-300 flex justify-center'>
                                                                    <AdjustRounded className='animate-ping' sx={{ fontSize: 20 }} />
                                                                    <AdjustRounded className='absolute ' sx={{ fontSize: 20 }} />
                                                                </div> :
                                                                <div className='relative text-red-300 flex justify-center'>
                                                                    <AdjustRounded className='animate-ping' sx={{ fontSize: 20 }} />
                                                                    <AdjustRounded className='absolute ' sx={{ fontSize: 20 }} />
                                                                </div>
                                                        )
                                                }
                                            </TableCell>
                                            <TableCell className='border-s-2 border-gray-200 '>
                                                <span className='flex justify-center gap-3'>
                                                    <span onClick={() => openDeleteAlert(row.id)}><DeleteOutlineRounded className='text-red-300 hover:scale-110 duration-150' /></span>
                                                    <span onClick={() => openUpdateAlert(row.id)}><DriveFileRenameOutlineRounded className='text-blue-300 hover:scale-110 duration-150' /></span>
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={categoryList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper >
        </>
    );
}