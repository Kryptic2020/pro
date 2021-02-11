import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import SlideSpecialty from '../SlideSpecialty/SlideSpecialty';
import Heading from '../UI/Heading/Heading';
import classes from './styles.module.css';

const CarouselSpecialty = (props) => {
	let Card = [];
	if (props.staffAssignments) {
		Card = props.staffAssignments.map((w, index) => (
			<SlideSpecialty
				buttonName={props.buttonName}
				display={props.display_select}
				onClick={props.onClick_select}
				key={w._id + index}
				specialty={w.assignedSpecialty}
				description={props.specialties.map((x) => {
					if (x.name === w.assignedSpecialty)
						return x.description;
				})}
			/>
		));
	}

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
		<div className={classes.container}>
			<div className={classes.heading}>
				<Heading
					color='#ffffff'
					className={classes.heading}
					text={'Our Specialties'}
				/>
			</div>
			<Carousel
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
				autoPlaySpeed={5000}
				keyBoardControl={true}
				customTransition='all .5'
				transitionDuration={100}
				containerClass='carousel-container'
				removeArrowOnDeviceType={''}
				deviceType={['mobile', 'tablet', 'desktop']} //this.props.deviceType}
				dotListClass='custom-dot-list-style'
				itemClass='carousel-item-padding-40-px'
			>
				{[Card]}
			</Carousel>
		</div>
	);
};

export default CarouselSpecialty;
