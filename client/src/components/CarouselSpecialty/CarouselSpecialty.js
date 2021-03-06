import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import SlideSpecialty from '../SlideSpecialty/SlideSpecialty';
import Heading from '../UI/Heading/Heading';
import classes from './styles.module.css';

const CarouselSpecialty = (props) => {
	let Card = [];
	let unique = [];
	//	console.log(props.staffAssignments);
	if (props.staffAssignments) {
		props.staffAssignments.forEach((x) => {
			if (!unique.includes(x.assignedSpecialty)) {
				unique.push(x);
			}
		});
	}
	/*const unique = [
		...new Map(
			props.staffAssignments.map((item) => [
				item.assignedSpecialty,
				item,
			])
		).values(),
	];*/
	//console.log(unique);
	if (props.staffAssignments) {
		unique.forEach((w, index) => {
			props.specialties.forEach((z) => {
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
			<div className={classes.mask}> </div>
			<div className={classes.heading}>
				<Heading
					white='true'
					className={classes.heading}
					text={'Our Specialties'}
				/>
			</div>
			<div className={classes.carousel}>
				<Carousel
					swipeable={true}
					draggable={true}
					showDots={true}
					responsive={responsive}
					focusOnSelect={true}
					//centerMode={true}
					//partialVisible={true}
					ssr={true} // means to render carousel on server-side.
					infinite={true}
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
					removeArrowOnDeviceType={'mobile'}
					deviceType={[
						'mobile',
						'tablet',
						'desktop',
					]} //this.props.deviceType}
					dotListClass='custom-dot-list-style'
					itemClass='carousel-item-padding-40-px'
				>
					{Card ? [Card] : null}
				</Carousel>
			</div>
		</div>
	);
};

export default CarouselSpecialty;
