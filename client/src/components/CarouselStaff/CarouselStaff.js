import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Heading from '../UI/Heading/Heading';
import classes from './styles.module.css';

const CarouselStaff = (props) => {
	const responsive = {
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 3,
			//	slidesToSlide: 3, // optional, default to 1.
			//partialVisibilityGutter: '30px', // this is needed to tell the amount of px that should be visible.
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 2,
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
	return (
		<>
			<div className={classes.container}>
				<div
					className={classes.landing_wrapper}
				></div>
				<div className={classes.mask}></div>
				<div className={classes.heading}>
					<Heading
						white={true}
						text={'Our Staffs'}
					/>
				</div>

				<Carousel
					className={classes.carousel}
					swipeable={true}
					draggable={true}
					showDots={true}
					responsive={responsive}
					ssr={false} // means to render carousel on server-side.
					infinite={true}
					autoPlay={
						props.deviceType !== 'mobile'
							? false
							: false
					}
					autoPlaySpeed={2000}
					keyBoardControl={true}
					customTransition='all .2'
					transitionDuration={200}
					containerClass='carousel-container'
					//removeArrowOnDeviceType={''}
					deviceType={[
						'mobile',
						'tablet',
						'desktop',
					]} //this.props.deviceType}
					dotListClass='custom-dot-list-style'
					itemClass='carousel-item-padding-40-px'
				>
					{[props.staffArray]}
				</Carousel>
			</div>
		</>
	);
};

export default CarouselStaff;
