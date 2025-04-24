export default function LoadingSpinner({ progress }) {
  return (
    <div className="loading-container">
      <div className="loading-header">
        <span className="loading-text">Loading projects...</span>
        <span className="loading-text">{Math.round(progress)}%</span>
      </div>
      <div className="loading-bar-background">
        <div 
          className="loading-bar-progress"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
