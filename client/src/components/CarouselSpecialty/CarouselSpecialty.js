import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import SlideSpecialty from '../SlideSpecialty/SlideSpecialty';
import Heading from '../UI/Heading/Heading';
import classes from './styles.module.css';

const CarouselSpecialty = (props) => {
	let Card = [];
	const unique = [
		...new Map(
			props.staffAssignments.map((item) => [
				item.assignedSpecialty,
				item,
			])
		).values(),
	];
	if (props.staffAssignments) {
		unique.map((w, index) => {
			props.specialties.map((z) => {
				if (w.assignedSpecialty === z.name) {
					Card.push(
						<SlideSpecialty
							buttonName={props.buttonName}
							display={props.display_select}
							onClick={props.onClick_select}
							key={w._id + index}
							specialty={z.name}
							description={z.description}
						/>
					);
				}
			});
		});
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
				swipeable={false}
				draggable={true}
				showDots={true}
				responsive={responsive}
				focusOnSelect={true}
				//centerMode={true}
				//partialVisible={true}
				ssr={true} // means to render carousel on server-side.
				infinite={false}
				autoPlay={
					false
					//this.props.deviceType !== 'mobile'
					//	? true
					//: false
				}
				autoPlaySpeed={3000}
				keyBoardControl={true}
				customTransition='all .2'
				transitionDuration={100}
				containerClass='carousel-container'
				//	removeArrowOnDeviceType={''}
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
