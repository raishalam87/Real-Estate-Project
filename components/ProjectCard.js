
export default function ProjectCard({ project }) {
    return (
      <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
        <h3 className="text-xl font-semibold text-blue-700 mb-2">{project.name}</h3>
        <div className="text-gray-600 mb-1">
          <span className="font-medium">Location:</span> {project.location}
        </div>
        <div className="text-gray-600 mb-1">
          <span className="font-medium">Price Range:</span> {project.priceRange}
        </div>
        <div className="text-gray-600 mb-1">
          <span className="font-medium">Builder:</span> {project.builder}
        </div>
        {project.coordinates && (
          <div className="text-gray-600 text-sm mt-2">
            <span className="font-medium">Coordinates:</span> {project.coordinates.lat.toFixed(4)}, {project.coordinates.lng.toFixed(4)}
          </div>
        )}
      </div>
    );
  }