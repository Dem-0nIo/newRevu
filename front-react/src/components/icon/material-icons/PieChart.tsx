import React, { SVGProps } from 'react';
import axios from "axios";

const SvgPieChart = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg viewBox='0 0 24 24' fill='currentColor' className='svg-icon' {...props}>
			<path d='M0 0h24v24H0V0z' fill='none' />
			<path
				d='M4 12c0 4.07 3.06 7.44 7 7.93V4.07C7.06 4.56 4 7.93 4 12zm9 7.93A8.002 8.002 0 0019.93 13H13v6.93zm0-15.86V11h6.93A8.002 8.002 0 0013 4.07z'
				opacity={0.3}
			/>
			<path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.86-7-7.93s3.06-7.44 7-7.93v15.86zm2 0V13h6.93A8.002 8.002 0 0113 19.93zM13 11V4.07c3.61.45 6.48 3.32 6.93 6.93H13z' />
		</svg>
	);
};

export default SvgPieChart;
