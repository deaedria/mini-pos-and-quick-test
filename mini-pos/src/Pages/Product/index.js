import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';

import CategoryList from "./CategoryList";
import OrderList from "./OrderList";
import ProductList from "./ProductList";
import dataCategory from '../../Assets/DummyData/dataCategory';
import dataProduct from '../../Assets/DummyData/dataProduct';

// CONTAIN CATEGORY, ORDER, PRODUCT COMPONENT
const Product = () => {
    //handle tab (the active start tab is product)
    const [value, setValue] = useState('2'); 
    //handle list of product you want to order (the result from ProductList component)
    const [fromProductList, setFromProductList] = useState(""); 

    //function to change the tab (category or product page)  
    const handleChange = (event, newValue) => { 
        setValue(newValue);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {/* LEFT PART - OrderList Component */}
                <OrderList items={fromProductList}/>

                {/* RIGHT PART - CategoryList and ProductList Component */}
                <Grid container item xs={12} md={8}>
                    <Box sx={{ width: '100%', typography: 'body1', marginLeft: '0px' }}>
                        <TabContext value={value}> 
                            <Box position="fixed" sx={{ width: '65%', marginTop: '-25px', paddingBottom: '25px', height: 60, zIndex: 1, borderBottom: 1, borderColor: 'divider', backgroundColor: '#fff' }}>
                                <TabList style={{ paddingTop: '25px' }} onChange={handleChange}>
                                    <Tab label="Category" value="1" />
                                    <Tab label="Product" value="2" />
                                </TabList>
                            </Box><br /><br />
                            <TabPanel value="1"> {/* TAB 1 - CategoryList */}
                                <CategoryList items={dataCategory} />
                            </TabPanel>
                            <TabPanel value="2"> {/* TAB 2 - ProductList */}
                                <ProductList items={dataProduct} setFromProductList={setFromProductList} />
                            </TabPanel>
                        </TabContext>
                    </Box>
                </Grid>
                
            </Grid>
        </Box>
    );
}

export default Product;