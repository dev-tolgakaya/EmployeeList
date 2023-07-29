import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Grid } from "@mui/material";
import Pagination from '@mui/material/Pagination';


const TablePagination = (props) => {
    const [page, setPage] = useState(props.page);
    const pageCount = parseInt(Math.ceil(props.totalCount / props.pageCount));
  
    const handlePagination = (_event, tPage) => {
      setPage(tPage);
      if (props.onChange) props.onChange(tPage);
    };
  
    const pageSizeContentText = useMemo(() => {
      const tCount = props.totalCount;
      const pCount = props.pageCount;
      let prevCount = parseInt(page * pCount) || 0;
      prevCount = prevCount > tCount ? tCount : prevCount;
      return `${prevCount}/${tCount}`;
    }, [props.totalCount, props.pageCount, page]);
  
    useEffect(() => {
      setPage(props.page);
    }, [props.page]);
  
    return (
      <Box xs={12} sm={12} md={4} my={3} mr={1}>
        <Grid container justifyContent="flex-end" alignItems="center">
          <Grid item>
            <Pagination
              count={pageCount}
              color={props.color}
              page={page}
              onChange={handlePagination}
            />
          </Grid>
          <Grid item>{pageSizeContentText}</Grid>
        </Grid>
      </Box>
    );
  };
  
  TablePagination.propTypes = {
    page: PropTypes.number,
    totalCount: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
    onChange: PropTypes.func,
  };
  
  TablePagination.defaultProps = {
    color: "primary",
    page: 1,
  };
  
  export default TablePagination;