export default function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <h3 className="project-title">{project.name}</h3>
      <div className="project-detail">
        <span className="project-label">Location:</span> {project.location}
      </div>
      <div className="project-detail">
        <span className="project-label">Price Range:</span> {project.priceRange}
      </div>
      <div className="project-detail">
        <span className="project-label">Builder:</span> {project.builder}
      </div>
      {project.coordinates && (
        <div className="project-detail text-sm mt-2">
          <span className="project-label">Coordinates:</span> {project.coordinates.lat.toFixed(4)}, {project.coordinates.lng.toFixed(4)}
        </div>
      )}
    </div>
  );
}
