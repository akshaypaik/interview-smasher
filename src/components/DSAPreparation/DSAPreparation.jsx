import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { GET_DSA_TOP_SIXTY_PROBLEMS } from '../../utils/constants/apiConstants';
import { useSelector } from 'react-redux';
import { themeQuartz } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { motion } from 'framer-motion';

const DSAPreparation = () => {

    const [rowData, setRowData] = useState([]);
    const [filteredRowData, setFilteredRowData] = useState([]);

    const autoGroupColumnDef = useMemo(() => {
        return {
            minWidth: 200,
        };
    }, []);

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

    const gridRef = useRef(null);
    const userInfo = useSelector((store) => store.app.userInfo);

    const onFilterTextBoxChanged = useCallback(() => {
        gridRef.current.api.setGridOption(
            "quickFilterText",
            document.getElementById("filter-text-box").value,
        );
    }, []);

    const handleClick = (params) => {
        alert(`Button clicked for ${params.data.name}`);
    };

    const ActionButton = ({ leetCodeLink }) => {
        return <button onClick={() => window.open(leetCodeLink, '_blank')}
            className='border-blue-800 text-blue-600 cursor-pointer'>
            Link
        </button>;
    };

    const [colDefs, setColDefs] = useState([
        {
            headerName: "Problem", field: "problem", minWidth: 200,
            cellStyle: params => {
                if (params?.data) {
                    return {
                        fontWeight: 600
                    }
                }
            }
        },
        {
            headerName: "Category", field: "category", minWidth: 200,
        },
        {
            headerName: "Difficulty", field: "difficulty", minWidth: 200
        },
        {
            headerName: "Status", field: "status", minWidth: 200
        },
        {
            headerName: "LeetCode Link", field: "leetCodeLink", cellRenderer: ActionButton, minWidth: 200,
            cellRendererParams: (params) => ({
                leetCodeLink: params?.data?.leetCodeLink,
            }),
            cellStyle: params => {
                if (params?.data) {
                    return {
                        border: '1px solid blue', textAlign: 'center', borderRadius: '8px', display: 'flex',
                        alignItems: 'center', width: '100%', top: '12px',
                        justifyContent: 'center', fontWeight: 600, height: '32px', cursor: 'pointer'
                    }
                }
            }
        },
    ]);

    const fetchDSATopSixtyProblems = async () => {
        try {
            const { data } = await axios.get(GET_DSA_TOP_SIXTY_PROBLEMS);
            setRowData(data);
            setFilteredRowData(data);
            console.log(data);
        } catch (error) {
            toast.error(error);
        }
    }

    useEffect(() => {
        fetchDSATopSixtyProblems();
    }, []);

    return (
        <div className='m-2 lg:m-8 md:m-4 w-full'>
            <div className='quick-search-header mb-4'>
                <h1 className='font-bold text-2xl'>Top 60 DSA Questions</h1>
            </div>
            <div className='mb-4'>
                <input
                    type="text"
                    id="filter-text-box"
                    placeholder="Search Filter..."
                    className='bg-neutral-200 shadow-2xl py-2 px-4 rounded-xl dark:bg-gray-700 w-2/4 cursor-pointer'
                    onInput={onFilterTextBoxChanged}
                />
            </div>
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
    )
}

export default DSAPreparation