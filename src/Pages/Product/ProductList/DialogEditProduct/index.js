import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { addProductToLocalStorage } from "../../../../Services/productService";

// STYLE FOR DIALOG (DIALOG TO EDIT PRODUCT)
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

// DIALOG - CONTAINS FORM FOR EDIT THE SELECTED PRODUCT
const UpdateRowDialog = ({ open, handleCloseDialog, row, items, listCategory }) => {
    const classes = useStyles();
    const [values, setValues] = useState({ //for handle value of id, product name, price, category
        id: row.length > 0 ? row[0].id : "",
        name: row.length > 0 ? row[0].name : "",
        price: row.length > 0 ? row[0].price : "",
        category: row.length > 0 ? row[0].category : ""
    });

    useEffect(() => { //if row changed, this useEffect will run
        setValues({
            id: row.length > 0 ? row[0].id : "",
            name: row.length > 0 ? row[0].name : "",
            price: row.length > 0 ? row[0].price : "",
            category: row.length > 0 ? row[0].category : "",
        });
    }, [row]);

    // function to handle dialog for edit product (closing the dialog)
    const handleClose = () => {
        handleCloseDialog();
    };

    // function to save the results of changes from products
    const saveUpdatedProduct = (name) => (event) => {
        const product = items.find(product => product.id === values.id) //find product data
        const newData = [];
        if (values.name && values.price && values.category) {
            product.name = values.name; //change the name
            product.price = values.price; //change the price
            product.category = values.category; //change the category
            items.forEach((list) => { //push to newData
                list.id !== values.id ? newData.push(list) : newData.push(product)
            })
            addProductToLocalStorage(newData) //add new product list to localstorage
            handleClose(); //close the dialog
        }
        event.preventDefault()
        handleClose();
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <form noValidate autoComplete="off" onSubmit={saveUpdatedProduct("name")}>
                    {/* Dialog title */}
                    <DialogTitle id="alert-dialog-slide-title" style={{ padding: "0" }}>
                        <Grid container justify={"space-between"}>
                            <Grid item xs={10}>
                                <div className={classes.titleLeft}>
                                    <Typography variant={"h5"} align={"left"}>
                                        Update Product
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
                            {/* textfield for product id (disabled) */}
                            <TextField
                                disabled
                                className={classes.field}
                                variant={"outlined"}
                                name={"id"}
                                type={"text"}
                                label="Id"
                                value={values.id}
                            />
                            {/* textfield for product name */}
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
                            {/* textfield for product price */}
                            <TextField
                                size="large"
                                required
                                variant={"outlined"}
                                name={"price"}
                                type="number"
                                label="Price"
                                className={classes.field}
                                InputProps={{ inputProps: { min: 0 } }}
                                value={values.price}
                                onChange={(e) => setValues({ ...values, price: e.target.value })}
                            />
                            {/* formcontrol for category */}
                            <FormControl variant={"outlined"} size="large" className={classes.field}>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    value={values.category}
                                    label="Category"
                                    onChange={(e) => setValues({ ...values, category: e.target.value })}
                                >
                                    {listCategory && listCategory.map((item) => {
                                        return (
                                            <MenuItem value={item.name}>{item.name}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                    </DialogContent>

                    {/* Dialog action (Update button) */}
                    <DialogActions>
                        <Button
                            type={"submit"}
                            size={"large"}
                            variant={"contained"}
                            color="secondary"
                            onSubmit={saveUpdatedProduct("name")}
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
