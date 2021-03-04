import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import SlideService from '../SlideService/SlideService';
import Heading from '../UI/Heading/Heading';
import classes from './styles.module.css';

const CarouselSpecialty = (props) => {
	let Service = [];

	if (props.servicesPrices && props.home) {
		Service = props.servicesPrices.map((w, index) => (
			<SlideService
				display={'none'}
				key={w._id + index}
				service={w.name}
				price={w.price}
				description={w.serviceDetails}
			/>
		));
	}
	if (props.serviceArray && !props.home) {
		Service = props.serviceArray.map((w, index) =>
			w.assignmentID === props.assignmentID ? (
				<SlideService
					display={props.display_select}
					onClick={props.onClick_select}
					key={w._id + index}
					service={w.name}
					price={w.price}
					description={w.serviceDetails}
				/>
			) : null
		);
	}

	const responsive = {
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 2,
			//	slidesToSlide: 3, // optional, default to 1.
			//partialVisibilityGutter: '30px', // this is needed to tell the amount of px that should be visible.
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 1,
			//slidesToSlide: 2, // optional, default to 1.
			//partialVisibilityGutter: '30px', // this is needed to tell the amount of px that should be visible.
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
			//slidesToSlide: 1, // optional, default to 1.
			//partialVisibilityGutter: '30px', // this is needed to tell the amount of px that should be visible.
		},
	};
	//console.log(Service);
	return (
		<>
			<div className={classes.container}>
				<div className={classes.mask}></div>
				<div className={classes.heading}>
					<Heading
						white={true}
						text={'Our Services'}
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
					customTransition='all .2'
					transitionDuration={1000}
					containerClass='carousel-container'
					removeArrowOnDeviceType={'mobile'}
					deviceType={[
						'mobile',
						'tablet',
						'desktop',
					]} //this.props.deviceType}
					dotListClass='custom-dot-list-style'
					itemClass='carousel-item-padding-40-px'
				>
					{[Service]}
				</Carousel>
			</div>
		</>
	);
};

export default CarouselSpecialty;
