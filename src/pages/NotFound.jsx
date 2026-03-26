import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 gap-4">
            <h1 className="text-5xl font-bold font-mono">404</h1>
            <p className="text-lg text-gray-500">Oops! This page doesn't exist.</p>
            <Link 
                to="/" 
                className="mt-4 bg-brand-green text-white font-mono px-6 py-3 rounded-full hover:opacity-80 transition-all"
            >
                Back to Home
            </Link>
        </div>
    );
}

export default NotFound;