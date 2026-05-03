import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="empty-state page-state">
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link className="primary-button" to="/">
        Go home
      </Link>
    </div>
  );
}

export default NotFoundPage;
