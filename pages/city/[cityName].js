import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner'; // Import here
import ProjectCard from '../../components/ProjectCard';
import MapComponent from '../../components/MapComponent'; // Assuming this is dynamically imported
import { scrapeProjects } from '../../lib/scraper';
import { geocodeLocation } from '../../lib/geocoder';


export default function CityProjects() {
  const router = useRouter();
  const { cityName } = router.query;

  const [searchInput, setSearchInput] = useState(cityName || '');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!cityName) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setProgress(0);

        const scrapedProjects = await scrapeProjects(cityName, (progress) => {
          setProgress(progress);
        });

        const projectsWithCoords = [];

        for (let i = 0; i < scrapedProjects.length; i++) {
          const project = scrapedProjects[i];
          try {
            const coords = await geocodeLocation(project.location);
            projectsWithCoords.push({
              ...project,
              coordinates: coords,
            });
          } catch (error) {
            console.error(`Geocode failed for ${project.location}`, error);
            projectsWithCoords.push(project);
          }
          setProgress(((i + 1) / scrapedProjects.length) * 100);
        }

        setProjects(projectsWithCoords);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cityName]);

  const handleCitySearch = () => {
    if (searchInput.trim()) {
      router.push(`/city/${searchInput.toLowerCase()}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-8 px-4">
        {/* Search Input Bar */}
        <div className="search-container">
  <div className="search-box">
    <input
      type="text"
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      placeholder="Enter city (e.g., Hyderabad)"
      className="search-input"
    />
    <button
      onClick={handleCitySearch}
      className="search-button"
    >
      Search
    </button>
  </div>
</div>


        <h1 className="page-heading">
          Real Estate Projects in {cityName?.charAt(0).toUpperCase() + cityName?.slice(1)}
        </h1>

        {loading && <LoadingSpinner progress={progress} />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="section-heading">Available Projects</h2>
              {projects.length === 0 && !loading && (
                <p className="text-gray-500">No projects found for this city.</p>
              )}
              <div className="space-y-6">
                {projects.map((project, index) => (
                  <ProjectCard key={index} project={project} />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 sticky top-4 h-[600px]">
            <div className="bg-white rounded-lg shadow-md p-6 h-full">
              <h2 className="text-xl font-semibold mb-4">Project Locations</h2>
              <MapComponent projects={projects} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
