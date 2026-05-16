import './aboutpage.css';
import { Link } from 'react-router-dom';

function AboutPage () {
    return (
        <div className="about-wrapper">
            <h1>Star Trek Search</h1>
            <div>
                The application was developed for educational purposes
                as part of the{' '}
                <a
                    href="https://rs.school/courses/reactjs"
                    target="_blank"
                    rel="noreferrer"
                >
                    RSSchool React 2026 Q2 course
                </a>
            </div>
            <div>
              <a
                href="https://github.com/natalia-1707"
                target="_blank"
                rel="noreferrer"
              >
                Author Natalia-1707
              </a>
            </div>
            <Link to="/main" className="back-button">Back</Link>
            <div>Good luck, everyone!</div>
        </div>
    )
}

export default AboutPage;
