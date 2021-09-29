import React from "react";

import Button from "@material-ui/core/Button";
import Box from '@material-ui/core/Box';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";

import DeleteIcon from '@material-ui/icons/Delete';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

// STYLE FOR RECEIPT DIALOG
const useStyles = makeStyles(() => ({
    dialog: {
        height: 500,
        width: 400,
        overflowY: "scroll",
        margin: "30px 30px",
        backgroundColor: "#eee"
    },
    line: {
        borderTop: "2px dashed #000",
    },
    list: {
        marginLeft: 20,
        marginRight: 20,
    },
    listItem: {
        display: "flex"
    },
}));

// DIALOG - CONTAINS RECEIPT (LIST OF PURCHASED PRODUCTS)
const DialogViewBill = ({ open, onClose, onClick, orderId, orderDate, total, totalMoney, returnMoney, listProduct, onProductPage }) => {
    const classes = useStyles();

    return (
        <Dialog onClose={onClose} open={open} maxWidth="xl">
            <div className={classes.dialog}>
                <DialogTitle> {/* receipt title */}
                    <ShoppingCartIcon /> STORE
                </DialogTitle>

                <hr className={classes.line} /> {/* receipt content */}
                <div className={classes.list}> 
                    {/* receipt content - TOP */}
                    {listProduct && listProduct.map((list) => {
                        return (
                            <Box sx={{ flexGrow: 1 }} className={classes.listItem}>
                                <Grid item xs={9}>
                                    <code>{list.name}</code> <br />
                                    <code>{list.quantity} x </code>
                                    <code>Rp {list.unitPrice}</code>
                                </Grid>
                                <Grid item xs={3}>
                                    <code></code> <br />
                                    <code>Rp {list.quantity * list.unitPrice}</code>
                                </Grid>
                            </Box>
                        )
                    })}<br />
                    {/* receipt content - BOTTOM */}
                    <hr className={classes.line} />
                    <Box sx={{ flexGrow: 1 }} className={classes.listItem}>
                        <Grid item xs={8}>
                            <h3>Total</h3>
                            <code>Cash : Rp {totalMoney}</code><br />
                            <code>Change : Rp {returnMoney}</code>
                        </Grid>
                        <Grid item xs={4}>
                            <h3>Rp {total}</h3>
                        </Grid>
                    </Box><br />
                    <code>Date: {orderDate}</code>
                </div>
            </div>

            <DialogActions> {/* receipt action (close or delete receipt) */}
                <Button onClick={onClose} color="primary"> {/* close receipt */}
                    Close
                </Button>
                {/* receipt dialog (if not open on the product page then it opens on the billing page) */}
                {/* => so if on the billing page then there must be a delete button  */}
                {onProductPage === false ? ( 
                    <Button onClick={() => { onClick(orderId) }}>
                        <DeleteIcon />
                    </Button>
                ) : (
                    <div></div>
                )}
            </DialogActions>
            
        </Dialog>
    );
}

export default DialogViewBill;