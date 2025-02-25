import React, { Component } from 'react';

import PageLayout from './PageLayout';


class About extends Component {
	render() {
		return (
			<PageLayout>
				<h3>About Me</h3>
				<div className="about">
					<div className="about-img-wrapper">
						<img src="about_photo.jpeg" alt="selfie" />
					</div>
					<p>
						(he/him) I am currently a 3rd Year PhD student at Heriot-Watt University, Edinburgh (UK), mainly interested in situated human-robot interaction through natural language.
						<br /><br />

						I have worked in a few cool projects during internships and placements with industry that have led to considerable research output and commercial applications.
						I have also published a couple of articles from my 4th Year thesis and co-authored some more from university research projects.
						<br /><br />

						Python, C++, JavaScript, Java and PHP are my strongest programming languages, but I learn quite quickly as needed. Most of my important projects involved one or more of these.
						I like to use stable and modern technology stacks, thus I am familiar with many frameworks in these languages
						(e.g. PyTorch, ROS, Flask, React, Laravel, etc.) and other tools (CMake, Hunter, Gulp, etc.).
						I often automate everything with easy-to-use scripts and use Docker daily for development and deployment.
						<br /><br />

						My interests include human-computer and human-robot interaction, autonomous systems, natural language (e.g. chatbots) and explainability.
						<br /><br />

						I graduated from an MEng in May 2019 and started an iCASE PhD with Siemens in September 2019 in
						the field of monitoring and control of manufacturing systems using natural language. Currently doing an internship at Amazon Alexa AI, say hi!
					</p>
					<p>
						Hi! I'm Javier Chiyah-Garcia, a Computer Science researcher with a passion for making communication between humans and intelligent systems more natural and effective. I recently completed my PhD at Heriot-Watt University, where I focused on helping conversational AI systems understand and overcome miscommunications in dialogues.
						My research journey has taken me from helping underwater robots explain their actions to teaching large language models to understand ambiguous instructions, combining vision and language modalities effectively.

						I've collaborated with many companies like Siemens or SeeByte throughout my research, including interning at Amazon Alexa AI and SeeByte, applying my work to real-world challenges. This has resulted in many publications at important conferences and partnerships with industry.

						I'm currently actively looking for new opportunities in the field of AI and NLP, so don't hesitate to contact me!
					</p>
				</div>
			</PageLayout>
		);
	}
}

export default About;
