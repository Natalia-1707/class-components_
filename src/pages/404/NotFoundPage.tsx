import './notfoundpage.css';
import { Link } from '../../i18n/navigation';

function NotFoundPage() {
    return (
        <div className="not-found-page-wrapper">
            <p>Error 404</p>
            <p>Page is not found 😢</p>
             <Link href="/main">
                Go to the main page
             </Link>
        </div>
    )
}

export default NotFoundPage