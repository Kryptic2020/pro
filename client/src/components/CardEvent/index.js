import React from 'react';
import classes from './styles.module.css';
import { ArrowRight } from 'react-bootstrap-icons';

const CardEvent = () => {
	return (
		<>
			<div className={classes.container}>
				<div className={classes.subcontainer}>
					<div className={classes.box}>
						<div
							className={classes.logo_company}
						></div>
						<span
							className={classes.company_name}
						>
							Super Futsal
						</span>
						<div
							className={classes.logo_app}
						></div>
					</div>
					<div className={classes.image}></div>
					<p className={classes.title}>
						Thursday Kickabout (pelada)
					</p>

					<p className={classes.date}>
						<ArrowRight
							className='mr-1'
							color='white'
							size={24}
						/>
						Sep 10, 07:00 PM
					</p>

					<p className={classes.price}>
						<ArrowRight
							className='mr-1'
							color='white'
							size={24}
						/>
						$11 per player
					</p>

					<p className={classes.location}>
						<ArrowRight
							className='mr-1'
							color='white'
							size={24}
						/>
						150 Fursden Road, Carina
					</p>
				</div>

				<button className={classes.button}>
					JOIN EVENT
				</button>
			</div>
		</>
	);
};

export default CardEvent;
