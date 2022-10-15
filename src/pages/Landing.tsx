import React, { useState, useRef, useMemo, useCallback, useContext} from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import { Box } from '@mui/material'
import styled from '@mui/styled-engine-sc'

import { ApiContext } from "../Provider";
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

const Landing: React.FC = () => {
  // const gridRef = useRef<any>();
  const gridRef = useRef<any>();
  const [columnDefs] = useState([
    {field: 'make', filter: true},
    // {field: 'make', filter: true},
    {field: 'model', filter: true},
    {field: 'price'}
  ]);

  const defaultColDef = useMemo(()=> ({
    sortable: true
  }), []);

  const cellClickedListener = useCallback((event: any) => {
    // console.log('cellClicked', event);
  }, []);

  const { data, error, isError, isLoading } = useContext(ApiContext);
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error! {error.message}</div>
  }

  return (
    <StyledContainer>
      <div className="ag-theme-alpine" style={{width: 500, height: 500}}>
        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API
          rowData={data} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection='multiple' // Options - allows click selection of rows
          onCellClicked={cellClickedListener} // Optional - registering for Grid Event
        />
      </div>
    </StyledContainer>
  );
};

const StyledContainer = styled(Box)`
  > main {
    position: relative;
    height: 100vh;
    > section {
      position: absolute;
      width: 100%;
      transition: 1s;
    }
  }
`;
export default Landing;
