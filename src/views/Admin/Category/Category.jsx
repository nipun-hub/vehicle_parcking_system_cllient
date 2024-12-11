import * as React from 'react';
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { AddRounded, AdjustRounded, ArrowRightAltRounded, DeleteOutlineRounded, DriveFileRenameOutlineRounded, VisibilityRounded } from "@mui/icons-material";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import AddCategoryAlert from './Alert/AddCategoryAlert';
import DeleteCategory from './Alert/DeleteCategory';
import View from './Alert/View';
import CategoryHead from './CategoryHead';
import { getCategory } from '../../../services/Common/CommonService';
import { StoreContext } from '../../../context/StoreContext';

const columns = ["Name", "Description", 'Price', 'Status', 'Action'];

export default function Category() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { categoryList } = React.useContext(StoreContext)

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
    const [viewOpen, serViewOpen] = React.useState(false);

    const closeAddItemAlert = () => { setAddItemOpen(false) }
    const closeDeleteAlert = () => { serDeleteOpen(false) }
    const closeUpdateAlert = () => { serUpdateOpen(false) }
    const openDeleteAlert = (id) => {
        setSelectedItemData(categoryList.filter(item => item.id === id)[0])
        serDeleteOpen(true)
    }
    const openUpdateAlert = (id) => {
        setSelectedItemData(categoryList.filter(item => item.id === id)[0])
        serUpdateOpen(true);
    }
    const openViewAlert = (id) => {
        setSelectedItemData(categoryList.filter(item => item.id === id)[0])
        serViewOpen(true);
    }

    // React.useEffect(() => {
    //   setAddItemOpen(updateOpen)
    // }, [updateOpen])

    return (
        <>
            {(addItemOpen || updateOpen) && <AddCategoryAlert open={updateOpen ? updateOpen : addItemOpen} close={updateOpen ? closeUpdateAlert : closeAddItemAlert} data={updateOpen ? selectedItemData : null} />}
            <DeleteCategory open={deleteOpen} close={closeDeleteAlert} data={selectedItemData} />
            <View open={viewOpen} close={() => serViewOpen(false)} data={selectedItemData} />

            <CategoryHead setOpen={setAddItemOpen} />

            <Paper sx={{ overflow: 'hidden' }} className='mt-10 max-w-full me-0.5'>
                <TableContainer >
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {/* {columns.map((column) => ( */}
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
                                {/* ))} */}
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
                            {categoryList
                                .filter(item => !searchText || (item.categoryName.includes(searchText)))
                                .filter(item => item.status !== "INACTIVE")
                                .map((row, rowId) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={rowId}>
                                            <TableCell className='border-s-2 border-gray-200 '>{row.categoryName}</TableCell>
                                            <TableCell className='border-s-2 border-gray-200 '>{row.description}</TableCell>
                                            <TableCell className='border-s-2 border-gray-200 '>{row.pricing.pricePerHour}</TableCell>
                                            <TableCell className='border-s-2 border-gray-200 '>
                                                {
                                                    row.status == "ACTIVE"
                                                        ? <div className='relative text-green-300 flex justify-center'>
                                                            <AdjustRounded className='animate-ping' sx={{ fontSize: 20 }} />
                                                            <AdjustRounded className='absolute ' sx={{ fontSize: 20 }} />
                                                        </div>
                                                        : <div className='relative text-red-300 flex justify-center'>
                                                            <AdjustRounded className='animate-ping' sx={{ fontSize: 20 }} />
                                                            <AdjustRounded className='absolute ' sx={{ fontSize: 20 }} />
                                                        </div>
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