// DUMMY DATA (BILLING LIST HISTORY)
const dataBilling = [
    { 
        orderId: 1, 
        orderDate: new Date().toLocaleString(), 
        total: 55000,
        totalMoney: 60000,
        returnMoney: 5000, 
        listProduct: [
            {name: 'Beef Bulgogi', quantity: 1, unitPrice: 21000},
            {name: 'Oseng Tuna', quantity: 1, unitPrice: 24000},
            {name: 'Nyam Nyam', quantity: 2, unitPrice: 10000},
        ]  
    },
    { 
        orderId: 2, 
        orderDate: new Date().toLocaleString(), 
        total: 70000,
        totalMoney: 70000,
        returnMoney: 0, 
        listProduct: [
            {name: 'Bubuk Bubble Drink', quantity: 1, unitPrice: 15000},
            {name: 'Quick Oat 1 kg', quantity: 1, unitPrice: 30000},
            {name: 'Pocky Mini', quantity: 1, unitPrice: 5000},
            {name: 'Paldo Jjajangmyeon', quantity: 1, unitPrice: 20000},
        ]   
    },
    { 
        orderId: 3, 
        orderDate: new Date().toLocaleString(), 
        total: 10000,
        totalMoney: 20000,
        returnMoney: 10000, 
        listProduct: [
            {name: 'Nyam Nyam', quantity: 2, unitPrice: 10000},
        ]   
    },
    { 
        orderId: 4, 
        orderDate: new Date().toLocaleString(), 
        total: 15000,
        totalMoney: 20000,
        returnMoney: 5000, 
        listProduct: [
            {name: 'Bubuk Bubble Drink', quantity: 1, unitPrice: 15000},
        ]   
    },
];

export default dataBilling;