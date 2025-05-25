import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './QuickCareerLinks.css';
import { AgGridReact } from 'ag-grid-react';
import toast from 'react-hot-toast';
import { GET_QUICK_CAREER_JOB_LINK, PUT_QUICK_CAREER_JOB_LINK_STATUS } from '../../utils/constants/apiConstants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getDateFormatted } from '../../utils/helper';
import { themeQuartz } from "ag-grid-community";
import quickCareerJobLinkRoles from './../../utils/constants/json/quickCareerJobLinkRoles.json';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import QuickCareerLinksAddDialog from './QuickCareerLinksAddDialog';
import QuickCareerLinksFilters from './QuickCareerLinksFilters';
import IconComponentCareerLinks from './IconComponentCareerLinks';
import StatusComponentCareerLinks from './StatusComponentCareerLinks';
import DeleteComponentCareerLinks from './DeleteComponentCareerLinks';
import { motion } from 'framer-motion';
import quickCareerJobLinkDates from '../../utils/constants/json/quickCareerJobLinkDates.json';
import SlidderToggle from '../Shared/SlidderToggle/SlidderToggle';
import EditAndSaveComponentCareerLinks from './EditAndSaveComponentCareerLinks';
import quickCareerJobLinkLocations from './../../utils/constants/json/quickCareerJobLinkLocations.json';
import { hideSideBar } from '../../utils/ReduxStore/appSlice';

const QuickCareerLinks = () => {

    // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState([]);
    const [filteredRowData, setFilteredRowData] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [resetQuickFilterRolesAndLocations, setResetQuickFilterRolesAndLocations] = useState(false);
    const [enableQuickFilter, setEnableQuickFilter] = useState({});
    const [dateFilter, setDateFilter] = useState("");
    const [isEditRow, setIsEditRow] = useState(true);

    const quickCareerLinkFilters = useSelector((store) => store.companies.quickCareerLinkFilters);

    const openJobLink = (params) => {
        setNavJobLinkCompany(params.data);
        if (!params.data.jobLink) {
            return null;
        }
        const url = params.data.jobLink;
        window.open(url, "_blank");
        if (params.data.jobStatus === "Yet to Apply" || params.data.jobStatus === "Save Only") {
            setAlertDialogOpen(true);
        }
    }

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState([
        {
            headerName: "", field: "", maxWidth: 40,
            sortable: false,
            filter: false,
            filterParams: false,
            editable: false,
            pinned: 'left',
            cellRenderer: "deleteComponent",
            cellRendererParams: (params) => ({
                info: params.data,
                getJobLinkDetails: getJobLinkDetails
            })
        },
        {
            headerName: "", field: "", maxWidth: 60,
            sortable: false,
            filter: false,
            filterParams: false,
            editable: false,
            pinned: 'left',
            cellRenderer: "editAndSaveComponent",
            cellRendererParams: (params) => ({
                isEditRow: isEditRow,
                setIsEditRow: setIsEditRow,
                info: params.data,
                getJobLinkDetails: getJobLinkDetails,
                gridRef: gridRef,
                rowIndex: params.node.rowIndex
            })
        },
        {
            headerName: "Company", field: "company", minWidth: 240,
            editable: false,
            cellRenderer: "iconComponent",
            cellRendererParams: (params) => ({
                info: {
                    companyIconURL: params.data.companyIconURL,
                    displayName: params.data.company,
                },
            })
        },
        {
            headerName: "Role", field: "jobRole", minWidth: 240,
            cellEditor: "agSelectCellEditor",
            cellEditorParams: {
                values: quickCareerJobLinkRoles.map((item) => item.displayName),
            }
        },
        {
            headerName: "Location", field: "jobLocation", minWidth: 200,
            cellEditor: "agSelectCellEditor",
            cellEditorParams: {
                values: quickCareerJobLinkLocations.map((item) => item.displayName),
            }
        },
        {
            headerName: "Job ID", field: "jobID", minWidth: 200,
            cellStyle: params => {
                if (params?.value) {
                    return { fontWeight: 600, display: 'flex', alignItems: 'center' }
                }
            }
        },
        {
            headerName: "Job Link", field: "jobLink", minWidth: 300,
            onCellClicked: openJobLink.bind(this),
            cellStyle: params => {
                if (params?.value) {
                    return {
                        color: '#337ab7', textDecoration: 'underline', cursor: 'pointer', textUnderlineOffset: '4px',
                        display: 'flex', alignItems: 'center', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        overflow: 'hidden', maxWidth: 240
                    }
                }
            }
        },
        {
            headerName: "Status", field: "jobStatus", minWidth: 200,
            cellRenderer: "statusComponent",
            editable: false,
            cellRendererParams: (params) => ({
                info: params.data,
                getJobLinkDetails: getJobLinkDetails
            })
        },
        {
            headerName: "Candidate ID", field: "candidateID", minWidth: 200,
            cellStyle: params => {
                if (params?.value) {
                    return { fontWeight: 600, display: 'flex', alignItems: 'center' }
                }
            }
        },
        {
            headerName: "Job Source", field: "jobSource", minWidth: 200
        },
        {
            headerName: "Date", field: "createdOn", minWidth: 200,
            tooltipValueGetter: params => setToolTipForDate(params),
            editable: false,
            comparator: (valueA, valueB) => {
                const dateA = new Date(valueA).getTime();
                const dateB = new Date(valueB).getTime();
                return dateA - dateB;
            }
        }
    ]);

    const myTheme = themeQuartz.withParams({
        fontFamily: 'Roboto Slab',
        headerFontFamily: "Rubik",
        cellFontFamily: "Roboto Slab",
    });
    const theme = useMemo(() => {
        return myTheme;
    }, []);
    const pagination = true;
    const paginationPageSize = 10;
    const paginationPageSizeSelector = [10, 25, 50, 100];
    const [defaultColDef, setDefaultColDef] = useState({
        flex: 1,
        minWidth: 100,
        filter: true,
        editable: true,
        cellStyle: (params) => ({
            display: "flex",
            alignItems: "center"
        })
    });
    const [loading, setLoading] = useState(false);
    const rowHeight = 60;
    const [alertDialogOpen, setAlertDialogOpen] = useState(false);

    const [navJobLinkCompany, setNavJobLinkCompany] = useState("");

    const gridRef = useRef(null);
    const userInfo = useSelector((store) => store.app.userInfo);
    const dispatch = useDispatch();

    const onFilterTextBoxChanged = useCallback(() => {
        gridRef.current.api.setGridOption(
            "quickFilterText",
            document.getElementById("filter-text-box").value,
        );
    }, []);

    const setToolTipForDate = (params) => {
        if (params?.data?.jobStatus === "Applied") {
            return "Applied On";
        }
        else if (params?.data?.jobStatus === "Interview Done") {
            return "Interview Finished On";
        }
        else if (params?.data?.jobStatus === "Selected") {
            return "Selected On";
        }
        else if (params?.data?.jobStatus === "Rejected") {
            return "Rejected On";
        }
        else if (params?.data?.jobStatus === "Offer Received") {
            return "Offer Received On";
        }
        else if (params?.data?.jobStatus === "Application Rejected") {
            return "Application Rejected On";
        }
        else if (params?.data?.jobStatus === "Interview Scheduled") {
            return "Interview Scheduled On";
        }
        else {
            return "Created On";
        }
    }

    const onAddClick = () => {
        setDialogOpen(true);
    }

    const getJobLinkDetails = async (isFilterStateChanged) => {
        if (userInfo?.email) {
            try {
                setLoading(true);
                const userEmail = userInfo?.email;
                const { data } = await axios.get(`${GET_QUICK_CAREER_JOB_LINK}${userEmail}`);
                data.map((entry) => {
                    return entry.createdOn = getDateFormatted(entry.createdOn);
                })
                data.sort((a, b) => {
                    return new Date(b.createdOn) - new Date(a.createdOn);
                });
                setRowData(data);
                setFilteredRowData(data);
                setLoading(false);
                if (isFilterStateChanged) {
                    setResetQuickFilterRolesAndLocations(true);
                } else {
                    setResetQuickFilterRolesAndLocations(false);
                }
            } catch (error) {
                toast.error(error);
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        dispatch(hideSideBar());
        getJobLinkDetails();
    }, [userInfo]);

    useEffect(() => {
        if (quickCareerLinkFilters.length > 0) {
            const groupedFilters = quickCareerLinkFilters.reduce((acc, curr) => {
                if (!acc[curr.category]) {
                    acc[curr.category] = new Set();
                }
                acc[curr.category].add(curr.filter);
                return acc;
            }, {});

            const updatedData = rowData.filter(item => {
                return Object.entries(groupedFilters).every(([key, valueSet]) => {
                    return valueSet.has(item[key]);
                });
            });
            setFilteredRowData(updatedData);
        } else {
            setFilteredRowData(rowData);
        }
    }, [quickCareerLinkFilters]);

    useEffect(() => {
        let trueFound = false;
        Object.keys(enableQuickFilter).forEach(key => {
            if (enableQuickFilter[key] === true) {
                trueFound = true;
                setDateFilter(quickCareerJobLinkDates[key].name);
            }
        })
        if (!trueFound) {
            setDateFilter("");
        }
    }, [enableQuickFilter]);

    useEffect(() => {
        if (dateFilter !== "") {
            const now = new Date();
            let startDate;
            if (dateFilter === "today") {
                startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            } else if (dateFilter === "week") {
                startDate = new Date(now);
                startDate.setDate(now.getDate() - 6);
                startDate.setHours(0, 0, 0, 0);
            } else if (dateFilter === "month") {
                startDate = new Date(now);
                startDate.setDate(now.getDate() - 29);
                startDate.setHours(0, 0, 0, 0);
            }
            const filtered = rowData.filter(item => {
                const itemDate = new Date(item.createdOn);
                return itemDate >= startDate && itemDate <= now;
            });
            setFilteredRowData(filtered);
        } else {
            setFilteredRowData(rowData);
        }
    }, [dateFilter]);

    const handleApplied = async () => {
        const updatedData = {
            ...navJobLinkCompany,
            jobStatus: "Applied"
        }
        try {
            const { data } = await axios.put(PUT_QUICK_CAREER_JOB_LINK_STATUS, updatedData);
            getJobLinkDetails();
            setAlertDialogOpen(false);
        } catch (error) {
            toast.error(error);
            setAlertDialogOpen(false);
        }
    }

    const handleAlertCancel = () => {
        setAlertDialogOpen(false);
    }

    return (
        <div className='m-2 lg:m-8 md:m-4 w-full'>
            <div className='quick-search-header'>
                <h1 className='font-bold text-2xl'>Quick Career Links</h1>
                <div className='flex gap-4'>
                </div>
            </div>
            <div>
                <div className='my-4 flex justify-between'>
                    <input
                        type="text"
                        id="filter-text-box"
                        placeholder="Search Filter..."
                        className='bg-neutral-200 shadow-2xl py-2 px-4 rounded-xl dark:bg-gray-700 w-2/4 cursor-pointer'
                        onInput={onFilterTextBoxChanged}
                    />
                    <div className='flex gap-6 ml-auto mr-10'>
                        {quickCareerJobLinkDates?.map((item) => <SlidderToggle key={item.id} slidderInfo={item}
                            enableQuickFilter={enableQuickFilter} setEnableQuickFilter={setEnableQuickFilter} />)}
                    </div>
                    <div className='flex gap-8'>
                        <button className='bg-green-700 rounded-xl py-2 px-16 font-bold cursor-pointer hover:bg-white 
                        add-btn text-white' onClick={onAddClick}>
                            Add
                        </button>
                    </div>
                </div>
                <div className='flex gap-4'>
                    {rowData.length > 0 && <QuickCareerLinksFilters info={filteredRowData}
                        resetQuickFilterRolesAndLocations={resetQuickFilterRolesAndLocations}
                        setResetQuickFilterRolesAndLocations={setResetQuickFilterRolesAndLocations} />}
                    <motion.div
                        style={{ height: '70vh', flexGrow: 1 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}>
                        <AgGridReact
                            ref={gridRef}
                            rowData={filteredRowData}
                            columnDefs={colDefs}
                            defaultColDef={defaultColDef}
                            theme={theme}
                            components={{
                                iconComponent: IconComponentCareerLinks,
                                statusComponent: StatusComponentCareerLinks,
                                deleteComponent: DeleteComponentCareerLinks,
                                editAndSaveComponent: EditAndSaveComponentCareerLinks
                            }}
                            pagination={pagination}
                            paginationPageSize={paginationPageSize}
                            paginationPageSizeSelector={paginationPageSizeSelector}
                            loading={loading}
                            rowHeight={rowHeight}
                            tooltipShowDelay={500}
                            editType={"fullRow"}
                            suppressClickEdit={true}
                        />
                    </motion.div>
                </div>

                <QuickCareerLinksAddDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} getJobLinkDetails={getJobLinkDetails} />

                <AlertDialog open={alertDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Did you apply to {navJobLinkCompany.jobRole} at {navJobLinkCompany.company}?</AlertDialogTitle>
                            <AlertDialogDescription>
                                If yes, please select 'Applied'. {navJobLinkCompany.company} will be marked as 'Applied'.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="cursor-pointer" onClick={handleAlertCancel}>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="cursor-pointer" onClick={handleApplied}>Applied</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>

                </AlertDialog>

            </div>
        </div>
    )
}

export default QuickCareerLinks;