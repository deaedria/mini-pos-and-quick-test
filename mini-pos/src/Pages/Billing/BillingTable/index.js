import React, { useState } from 'react';

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";

import ReceiptIcon from '@material-ui/icons/Receipt';

import DialogViewBill from "../DialogViewBill";
import { addBillingToLocalStorage, getBillingLocalStorage } from "../../../Services/transactionService";

// STYLE FOR BILLING TABLE
const useStyles = makeStyles(() => ({
    root: {
        width: "100%",
        overflowX: "auto",
    },
    table: {
        minWidth: 450,
    }
}));

// CONTENT OF TABLE
const TableViewRow = ({ orderId, orderDate, total, totalMoney, returnMoney, listProduct, onClick }) => {
    return (
        <TableRow hover> {/* content per line */}
            <TableCell component="th" scope="row">{orderId}</TableCell>
            <TableCell align="left">{orderDate}</TableCell>
            <TableCell align="left">Rp {total}</TableCell>
            <TableCell align="left"> {/* Click one to view dialog (dialog to view the transaction items) */}
                <Tooltip title="Press to review">
                    <Button onClick={() => {
                        onClick(orderId, orderDate, total, totalMoney, returnMoney, listProduct)
                    }}>
                        <ReceiptIcon />
                    </Button>
                </Tooltip>
            </TableCell>
        </TableRow>
    );
}

// BILLING TABLE - CONTAINS ALL THE LIST OF BILLS THAT HAVE BEEN PAID
const BillingTable = ({ items }) => {
    const classes = useStyles();
    const [order, setOrder] = useState(getBillingLocalStorage() || []); //for handling list of order / bills
    const [open, setOpen] = useState({
        isOpen: false,
        orderId: null,
        orderDate: null,
        total: null,
        totalMoney: null,
        returnMoney: null,
        listProduct: null
    }); // for receipt dialog (handle dialog (showing / not showing), content of receipt)

    const onClick = (orderId, orderDate, total, totalMoney, returnMoney, listProduct) => {
        if (open.isOpen) { //if the dialog is open then onClick must be for deleting item 
            const newData = []
            order.forEach(
                data => data.orderId != orderId ? newData.push(data) : null
            )
            setOrder(newData)
            addBillingToLocalStorage(newData)
            onClose()
        } else { //if the dialog is not open then onClick must be for showing receipt dialog 
            setOpen({
                ...open, isOpen: true, orderId: orderId,
                orderDate: orderDate, total: total,
                totalMoney: totalMoney, returnMoney: returnMoney,
                listProduct: listProduct
            })
        }
    };

    const onClose = () => { setOpen({ ...open, isOpen: false }) }; //closing receipt dialog

    return (
        <div>
            <Container maxWidth="xl">
                <h3>Billing List</h3> <hr />
                <Paper className={classes.root}>
                <TableContainer style={{ height: 400 }}>
                    <Table stickyHeader className={classes.table}>
                        <TableHead> {/* table header */}
                            <TableRow>
                                <TableCell>Orders</TableCell>
                                <TableCell align="left">Order Date</TableCell>
                                <TableCell align="left">Total</TableCell>
                                <TableCell align="left"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody> {/* content of table*/}
                            {order.map(({ orderId, orderDate, total, totalMoney, returnMoney, listProduct }) => {
                                return ( 
                                    <TableViewRow
                                        orderId={orderId}
                                        key={orderId}
                                        orderDate={orderDate}
                                        total={total}
                                        totalMoney={totalMoney}
                                        returnMoney={returnMoney}
                                        listProduct={listProduct}
                                        onClick={() => {
                                            onClick(orderId, orderDate, total, totalMoney, returnMoney, listProduct)
                                        }}
                                    />
                                );
                            })}
                        </TableBody>
                    </Table>
                    </TableContainer>

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
                        onClick={() => onClick(open.orderId)}
                        onProductPage={false}
                    />
                </Paper>
            </Container>
        </div>
    );
}

export default BillingTable;