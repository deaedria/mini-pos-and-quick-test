import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from '@material-ui/core/TableContainer';
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from '@material-ui/core/styles';

import { addBillingToLocalStorage, getBillingLocalStorage } from "../../../Services/transactionService";
import DialogViewBill from "../../Billing/DialogViewBill";

// STYLE FOR ORDER LIST (TRANSACTION PROCESS) 
const useStyles = makeStyles(() => ({
    table: {
        maxWidth: 430,
    },
    listItem: {
        minWidth: 400,
        display: "flex",
        marginLeft: 20,
    },
    button: {
        backgroundColor: '#492433',
        color: "#fff",
        width: '50%',
        marginLeft: '25%',
        marginBottom: 50,
        '&:hover': {
            color: "#000"
        }
    },
    input: {
        maxWidth: 80,
    },
    cashInput: {
        width: '30%',
        marginTop: '-3px'
    },
}));

// CONTAIN lIST OF PRODUCTS YOU WANT TO ORDER, TOTAL PRICE, INPUT TOTAL CASH, AND CHANGE OF MONEY
const OrderList = ({ items }) => {
    const classes = useStyles();
    const [saveQuantity, setSaveQuantity] = useState([]); //handle product id, quantity, and subtotal (current)
    const [savelistProduct, setlistProduct] = useState([]); //handle product list (name, quantity, unit price)
    const [saveBilling, setSaveBilling] = useState(getBillingLocalStorage() || []); //handle save new bill
    const [calculateChange, setCalculateChange] = useState({ money: null, return: null }); //handle cash, change of money
    const [open, setOpen] = useState({
        isOpen: false,
        orderId: null,
        orderDate: null,
        total: null,
        totalMoney: null,
        returnMoney: null,
        listProduct: null
    }); // for receipt dialog (handle dialog (showing / not showing), content of receipt)
    const [values, setValues] = useState({
        id: null,
        quantity: null,
        subTotal: null
    }); //handle product id, quantity, and subtotal (Especially changing the quantity)

    // function to handle list of products you want to order 
    const handleOrderList = (e, productId, price, name) => {
        setValues({ ...values, quantity: e.target.value, id: productId, subTotal: e.target.value * price })
        saveQuantity[productId] = { id: productId, quantity: e.target.value, subTotal: e.target.value * price }
        savelistProduct[productId] = { name: name, quantity: e.target.value, unitPrice: price }
        // setlistProduct([...savelistProduct, { name: name, quantity: e.target.value, unitPrice: price }])
        setSaveQuantity(saveQuantity)
        // console.log(savelistProduct)
    }

    // function to calculate the total price
    const getTotal = () => {
        if (saveQuantity.length > 0) {
            let total = 0;
            saveQuantity?.forEach((item) => {
                total += item.subTotal;
            });
            return total
        }
        return 0
    }

    // function to calculate the change of money
    const changeOfMoney = (e, total) => {
        let result = (parseInt(e.target.value)) - total
        setCalculateChange({ ...calculateChange, money: parseInt(e.target.value), return: result })
    }

    const onClose = () => { setOpen({ ...open, isOpen: false }) }; //closing receipt dialog

    // function to save the new bills (where it has been paid)
    const pay = () => {
        if (calculateChange.return < 0 || calculateChange.return > getTotal()) {
            alert("Make sure that you have enough money")
        } else if (calculateChange.return >= 0 && savelistProduct.length > 0 &&
            calculateChange.money !== null && calculateChange.money !== 0 && getTotal() > 0 &&
            calculateChange.money >= getTotal() && calculateChange.return <= getTotal()) {

            // remove empty elements from savelistProduct array
            let filteredListProduct = savelistProduct.filter((item) => {
                return item != null
            })

            let newData = { // create new bill
                listProduct: filteredListProduct,
                orderId: saveBilling.length > 0 ?
                    saveBilling[saveBilling.length - 1]?.orderId + 1 : saveBilling.length + 1,
                orderDate: new Date().toLocaleString(),
                total: getTotal(),
                totalMoney: calculateChange.money,
                returnMoney: calculateChange.return,
            }
            let saveData = [...saveBilling, newData]
            setSaveBilling(saveData) // save new bill
            addBillingToLocalStorage(saveData) // save new bill to localstorage
            setOpen({ // receipt dialog 
                ...open, isOpen: true, orderId: newData.orderId,
                orderDate: newData.orderDate, total: newData.total,
                totalMoney: newData.totalMoney, returnMoney: newData.returnMoney,
                listProduct: newData.listProduct
            })

        }
    }

    return (
        <Grid item xs={12} md={4}>
            <Paper style={{ position: 'fixed' }}>
                <TableContainer style={{ height: 282 }}>
                    <Table stickyHeader className={classes.table}>
                        <TableHead> {/* table header */}
                            <TableRow>
                                <TableCell>Product</TableCell>
                                <TableCell align="left">Quantity</TableCell>
                                <TableCell align="left">Price</TableCell>
                                <TableCell align="left">Subtotal</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody> {/* content of table - list of products you want to order  */}
                            {items && items.map((item) => {
                                return (
                                    <TableRow hover>
                                        <TableCell component="th" scope="row">{item.name}</TableCell> {/* product name */}
                                        <TableCell align="left">
                                            {/* text field for quantity */}
                                            <TextField
                                                size="small"
                                                type="number"
                                                variant="outlined"
                                                className={classes.input}
                                                value={values.id === item.id ? values.quantity : ""}
                                                InputProps={{ inputProps: { min: 0, max: 100 } }}
                                                onChange={(e) => {
                                                    handleOrderList(e, item.id, item.price, item.name);
                                                }}
                                            /><br />
                                            <code>current: {saveQuantity[item.id]?.id === item.id ? saveQuantity[item.id]?.quantity : ""}</code>
                                        </TableCell>
                                        <TableCell align="left">Rp {item.price}</TableCell> {/* product price */}
                                        <TableCell align="left">Rp {saveQuantity[item.id]?.id === item.id ? saveQuantity[item.id]?.subTotal : 0} {/* product total */}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

                <hr />
                {/* total price, input total cash, and change of money */}
                <Box sx={{ flexGrow: 1 }} className={classes.listItem}>
                    <Grid item xs={8}>
                        <h3>Total</h3>
                    </Grid>
                    <Grid item xs={4}>
                        <h3>Rp {getTotal()}</h3>
                    </Grid>
                </Box>
                <Box sx={{ flexGrow: 1 }} style={{ marginLeft: 20 }}>
                    <Grid xs={12}>
                        <div>
                            <code>Cash :</code>
                            <code> Rp </code>
                            <TextField
                                type="number"
                                className={classes.cashInput}
                                InputProps={{ inputProps: { min: 0 } }}
                                onChange={(e) => {
                                    changeOfMoney(e, getTotal());
                                }}
                            />
                        </div><br />
                        <div>
                            <code>Change :</code>
                            <code> Rp {calculateChange.return ? calculateChange.return : 0}</code>
                        </div>
                    </Grid>
                </Box><br /><br />
                <Button onClick={pay} size="large" variant="contained" disabled={false} className={classes.button}>
                    Pay
                </Button>
            </Paper>

            {/* Receipt Dialog Component (if open=true => dialog will show) */}
            <DialogViewBill
                open={open.isOpen}
                onClose={onClose}
                orderId={open.orderId}
                orderDate={open.orderDate}
                total={open.total}
                totalMoney={open.totalMoney}
                returnMoney={open.returnMoney}
                listProduct={open.listProduct}
                onProductPage={true}
            />
        </Grid>
    );
}

export default OrderList;