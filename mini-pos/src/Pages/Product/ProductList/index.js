import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

import BorderColorIcon from "@material-ui/icons/BorderColor";

import UpdateRowDialog from "./DialogEditProduct";
import { getCategoryLocalStorage } from "../../../Services/categoryService";
import { addProductToLocalStorage, getProductLocalStorage } from "../../../Services/productService";

// STYLE FOR PRODUCT
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        overflow: 'hidden',
        borderTop: '1px solid #eee',
        borderLeft: '1px solid #eee',
        backgroundColor: theme.palette.background.paper,
        position: 'absolute',
        top: 340
    },
    imageList: {
        // height: 700,
        maxWidth: 850,
        marginLeft: '10px',
    },
    imageListItem: {
        minWidth: 390,
        height: 140,
        border: '1px solid #ccc',
        margin: '10px 10px',
    },
    imageListItemBar: {
        backgroundColor: "#b75b80",
    },
    button: {
        backgroundColor: '#492433',
        color: "#fff",
        width: 'max-content',
        fontSize: 14,
        marginTop: 20,
        '&:hover': {
            color: "#000"
        },
    },
    inputProduct: {
        backgroundColor: '#eee',
    }
}));

// CONTAIN FORM TO ADD / EDIT PRODUCT, LIST OF PRODUCTS
const ProductList = ({ items, setFromProductList }) => {
    const classes = useStyles();
    const [openDialog, setOpenDialog] = useState(false); //handle dialog (show / not showing)
    const [rowToUpdate, setRowToUpdate] = useState([]); //handle specific row you want to update
    const [listCategory, setListCategory] = useState(getCategoryLocalStorage() || []); // handle list of categories
    const [listProduct, setListProduct] = useState(getProductLocalStorage() || []); // handle list of products
    const [dataOrder, setDataOrder] = useState([]); // handle selected products added to the order list
    const [buttonShow, setButtonShow] = useState(false); // handle edit button (show / not showing)
    const [values, setValues] = useState({ //for setting new product
        id: null,
        name: null,
        price: null,
        category: null
    });

    // function to handle button for edit product (showing the edit button)
    const handleEdit = () => {
        setButtonShow(true)
    }

    // function to handle button for edit product (closing the edit button)
    const handleEditFinish = () => {
        setButtonShow(false)
    }

    // function to handle dialog for edit product (showing the dialog)
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    // function to handle dialog for edit product (closing the dialog)
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    // function to handle product addition
    const handleSubmit = () => {
        if (values.id && values.name && values.price && values.category) {
            let data = [...listProduct, values]
            setListProduct(data)
            addProductToLocalStorage(data) //save new product to localstorage
            setValues({ ...values, name: null, price: 0, category: null })
        }
    }

    // function to handle product addition to order list
    const addProductToOrder = (id, name, price, category) => {
        let order = dataOrder?.filter((data) => data.id === id)
        if (buttonShow !== true) { //if edit button not showing => can add product to order list
            if (order.length < 1) {
                setDataOrder([...dataOrder, { id: id, name: name, price: price, category: category }])
                setFromProductList([...dataOrder, { id: id, name: name, price: price, category: category }])
            }
        }
    }

    // fuction to handle dialog for edit product (send the selected product data)
    const onClick = (productId) => {
        setOpenDialog(true);
        let product = listProduct.filter((data) => {
            return data.id === productId;
        });
        setRowToUpdate(product) //send product data (id, name, price, category) based on the selected
    };

    return (
        <div>
            <Paper style={{ position: 'fixed', zIndex: 1, width: '62vw', height: 'max-content', marginTop: -6 }}>
                <form onSubmit={handleSubmit}> {/* form to add product */}
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                {/* textfield to add product name */}
                                <TextField
                                    fullWidth
                                    required
                                    variant={"outlined"}
                                    name={"name"}
                                    type={"text"}
                                    label="Product Name"
                                    size={"small"}
                                    value={values.name ? values.name : ""}
                                    className={classes.inputProduct}
                                    onChange={(e) => setValues({ ...values, id: listProduct.length + 1, name: e.target.value })}
                                /><br /><br />
                                {/* formcontrol to add category */}
                                <FormControl variant={"outlined"} size="small" fullWidth className={classes.inputProduct}>
                                    <InputLabel>Category</InputLabel>
                                    <Select
                                        value={values.category ? values.category : ""}
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
                            <Grid item xs={12} md={6}>
                                {/* textfield to add price */}
                                <TextField
                                    size="small"
                                    fullWidth
                                    required
                                    variant={"outlined"}
                                    name={"price"}
                                    type="number"
                                    label="Price"
                                    className={classes.inputProduct}
                                    InputProps={{ inputProps: { min: 0 } }}
                                    value={values.price ? values.price : null}
                                    onChange={(e) => setValues({ ...values, price: e.target.value })}
                                />
                                {/* button to sumbit new product */}
                                <Button onClick={handleSubmit} size="large" variant="contained" disabled={false} className={classes.button}>
                                    Add Product
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </form>

                {/* handle edit button (show / not showing) */}
                {buttonShow === true ? (
                    <Button onClick={handleEditFinish} size="large" variant="contained" disabled={false} className={classes.button}>
                        Update Product Finished
                    </Button>
                ) : (
                    <Button onClick={handleEdit} size="large" variant="contained" disabled={false} className={classes.button}>
                        Update Product
                    </Button>
                )}
            </Paper>

            <Paper>
                <div className={classes.root}>
                    {/* list of poducts */}
                    <ImageList rowHeight={130} gap={5} className={classes.imageList}>
                        {listProduct.map((item) => (
                            <Grid item xs={12} md={6} style={{ marginBottom: 20 }}>
                                <ImageListItem key={item.id} className={classes.imageListItem}
                                    onClick={() => { addProductToOrder(item.id, item.name, item.price, item.category) }}
                                >
                                    <h3 align="center">🛒 {item.name}</h3>
                                    <p style={{ fontStyle: 'italic', fontWeight: 'bold' }} align="center">
                                        {item.category}
                                    </p>
                                    <ImageListItemBar align="right" title={`Rp ${item.price}`} className={classes.imageListItemBar} />
                                    {buttonShow === true ? (
                                        <Tooltip title="Press to update">
                                            <Button onClick={() => { onClick(item.id) }}>
                                                <BorderColorIcon />
                                            </Button>
                                        </Tooltip>
                                    ) : (<p></p>)}
                                </ImageListItem>
                            </Grid>
                        ))}
                    </ImageList>
                </div>
            </Paper>

            {/* Dialog Component (if open=true => dialog to edit product will show) */}
            <UpdateRowDialog
                open={openDialog}
                handleOpenDialog={handleOpenDialog}
                handleCloseDialog={handleCloseDialog}
                row={rowToUpdate}
                items={listProduct}
                listCategory={listCategory}
            />
        </div >
    );
}

export default ProductList;