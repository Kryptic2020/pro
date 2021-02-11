import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import SlidePhoto from '../SlidePhoto/SlidePhoto';
import Heading from '../UI/Heading/Heading';
import classes from './styles.module.css';

const CarouselStaff = (props) => {
	let Photo = [];
	let a = [];

	props.staffAssignments.map((x) => {
		if (!a.includes(x.staffID)) {
			a.push(x.staffID);
		}
	});

	if (props.home) {
		Photo = a.map((u, index) => (
			<SlidePhoto
				display={'none'}
				key={u + index}
				photo={props.admins.map((z) => {
					if (z._id === u) return z.photo;
				})}
				staff={props.admins.map((y) => {
					if (y._id === u) return y.fullName;
				})}
			/>
		));
	} else if (props.staffAssignments && !props.home) {
		Photo = props.staffAssignments.map((w, index) =>
			w.assignedSpecialty === props.specialty ? (
				<SlidePhoto
					display={props.display_select}
					onClick={props.onClick_select}
					key={w._id + index}
					photo={props.admins.map((x) => {
						if (x._id === w.staffID)
							return x.photo;
					})}
					staff={w.staff}
					staffID={w.staffID}
					assignmentID={w._id}
				/>
			) : null
		);
	}

	/*
	const data = this.props.photo;
	const Example = ({ data }) => (
		<img
			alt='Image Database'
			style={{ borderRadius: '50%' }}
			src={`${data}`}
			width={250}
			height={250}
		/>
	);*/

	const responsive = {
		desktop: {
			breakpoint: { max: 3000, min: 1000 },
			items: 3,
			slidesToSlide: 3, // optional, default to 1.
		},
		tablet: {
			breakpoint: { max: 999, min: 700 },
			items: 2,
			slidesToSlide: 2, // optional, default to 1.
		},
		mobile: {
			breakpoint: { max: 699, min: 0 },
			items: 1,
			slidesToSlide: 1, // optional, default to 1.
		},
	};
	return (
		<>
			<div className={classes.landing_wrapper}>
				<div className={classes.mask}>
					<div className={classes.heading}>
						<Heading
							color='#ffffff'
							text={'Our Staffs'}
						/>
					</div>
					<Carousel
						className={classes.carousel}
						swipeable={true}
						draggable={true}
						showDots={true}
						responsive={responsive}
						ssr={true} // means to render carousel on server-side.
						infinite={true}
						autoPlay={
							false
							//this.props.deviceType !== 'mobile'
							//	? true
							//: false
						}
						autoPlaySpeed={1000}
						keyBoardControl={true}
						customTransition='all .5'
						transitionDuration={100}
						containerClass='carousel-container'
						removeArrowOnDeviceType={''}
						deviceType={[
							'mobile',
							'tablet',
							'desktop',
						]} //this.props.deviceType}
						dotListClass='custom-dot-list-style'
						itemClass='carousel-item-padding-40-px'
					>
						{[Photo]}
					</Carousel>
				</div>
			</div>
		</>
	);
};

export default CarouselStaff;
