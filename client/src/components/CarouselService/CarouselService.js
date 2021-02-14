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
			<div className={classes.container}>
				<div className={classes.mask}>
					<div className={classes.heading}>
						<Heading
							color='#ffffff'
							text={'Our Services'}
						/>
					</div>
					<Carousel
						className={classes.carousel}
						swipeable={true}
						draggable={false}
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
			</div>
		</>
	);
};

export default CarouselSpecialty;
