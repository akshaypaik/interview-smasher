import React, { useCallback, useRef, useState } from 'react';
import './QuickCareerLinks.css';
import { AgGridReact } from 'ag-grid-react';

const QuickCareerLinks = () => {

    // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState([
        {
            company: "Harman", jobRole: "Senior Angular Developer", location: "Bangalore",
            jobID: "R-42643-2025",
            jobLink: "https://jobsearch.harman.com/en_US/careers/JobDetail/Senior-Angular-Developer/25916",
            jobStatus: "Yet to Apply"
        },
        {
            company: "Oracle", jobRole: "Senior User Experience Developer", location: "Bangalore",
            jobID: "282654",
            jobLink: "https://eeho.fa.us2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/jobsearch/job/282654?utm_medium=jobboard&utm_source=LinkedIn",
            jobStatus: "Yet to Apply"
        },
        {
            company: "Google", jobRole: "Senior Software Developer", location: "Bangalore",
            jobID: "2563541",
            jobLink: "https://eeho.fa.us2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/jobsearch/job/282654?utm_medium=jobboard&utm_source=LinkedIn",
            jobStatus: "Applied"
        }
    ]);

    const openJobLink = (params) => {
        if (!params.data.jobLink) {
            return null;
        }
        const url = params.data.jobLink;
        window.open(url, "_blank");
    }

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState([
        { headerName: "Company", field: "company", minWidth: 240 },
        { headerName: "Role", field: "jobRole", minWidth: 240 },
        { headerName: "Location", field: "location", minWidth: 200 },
        { headerName: "Job ID", field: "jobID", minWidth: 200 },
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
        }
    ]);

    const [defaultColDef, setDefaultColDef] = useState({
        flex: 1,
        minWidth: 100,
        filter: true
    })

    const gridRef = useRef(null);

    const onFilterTextBoxChanged = useCallback(() => {
        gridRef.current.api.setGridOption(
            "quickFilterText",
            document.getElementById("filter-text-box").value,
        );
    }, []);

    const setStylesForStatus = (params) => {
        const style = { textAlign: 'center' };
        if (params?.value === "Yet to Apply") {
            style.backgroundColor = "#f5af19";
        }
        if (params?.value === "Applied") {
            style.backgroundColor = "#38ef7d";
        }
        return style;
    }

    return (
        <div className='lg:m-8 md:m-8 w-full'>
            <div className='quick-search-header'>
                <h1 className='font-bold text-2xl'>Quick Career Links</h1>
                <div className='flex gap-4'>
                </div>
            </div>
            <div>
                <div className='my-2 mx-6 flex justify-between'>
                    <input
                        type="text"
                        id="filter-text-box"
                        placeholder="Search Filter..."
                        className='bg-neutral-200 shadow-2xl py-2 px-4 rounded-xl dark:bg-gray-700 w-1/4'
                        onInput={onFilterTextBoxChanged}
                    />
                    <div>
                        <button className='bg-green-700 rounded-xl py-2 px-8 cursor-pointer hover:bg-white 
                        add-btn text-white'>
                            Add
                        </button>
                    </div>
                </div>
                <div style={{ height: '70vh', width: '100%', margin: '24px' }}>
                    <AgGridReact
                        ref={gridRef}
                        rowData={rowData}
                        columnDefs={colDefs}
                        defaultColDef={defaultColDef}
                    />
                </div>
            </div>
        </div>
    )
}

export default QuickCareerLinks;