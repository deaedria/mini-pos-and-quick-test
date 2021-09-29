import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from '@material-ui/core/styles';

import BorderColorIcon from "@material-ui/icons/BorderColor";

import UpdateRowDialog from "./DialogEditCategory";
import { addCategoryToLocalStorage, getCategoryLocalStorage } from "../../../Services/categoryService";

// STYLE FOR CATEGORY
const useStyles = makeStyles(() => ({
    button: {
        backgroundColor: '#492433',
        color: "#fff",
        width: '20%',
        fontSize: 14,
        marginLeft: 20,
        marginTop: -1,
        '&:hover': {
            color: "#000"
        }
    },
    inputCategory: {
        backgroundColor: '#eee',
    }
}));

// CONTENT OF TABLE
const TableViewRow = ({ categoryId, name, onClick }) => {
    return (
        <TableRow hover>
            <TableCell component="th" scope="row">{categoryId}</TableCell>
            <TableCell align="left">{name}</TableCell>
            <TableCell align="left"> {/* Click to view dialog (dialog for edit one of the categories) */}
                <Tooltip title="Press to update">
                    <Button onClick={() => {
                        onClick(categoryId)
                    }}>
                        <BorderColorIcon />
                    </Button>
                </Tooltip>
            </TableCell>
        </TableRow>
    );
}

// CONTAIN FORM TO ADD / EDIT CATEGORY, LIST OF CATEGORIES
const CategoryList = ({ items }) => {
    const classes = useStyles();
    const [openDialog, setOpenDialog] = useState(false); //handle dialog (show / not showing)
    const [rowToUpdate, setRowToUpdate] = useState([]); //handle specific row you want to update
    const [listCategory, setListCategory] = useState(getCategoryLocalStorage() || []); //handle list of category
    const [values, setValues] = useState({ //for setting new category
        id: 0,
        name: null
    });

    // function to handle dialog for edit category (showing the dialog)
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    // function to handle dialog for edit category (closing the dialog)
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    // fuction to handle dialog for edit category (send the selected category data)
    const onClick = (categoryId) => {
        setOpenDialog(true);
        let category = listCategory.filter((data) => {
            return data.id === categoryId;
        });
        setRowToUpdate(category); //send category data (id, name) based on the selected
    };

    // function to handle category addition
    const handleSubmit = () => {
        if (values.name !== "") {
            let data = [...listCategory, values]
            setListCategory(data)
            addCategoryToLocalStorage(data) //save new category to localstorage
            setValues({ ...values, name: "" })
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}> {/* form to add category */}
                {/* textfield to add category name */}
                <TextField
                    required
                    variant={"outlined"}
                    name={"name"}
                    type={"text"}
                    label="Category Name"
                    size={"small"}
                    value={values.name ? values.name : ""}
                    className={classes.inputCategory}
                    onChange={(e) => setValues({ ...values, id: listCategory.length + 1, name: e.target.value })}
                />
                {/* button to sumbit new category */}
                <Button onClick={handleSubmit} size="large" variant="contained" disabled={false} className={classes.button}>
                    Add Category
                </Button>
            </form>

            <h4>Category List</h4>
            <TableContainer style={{ height: 340 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead> {/* table header */}
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="left">Category Name</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody> {/* content of table*/}
                        {listCategory.map(({ id, name }) => {
                            return (
                                <TableViewRow
                                    categoryId={id}
                                    key={id}
                                    name={name}
                                    onClick={() => {
                                        onClick(id)
                                    }}
                                />
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog Component (if open=true => dialog to edit category will show) */}
            <UpdateRowDialog
                open={openDialog}
                handleOpenDialog={handleOpenDialog}
                handleCloseDialog={handleCloseDialog}
                row={rowToUpdate}
                items={listCategory}
            />
        </div >
    );
}

export default CategoryList;
