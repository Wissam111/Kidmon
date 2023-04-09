import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import { tableMaincolumn } from "../../../data/data";
import "./ProdcutsTable.css";

const ProdcutsTable = ({ products, page, pageSize, handleChangePage }) => {
  const PAGE_SIZE = 10;

  function createData(img, name, category, price, sold, action) {
    return { img, name, category, price, sold, action };
  }
  return (
    <div className="products-table-container">
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {tableMaincolumn.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => {
                let row = createData(
                  require("../../../assets/icons/coffee-cup.png"),
                  product.title,
                  product.category,
                  product.price,
                  20,
                  require("../../../assets/icons/colon.png")
                );
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {tableMaincolumn.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "img" ? (
                            <img src={value} />
                          ) : column.id === "action" ? (
                            <img src={value} className="action-btn" />
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="pageination-container">
          <Pagination
            count={10}
            variant="outlined"
            color="primary"
            onChange={handleChangePage}
            page={page}
          />
        </div>
      </Paper>
    </div>
  );
};
export default ProdcutsTable;
// const tableMaincolumn = [
//   { id: "img", numeric: true, disablePadding: false, label: "" },
//   { id: "name", label: "Product Name", minWidth: 170 },
//   { id: "category", label: "Category", minWidth: 100 },
//   {
//     id: "price",
//     label: "Price",
//     minWidth: 170,
//     align: "right",
//   },
//   {
//     id: "sold",
//     label: "Sold",
//     minWidth: 170,
//     align: "right",
//   },
//   { id: "action", numeric: true, disablePadding: false, label: "Action" },
// ];

// const rows = [
//   createData(
//     require("../../../assets/icons/coffee-cup.png"),
//     "Doritos",
//     "Snack",
//     12.99,
//     20,
//     require("../../../assets/icons/colon.png")
//   ),
//   createData(
//     require("../../../assets/icons/coffee-cup.png"),
//     "Doritos",
//     "Snack",
//     12.99,
//     20,
//     require("../../../assets/icons/colon.png")
//   ),
//   createData(
//     require("../../../assets/icons/coffee-cup.png"),
//     "Doritos",
//     "Snack",
//     12.99,
//     20,
//     require("../../../assets/icons/colon.png")
//   ),
//   createData(
//     require("../../../assets/icons/coffee-cup.png"),
//     "Doritos",
//     "Snack",
//     12.99,
//     20,
//     require("../../../assets/icons/colon.png")
//   ),
//   createData(
//     require("../../../assets/icons/coffee-cup.png"),
//     "Doritos",
//     "Snack",
//     12.99,
//     20,
//     require("../../../assets/icons/colon.png")
//   ),
//   createData(
//     require("../../../assets/icons/coffee-cup.png"),
//     "Doritos",
//     "Snack",
//     12.99,
//     20,
//     require("../../../assets/icons/colon.png")
//   ),
// ];
