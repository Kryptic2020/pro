import React from 'react';

import TimeTableItem from './TimeTableItems';


const timeTable = (props) => (
	<section className="">
		{props.timeTables.sort().map((p) => (
			<TimeTableItem
				key={p._id}
				id={p._id}
				name={p.timeTableName}
				times={p.times}
				onSelect={props.onSelectTable}
			/>
		))}
	</section>
);

export default timeTable;
