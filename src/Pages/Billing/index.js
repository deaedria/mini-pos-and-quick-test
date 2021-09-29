import React from 'react';
import BillingTable from "./BillingTable";
import dataBilling from '../../Assets/DummyData/dataBilling';

const Billing = () => {
	return (
		<div> 
			<BillingTable items={dataBilling} />
		</div>
	);
}

export default Billing;