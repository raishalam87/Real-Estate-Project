import axios from 'axios';
import cheerio from 'cheerio';

export async function scrapeProjects(cityName, progressCallback) {
  // In a real application, you would scrape from MagicBricks
  // For this example, we'll mock the data
  
  // Simulate scraping delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock data for different cities
  const mockData = {
    hyderabad: [
      {
        name: "Prestige City Hyderabad",
        location: "Hyderabad, Telangana",
        priceRange: "₹60L - ₹1.2Cr",
        builder: "Prestige Group"
      },
      {
        name: "Aparna Zenon",
        location: "Gachibowli, Hyderabad",
        priceRange: "₹80L - ₹1.5Cr",
        builder: "Aparna Constructions"
      },
      {
        name: "My Home Jewel",
        location: "Narsingi, Hyderabad",
        priceRange: "₹50L - ₹90L",
        builder: "My Home Constructions"
      }
    ],
    bangalore: [
      {
        name: "Brigade Utopia",
        location: "Whitefield, Bangalore",
        priceRange: "₹1.2Cr - ₹2.5Cr",
        builder: "Brigade Group"
      },
      {
        name: "Prestige Lakeside Habitat",
        location: "Hebbal, Bangalore",
        priceRange: "₹1.5Cr - ₹3Cr",
        builder: "Prestige Group"
      }
    ],
    mumbai: [
      {
        name: "Lodha Bellissimo",
        location: "Powai, Mumbai",
        priceRange: "₹2.5Cr - ₹5Cr",
        builder: "Lodha Group"
      },
      {
        name: "Godrej Reserve",
        location: "Vikhroli, Mumbai",
        priceRange: "₹3Cr - ₹6Cr",
        builder: "Godrej Properties"
      }
    ],
    delhi: [
      {
        name: "DLF Camellias",
        location: "Gurgaon, Delhi NCR",
        priceRange: "₹5Cr - ₹20Cr",
        builder: "DLF Group"
      },
      {
        name: "Ambience Tiverton",
        location: "Gurgaon, Delhi NCR",
        priceRange: "₹1.5Cr - ₹3.5Cr",
        builder: "Ambience Group"
      },
      {
        name: "M3M Golf Estate",
        location: "Sector 65, Delhi NCR",
        priceRange: "₹2.5Cr - ₹6Cr",
        builder: "M3M Group"
      }
    ],
    haryana: [
      {
        name: "Sushant Golf City",
        location: "Gurgaon, Haryana",
        priceRange: "₹1.2Cr - ₹4Cr",
        builder: "Sushant Group"
      },
      {
        name: "Tulip Purple",
        location: "Sector 69, Haryana",
        priceRange: "₹90L - ₹2.5Cr",
        builder: "Tulip Group"
      },
      {
        name: "Elan Epic",
        location: "Sector 70, Haryana",
        priceRange: "₹70L - ₹1.5Cr",
        builder: "Elan Group"
      }
    ],
    punjab: [
      {
        name: "Wave Estate",
        location: "Mohali, Punjab",
        priceRange: "₹1.5Cr - ₹3.5Cr",
        builder: "Wave Group"
      },
      {
        name: "Omaxe New Chandigarh",
        location: "New Chandigarh, Punjab",
        priceRange: "₹60L - ₹1.2Cr",
        builder: "Omaxe Group"
      },
      {
        name: "Jubilee Hills",
        location: "Ludhiana, Punjab",
        priceRange: "₹50L - ₹90L",
        builder: "Jubilee Group"
      }
    ],
    bihar: [
      {
        name: "Nalanda Residency",
        location: "Patna, Bihar",
        priceRange: "₹30L - ₹80L",
        builder: "Nalanda Builders"
      },
      {
        name: "Bihar Green City",
        location: "Patna, Bihar",
        priceRange: "₹1Cr - ₹2Cr",
        builder: "Bihar Infra"
      },
      {
        name: "Patna Heights",
        location: "Patna, Bihar",
        priceRange: "₹50L - ₹1.5Cr",
        builder: "Patna Constructions"
      }
    ],
    up: [
      {
        name: "Wave City Center",
        location: "Noida, Uttar Pradesh",
        priceRange: "₹1.5Cr - ₹3.5Cr",
        builder: "Wave Group"
      },
      {
        name: "Gaur City 2",
        location: "Greater Noida, Uttar Pradesh",
        priceRange: "₹60L - ₹1.2Cr",
        builder: "Gaursons"
      },
      {
        name: "Supertech Eco Village",
        location: "Greater Noida, Uttar Pradesh",
        priceRange: "₹50L - ₹1.5Cr",
        builder: "Supertech Group"
      }
    ],
    mp: [
      {
        name: "Omex Greens",
        location: "Indore, Madhya Pradesh",
        priceRange: "₹40L - ₹1Cr",
        builder: "Omex Group"
      },
      {
        name: "The Chancery",
        location: "Bhopal, Madhya Pradesh",
        priceRange: "₹50L - ₹1.5Cr",
        builder: "Chancery Developers"
      },
      {
        name: "Urban Heights",
        location: "Indore, Madhya Pradesh",
        priceRange: "₹30L - ₹80L",
        builder: "Urban Group"
      }
    ],
    arunachal: [
      {
        name: "Green Valley",
        location: "Itanagar, Arunachal Pradesh",
        priceRange: "₹40L - ₹90L",
        builder: "Green Estates"
      },
      {
        name: "Himalayan Heights",
        location: "Tawang, Arunachal Pradesh",
        priceRange: "₹60L - ₹1.2Cr",
        builder: "Himalayan Builders"
      },
      {
        name: "Pine View Residency",
        location: "Naharlagun, Arunachal Pradesh",
        priceRange: "₹30L - ₹60L",
        builder: "Pine View Group"
      }
    ],
    assam: [
      {
        name: "River View Residency",
        location: "Guwahati, Assam",
        priceRange: "₹50L - ₹1.2Cr",
        builder: "River Developers"
      },
      {
        name: "Brahmaputra Heights",
        location: "Guwahati, Assam",
        priceRange: "₹60L - ₹1.5Cr",
        builder: "Brahmaputra Group"
      },
      {
        name: "Assam Green Valley",
        location: "Dibrugarh, Assam",
        priceRange: "₹40L - ₹90L",
        builder: "Assam Infra"
      }
    ]
  };

  // Simulate incremental loading
  const projects = mockData[cityName.toLowerCase()] || [];
  const result = [];
  
  for (let i = 0; i < projects.length; i++) {
    result.push(projects[i]);
    progressCallback(((i + 1) / projects.length) * 50); // First half of progress for scraping
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate delay
  }
  
  return result;
}
