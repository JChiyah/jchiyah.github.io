import React, { Component } from 'react';
import './../App.scss';

import NavigationBar from './../components/NavigationBar';
import Footer from './../components/Footer';


class About extends Component {
	render() {
		return (
			<div className="App">
				<NavigationBar currentPage='About' />

				<div className="app-body">
					<h1>About Me</h1>
					<div className="about">
						<div className="about-img-wrapper">
							<img src="about_photo.jpg" alt="selfie" />
						</div>
						<p>
							I am currently a 5th Year student of an MEng in Software Engineering at Heriot-Watt University, Edinburgh (UK).
							<br/><br/>

							I have worked in a few cool projects during internships within the industry that have led to research output. 
							I have also published a couple of articles from my 4th Year thesis and co-authored a few more from university research projects.
							<br/><br/>

							Python, PHP, C++, JavaScript and Java are my strongest programming languages. Most of my important projects involved one or more of these. 
							I like to use stable and modern technology stacks. I am also familiar with many frameworks in these languages 
							(e.g. Vue, React, Laravel, etc.) and other tools (Gulp, CMake, Hunter, etc.). 
							<br/><br/>

							My interests include human-computer interaction, autonomous systems, natural language (e.g. chatbots) and explainability.
							<br/><br/>

							I will finish my studies in May 2019 and I am currently looking to do a PhD in one of these areas, particularly something to do 
							with explainability and autonomy (e.g. control of systems through natural language). Ideally, this PhD would
							involve applied research. Any offers are welcome regardless of location!
						</p>
					</div>
				</div>

				<Footer />
			</div>
		);
	}
}

export default About;
