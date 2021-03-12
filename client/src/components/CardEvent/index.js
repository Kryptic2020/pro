import React from 'react';
import classes from './styles.module.css';

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
					<div className={classes.div}>
						<span className={classes.icon} />
						<span className={classes.date}>
							Sep 10, 07:00 PM
						</span>
					</div>
					<div className={classes.div}>
						<span className={classes.icon} />
						<span className={classes.price}>
							$11 per player
						</span>
					</div>
					<div className={classes.div}>
						<span className={classes.icon} />
						<span className={classes.location}>
							150 Fursden Road, Carina
						</span>
					</div>
				</div>
			</div>
			<div className={classes.button}>
				<p className={classes.button_text}>
					JOIN EVENT
				</p>
			</div>
		</>
	);
};

export default CardEvent;
