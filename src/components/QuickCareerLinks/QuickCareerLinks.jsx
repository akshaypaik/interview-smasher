import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './QuickCareerLinks.css';
import { AgGridReact } from 'ag-grid-react';
import toast from 'react-hot-toast';
import { GET_QUICK_CAREER_JOB_LINK, PUT_QUICK_CAREER_JOB_LINK_STATUS_APPLIED } from '../../utils/constants/apiConstants';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { getDateFormatted } from '../../utils/helper';
import { themeQuartz } from "ag-grid-community";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import quickFilterCareerLinkOptions from "../../utils/constants/json/quickFilterCareerLinkOptions.json"
import SlidderToggle from '../Shared/SlidderToggle/SlidderToggle';
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

function IconComponent({ info }) {
    return <span className='flex gap-2'>
        {/* {info.companyIconURL ? <img src={info.companyIconURL} alt='company-icon' className='h-8' /> : info.displayName} */}

        {info.companyIconURL ?
            <Tooltip>
                <TooltipTrigger asChild>
                    <img src={info.companyIconURL} alt='company-icon' className='h-8' />
                </TooltipTrigger>
                <TooltipContent side="right" align="center">
                    {info.displayName}
                </TooltipContent>
            </Tooltip>
            :
            info.displayName
        }
    </span>
}

const QuickCareerLinks = () => {

    // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState([]);
    const [filteredRowData, setFilteredRowData] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);

    const openJobLink = (params) => {
        setNavJobLinkCompany(params.data);
        if (!params.data.jobLink) {
            return null;
        }
        const url = params.data.jobLink;
        window.open(url, "_blank");
        if(params.data.jobStatus != "Applied"){
            setAlertDialogOpen(true);
        }
    }

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState([
        {
            headerName: "Company", field: "company", minWidth: 240,
            cellRenderer: "iconComponent",
            cellRendererParams: (params) => ({
                info: {
                    companyIconURL: params.data.companyIconURL,
                    displayName: params.data.company,
                },
            })
        },
        { headerName: "Role", field: "jobRole", minWidth: 240 },
        { headerName: "Location", field: "jobLocation", minWidth: 200 },
        {
            headerName: "Job ID", field: "jobID", minWidth: 200,
            cellStyle: params => {
                if (params?.value) {
                    return { fontWeight: 600 }
                }
            }
        },
        {
            headerName: "Job Link", field: "jobLink", minWidth: 300,
            onCellClicked: openJobLink.bind(this),
            cellStyle: params => {
                if (params?.value) {
                    return { color: '#337ab7', textDecoration: 'underline', cursor: 'pointer', textUnderlineOffset: '4px' }
                }
            }
        },
        {
            headerName: "Status", field: "jobStatus", minWidth: 200,
            cellStyle: params => setStylesForStatus(params)
        },
        {
            headerName: "Created On", field: "createdOn", minWidth: 200,
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
        filter: true
    });
    const [loading, setLoading] = useState(false);
    const [alertDialogOpen, setAlertDialogOpen] = useState(false);

    const [enableQuickFilter, setEnableQuickFilter] = useState({});
    const [navJobLinkCompany, setNavJobLinkCompany] = useState("");

    const gridRef = useRef(null);
    const userInfo = useSelector((store) => store.app.userInfo);

    const onFilterTextBoxChanged = useCallback(() => {
        gridRef.current.api.setGridOption(
            "quickFilterText",
            document.getElementById("filter-text-box").value,
        );
    }, []);

    const setStylesForStatus = (params) => {
        const style = { textAlign: 'center', borderRadius: '8px' };
        if (params?.value === "Yet to Apply") {
            style.backgroundColor = "#f5af19";
        }
        if (params?.value === "Applied") {
            style.backgroundColor = "#38ef7d";
        }
        if (params?.value === "Save Only") {
            style.backgroundColor = "#00B4DB";
        }
        return style;
    }

    const onAddClick = () => {
        setDialogOpen(true);
    }

    const getJobLinkDetails = async () => {
        try {
            setLoading(true);
            const userEmail = userInfo?.email;
            const { data } = await axios.get(`${GET_QUICK_CAREER_JOB_LINK}${userEmail}`);
            data.map((entry) => {
                return entry.createdOn = getDateFormatted(entry.createdOn);
            })
            setRowData(data);
            setFilteredRowData(data);
            setLoading(false);
        } catch (error) {
            toast.error(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getJobLinkDetails();
    }, []);

    useEffect(() => {
        let trueFound = false;
        Object.keys(enableQuickFilter).forEach(key => {
            if (enableQuickFilter[key] === true) {
                trueFound = true;
                const updatedData = rowData.filter((item) => item.jobStatus === quickFilterCareerLinkOptions[key].displayName);
                setFilteredRowData(updatedData);
            }
        })
        if (!trueFound) {
            setFilteredRowData(rowData);
        }
    }, [enableQuickFilter]);

    const handleApplied = async() => {
        try{
            const { data } = await axios.put(PUT_QUICK_CAREER_JOB_LINK_STATUS_APPLIED, navJobLinkCompany);
            getJobLinkDetails();
            setAlertDialogOpen(false);
        }catch(error){
            toast.error(error);
            setAlertDialogOpen(false);
        }
    }

    const handleAlertCancel = () => {
        setAlertDialogOpen(false);
    }

    return (
        <div className='m-2 lg:m-8 md:m-4 w-4/5'>
            <div className='quick-search-header'>
                <h1 className='font-bold text-2xl'>Quick Career Links</h1>
                <div className='flex gap-4'>
                </div>
            </div>
            <div>
                <div className='my-4 mx-6 flex justify-between'>
                    <input
                        type="text"
                        id="filter-text-box"
                        placeholder="Search Filter..."
                        className='bg-neutral-200 shadow-2xl py-2 px-4 rounded-xl dark:bg-gray-700 w-1/4'
                        onInput={onFilterTextBoxChanged}
                    />
                    <div className='flex gap-8'>
                        {quickFilterCareerLinkOptions?.map((item) => <SlidderToggle key={item.id} slidderInfo={item}
                            enableQuickFilter={enableQuickFilter} setEnableQuickFilter={setEnableQuickFilter} />)}
                        <button className='bg-green-700 rounded-xl py-2 px-16 font-bold cursor-pointer hover:bg-white 
                        add-btn text-white' onClick={onAddClick}>
                            Add
                        </button>
                    </div>
                </div>
                <div style={{ height: '70vh', width: '100%', margin: '24px' }}>
                    <AgGridReact
                        ref={gridRef}
                        rowData={filteredRowData}
                        columnDefs={colDefs}
                        defaultColDef={defaultColDef}
                        theme={theme}
                        components={{
                            iconComponent: IconComponent
                        }}
                        pagination={pagination}
                        paginationPageSize={paginationPageSize}
                        paginationPageSizeSelector={paginationPageSizeSelector}
                        loading={loading}
                    />
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