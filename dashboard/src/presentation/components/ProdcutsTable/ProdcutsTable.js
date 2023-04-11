import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import { FaRegTrashAlt } from "react-icons/fa";
import { BASE_URL_1 } from "../../../context/ApiContext";
import { tableMaincolumn } from "../../../data/data";
import "./ProdcutsTable.css";

const ProdcutsTable = ({
  products,
  page,
  numofPages,
  handleChangePage,
  handleDeleteProduct,
}) => {
  function createData(img, name, category, price, sold, action) {
    return { img, name, category, price, sold, action };
  }
  return (
    <div className="products-table-container">
      <Paper
        sx={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
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
                  product.image
                    ? BASE_URL_1 + `imgs/${product.image}`
                    : require("../../../assets/icons/help.png"),
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
                            <FaRegTrashAlt
                              size={20}
                              cursor={"pointer"}
                              color="#0000009c"
                              onClick={() => handleDeleteProduct(product)}
                            />
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
            count={numofPages}
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
