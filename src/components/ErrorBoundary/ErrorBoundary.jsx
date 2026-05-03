import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="empty-state page-state">
          <h1>Something went wrong</h1>
          <p>Refresh the page to restart the shopping experience.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
