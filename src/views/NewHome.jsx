import React from 'react';
import { useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines, faTrophy, faEnvelope, faHexagonNodes, faSquareBinary, faTerminal, faCode, faDiagramProject, faBoltLightning, faBraille, faObjectUngroup } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faPython, faJava, faJs, faHtml5, faCss3, faReact, faSass, faGit, faDocker, faPhp } from '@fortawesome/free-brands-svg-icons';

import { SocialLinks } from '../components/SocialLinks';
import PageLayout from './PageLayout';
import SkillCarousel from '../components/SkillCarousel';


const FeaturedPublication = ({ bibkey, title, authors, conferenceSeries, extraHtml = "" }) => {
	return (
		<li className="publication-card fade-animation-on-load" key={bibkey}>
			<FontAwesomeIcon icon={faFileLines} className="me-2 text-accent" />

			<Link to={`/publications#${bibkey}`}>{title}</Link> (<span className="">{authors}</span>, <strong><span className="">{conferenceSeries}</span></strong>) {extraHtml}
		</li>
	);
};


const highlightTarget = (element) => {
	// Remove highlight class and re-add it to trigger animation
	element.classList.remove('highlight-target');
	// Force a reflow to ensure the animation plays again
	void element.offsetWidth;
	element.classList.add('highlight-target');
}


const NewHome = () => {
	const location = useLocation();

	useEffect(() => {
		const hash = location.hash;
		if (hash) {
			const element = document.getElementById(hash.substring(1));
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
				highlightTarget(element);
			}
		}
	}, [location]);

	return (
		<PageLayout
			pageTitle="Contact" className="fade-animation-sequence"
		>
			<div className="home-container fade-animation-sequence">
				<header className="text-center home-section home-header fade-animation-on-load">
					<h1 className="display-2 fw-bold name-title">
						Javier <span className="text-accent">Chiyah-Garcia</span>
					</h1>
					<img
						src="about_photo.jpeg"
						alt="Me"
						className="profile-image mb-4"
					/>
					<SocialLinks />
					<section className="keywords-section row justify-content-center">
						<div className="col-lg-10">
							<ul>
								<li>NLP</li>
								<li>Conversational AI</li>
								<li>Multi-Modal LLMs</li>
								{/* <li>Human-Robot Interaction</li> */}
								{/* <li>Explainable Autonomy</li> */}
							</ul>
						</div>
					</section>
				</header>

				<section className="row home-section fade-animation-on-load">
					<h2 className="mb-4">
						About <span className="text-accent">Me</span>
					</h2>
					<p className="">
						Hi! I'm Javier Chiyah-Garcia, a Computer Science researcher passionate about improving human-machine communication. I recently completed my PhD at Heriot-Watt University, where I focused on helping <strong className="text-accent">conversational AI</strong> systems understand and overcome <strong className="text-accent">miscommunications in multi-modal dialogues</strong>.
						My research journey has taken me from helping underwater robots explain their actions to teaching <strong className="text-accent">Large Language Models</strong> to interpret ambiguous instructions across visual and language modalities effectively.
						<br /><br />

						I've collaborated with companies like <strong className="text-accent">Siemens</strong> or <strong className="text-accent">SeeByte</strong> throughout my research, including interning at <strong className="text-accent">Amazon Alexa AI</strong> and <strong className="text-accent">SeeByte</strong>, applying my work to real-world challenges. This has resulted in many publications at top conferences and several industry partnerships.
						<br /><br />

						I'm currently actively <strong className="text-accent">looking for new opportunities</strong> in the field of AI and NLP, particularly with multi-modal LLMs, so don't hesitate to <Link to="/#contact">contact me!</Link>
					</p>
				</section>

				<section className="row home-section fade-animation-on-load">
					<div className="row justify-content-center">
						<div className="col-lg-6 interests-section">
							<h3 className="mb-4">
								Research <span className="text-accent">Interests</span>
							</h3>
							<p className="interests-description">
								This is a non-exhaustive list of my research interests over the years:
							</p>
							<ul className="research-interests-list fade-animation-sequence">
								<li className="fade-animation-on-load">Natural Language Processing</li>
								<li className="fade-animation-on-load">Conversational AI and Agents</li>
								<li className="fade-animation-on-load">Multi-Modal Large Language Models</li>
								<li className="fade-animation-on-load">Dialogue and Miscommunications</li>
								<li className="fade-animation-on-load">Human-Robot Interaction</li>
								<li className="fade-animation-on-load">Embodied AI</li>
								<li className="fade-animation-on-load">Explainable Autonomy</li>
							</ul>
						</div>
						<div className="col-lg-6 updates-section section-divider">
							<h3 className="mb-4">
								Recent <span className="text-accent">Updates</span></h3>
							<ul className="fade-animation-sequence">
								<li className="fade-animation-on-load year-separator">2025</li>
								<li>
									<span className="update-date">Feb</span>
									Successfully defended my PhD!
								</li>
								<li className="fade-animation-on-load year-separator">2024</li>
								<li className="fade-animation-on-load">
									<span className="update-date">Nov</span>
									Presented two papers [<Link to="/publications#chiyah-garcia-etal-2024-repairs">1</Link>, <Link to="/publications#chiyah-garcia-etal-2024-adapting">2</Link>] at EMNLP'24 in Miami
								</li>
								<li className="fade-animation-on-load">
									<span className="update-date">Oct</span>
									Presented at the EUtopia Beyond Words Workshop in Sweden
								</li>
								<li className="fade-animation-on-load year-separator">2023</li>
								<li className="fade-animation-on-load">
									<span className="update-date">Oct</span>
									Published the proceedings for the <Link to="/publications#yrrsds-2023-young">YRRSDS'23 Workshop</Link>
								</li>
								<li className="fade-animation-on-load">
									<span className="update-date">Sep</span>
									Received the <span className="text-accent">Best Short Paper Award</span> at SIGDIAL'23! See the <Link to="/publications#chiyah-garcia-etal-2023-referring">paper here</Link>
								</li>
								<li className="fade-animation-on-load">
									<span className="update-date">Sep</span>
									Organised the <Link to="https://sites.google.com/view/yrrsds2023" target="_blank">YRRSDS'23 Workshop</Link>
								</li>
								<li className="fade-animation-on-load">
									<span className="update-date">Jun</span>
									Finished my internship at Amazon Alexa AI!
								</li>
							</ul>
							{/* <Link to="/activities" className="see-more-link">
								See what I have been up to
							</Link> */}
						</div>
					</div>
				</section>

				<section className="row home-section fade-animation-on-load">
					<h2 className="mb-4">
						Featured <span className="text-accent">Publications</span>
					</h2>
					<ul className="fade-animation-sequence featured-publications-list">
						<FeaturedPublication
							bibkey="chiyah-garcia-etal-2024-repairs"
							title="Repairs in a Block World: A New Benchmark for Handling User Corrections with Multi-Modal Language Models"
							authors="Chiyah-Garcia et al."
							conferenceSeries="EMNLP'24"
						/>
						<FeaturedPublication
							bibkey="chiyah-garcia-etal-2024-adapting"
							title="Adapting LLM Predictions in In-Context Learning with Data Priors"
							authors="Chiyah-Garcia et al."
							conferenceSeries="CustomNLP4U at EMNLP'24"
						/>
						<FeaturedPublication
							bibkey="chiyah-garcia-etal-2023-referring"
							title="`What are you referring to?' Evaluating the Ability of Multi-Modal Dialogue Models to Process Clarificational Exchanges"
							authors="Chiyah-Garcia et al."
							conferenceSeries="SIGDIAL'23"
							extraHtml={<strong>[Best Paper Award] <FontAwesomeIcon icon={faTrophy} /></strong>}
						/>
						<li className="fade-animation-on-load">
							<Link to="/publications" className="btn btn-primary see-more-link">See all publications</Link>
						</li>
					</ul>
				</section>

				<section className="row home-section fade-animation-on-load">
					<h2 className="mb-4">
						<span className="text-accent">Skill</span>set
					</h2>
					<p className="text-secondary">
						These are some of the skills or tools I often use:
					</p>
					<SkillCarousel skills={[
						{ icon: faSquareBinary, text: "PyTorch" },
						{ icon: faDiagramProject, text: "HuggingFace" },
						{ icon: faHexagonNodes, text: "Transformers" },
						{ icon: faPython, text: "Python" },
						{ icon: faGit, text: "Git" },
						{ icon: faDocker, text: "Docker" },
						{ icon: faBraille, text: "Weight & Biases" },
						{ icon: faBoltLightning, text: "PyTorch Lightning" },
						{ icon: faObjectUngroup, text: "Multi-Modal LLMs" },
					]} />
					<br />
					<SkillCarousel skills={[
						{ icon: faJava, text: "Java" },
						{ icon: faPhp, text: "PHP" },
						{ icon: faTerminal, text: "C" },
						{ icon: faCode, text: "C++" },
						{ icon: faJs, text: "JavaScript" },
						{ icon: faHtml5, text: "HTML" },
						{ icon: faCss3, text: "CSS" },
						{ icon: faReact, text: "React" },
						{ icon: faSass, text: "Sass" },
					]} startDirection="left" />
				</section>

				<section className="row home-section fade-animation-on-load" id="contact">
					<h2 className="mb-4">
						Contact <span className="text-accent">Me</span>
					</h2>
					<p className="">
						The easiest way get in touch with me is through email or LinkedIn:
					</p>
					<div className="d-flex flex-column">
						<ul className="list-unstyled">
							<li>
								<span>
									<FontAwesomeIcon icon={faEnvelope} className="me-2 inline-icon-before text-accent" />Preferred:
								</span>
								<a href="" className="btn btn-link text-decoration-none">
									&#106;&#099;&#104;&#105;&#121;&#097;&#104;&#032;(&#097;&#116;)&#032;&#111;&#117;&#116;&#108;&#111;&#111;&#107;&#032;(&#100;&#111;&#116;)&#032;&#099;&#111;&#109;
								</a>
							</li>
							<li>
								<span>
									<FontAwesomeIcon icon={faEnvelope} className="me-2 inline-icon-before text-accent" />University:
								</span>
								<a href="" className="btn btn-link text-decoration-none">
									&#102;&#106;&#099;&#051;&#032;(&#097;&#116;)&#032;&#104;&#119;&#032;(&#100;&#111;&#116;)&#032;&#097;&#099;&#032;(&#100;&#111;&#116;)&#032;&#117;&#107;
								</a>
							</li>
							<li>
								<span>
									<FontAwesomeIcon icon={faLinkedin} className="me-2 inline-icon-before text-accent" />LinkedIn:
								</span>
								<a href="https://www.linkedin.com/in/javier-chiyah-garcia-469045a6/" className="btn btn-link text-decoration-none" target="_blank" rel="noopener noreferrer">
									Javier Chiyah-Garcia
								</a>
							</li>
						</ul>
					</div>
				</section>
			</div>

		</PageLayout>
	);
};

export default NewHome;