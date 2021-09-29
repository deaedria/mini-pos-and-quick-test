import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";

import { addCategoryToLocalStorage } from "../../../../Services/categoryService";

// STYLE FOR DIALOG (DIALOG TO EDIT CATEGORY)
const useStyles = makeStyles({
    titleLeft: {
        margin: "20px 0 10px 0",
        backgroundColor: "#b75b80",
        padding: "10px 30px 10px 40px",
        borderRadius: "0 30px 30px 0",
        color: "white",
        position: "relative",
        marginLeft: "inherit",
        width: "fit-content"
    },
    field: {
        width: "fit-content",
        margin: "10px 20px",
        "& .MuiOutlinedInput-input": {
            padding: "18.5px 27px"
        }
    }
});

// DIALOG - CONTAINS FORM FOR EDIT THE SELECTED CATEGORY
const UpdateRowDialog = ({ open, handleCloseDialog, row, items }) => {
    const classes = useStyles();
    const [values, setValues] = useState({ //for handle value of id and category name
        id: row.length > 0 ? row[0].id : "",
        name: row.length > 0 ? row[0].name : ""
    });

    useEffect(() => { //if row changed, this useEffect will run
        setValues({
            id: row.length > 0 ? row[0].id : "",
            name: row.length > 0 ? row[0].name : ""
        });
    }, [row]);

    // function to handle dialog for edit category (closing the dialog)
    const handleClose = () => {
        handleCloseDialog();
    };

    // function to save the results of changes from categories
    const saveUpdatedCategory = (name) => (event) => {
        const category = items.find(category => category.id === values.id) //find category data
        const newData = [];
        if (values.name !== "") {
            category.name = values.name; //change the name
            items.forEach((list) => { //push to newData
                list.id !== values.id ? newData.push(list) : newData.push(category)
            })
            addCategoryToLocalStorage(newData) //add new category list to localstorage
            handleClose(); //close the dialog
        }
        event.preventDefault()
        handleClose();
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <form noValidate autoComplete="off" onSubmit={saveUpdatedCategory("name")}>
                    {/* Dialog title */}
                    <DialogTitle style={{ padding: "0" }}>
                        <Grid container justify={"space-between"}>
                            <Grid item xs={10}>
                                <div className={classes.titleLeft}>
                                    <Typography variant={"h5"} align={"left"}>
                                        Update Category
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item container justify={"center"} alignItems={"center"} direction={"column"} xs={2}>
                                <IconButton color="inherit" onClick={handleClose}>
                                    <CloseIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </DialogTitle>

                    {/* Dialog content */}
                    <DialogContent dividers>
                        <Grid container justify={"center"} alignItems={"center"} direction={"column"}>
                            {/* textfield for category id (disabled) */}
                            <TextField
                                disabled
                                className={classes.field}
                                variant={"outlined"}
                                name={"id"}
                                type={"text"}
                                label="Id"
                                value={values.id}
                            />
                            {/* textfield for category name */}
                            <TextField
                                required
                                className={classes.field}
                                variant={"outlined"}
                                name={"name"}
                                type={"text"}
                                label="Category Name"
                                value={values.name}
                                onChange={(e) => setValues({ ...values, name: e.target.value })}
                            />
                        </Grid>
                    </DialogContent>

                    {/* Dialog action (Update button) */}
                    <DialogActions>
                        <Button
                            type={"submit"}
                            size={"large"}
                            variant={"contained"}
                            color="secondary"
                            onSubmit={saveUpdatedCategory("name")}
                        >
                            Update
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div >
    );
}

export default UpdateRowDialog;
