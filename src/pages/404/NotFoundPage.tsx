import './notfoundpage.css';
import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <div className="not-found-page-wrapper">
            <p>Error 404</p>
            <p>Page is not found 😢</p>
            <Link to="/main" className='not-found-page-link'>Go to the main page</Link>
        </div>
    )
}

export default NotFoundPage