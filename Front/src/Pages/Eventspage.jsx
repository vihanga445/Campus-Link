import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaCalendarAlt, FaLayerGroup } from 'react-icons/fa';
import { Button, TextInput, Select } from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchFilters, setSearchFilters] = useState({
    title: '',
    type: 'all',
    date: ''
  });
  const [filteredEvents, setFilteredEvents] = useState([]);
  const { currentUser, error } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const queryParams = new URLSearchParams({
          ...(searchFilters.title && { title: searchFilters.title }),
          ...(searchFilters.type !== 'all' && { type: searchFilters.type }),
          ...(searchFilters.date && { date: searchFilters.date })
        });

        const res = await fetch(`/Back/post/events?${queryParams}`);
        const data = await res.json();
        
        if (data.success) {
          // Initialize with empty arrays if types is missing
          const formattedPosts = data.posts.map(post => ({
            ...post,
            eventDetails: {
              ...post.eventDetails,
              types: post.eventDetails?.types || []
            }
          }));
          setEvents(formattedPosts);
          setFilteredEvents(formattedPosts);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [searchFilters]); // Added searchFilters as dependency

  const handleSearch = () => {
    let filtered = [...events];

    // Filter by title
    if (searchFilters.title) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchFilters.title.toLowerCase())
      );
    }

    // Filter by type
    if (searchFilters.type !== 'all') {
      filtered = filtered.filter(event => 
        event.eventDetails.types.includes(searchFilters.type)
      );
    }

    // Filter by date
    if (searchFilters.date) {
      const searchDate = new Date(searchFilters.date).toDateString();
      filtered = filtered.filter(event => 
        new Date(event.eventDetails.date).toDateString() === searchDate
      );
    }

    setFilteredEvents(filtered);
  };

  const resetFilters = () => {
    setSearchFilters({
      title: '',
      type: 'all',
      date: ''
    });
    setFilteredEvents(events);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Events</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar - Search Filters */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-6">Search Filters</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Name
                  </label>
                  <TextInput
                    icon={FaSearch}
                    placeholder="Search by name..."
                    value={searchFilters.title}
                    onChange={(e) => setSearchFilters({
                      ...searchFilters,
                      title: e.target.value
                    })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Type
                  </label>
                  <Select
                    value={searchFilters.type}
                    onChange={(e) => setSearchFilters({
                      ...searchFilters,
                      type: e.target.value
                    })}
                  >
                    <option value="all">All Types</option>
                    <option value="Academic">Academic</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Sports">Sports</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Career">Career</option>
                    <option value="Club">Club</option>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Date
                  </label>
                  <TextInput
                    type="date"
                    value={searchFilters.date}
                    onChange={(e) => setSearchFilters({
                      ...searchFilters,
                      date: e.target.value
                    })}
                  />
                </div>

                <div className="pt-4 space-y-2">
                  <Button
                    gradientDuoTone="purpleToBlue"
                    className="w-full"
                    onClick={handleSearch}
                  >
                    Search Events
                  </Button>
                  <Button
                    outline
                    gradientDuoTone="purpleToBlue"
                    className="w-full"
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </Button>
                  {currentUser && (
                                      <div>
                                      <Link to={'/create-post'}>
                                      <Button
                                        type="button"
                                        gradientDuoTone="purpleToPink"
                                        className="w-full h-2xl transition duration-300 transform hover:scale-105"
                                      >
                                      Create Event
                                      </Button>
                                    </Link>
                                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Event Results */}
          <div className="md:w-3/4">
            {loading ? (
              <div className="text-center py-8">Loading events...</div>
            ) : filteredEvents.length === 0 ? (
              <div className="text-center py-8 bg-white rounded-lg shadow-md">
                <p className="text-gray-600">No events found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredEvents.map(event => (
                  <Link to={`/post/${event.slug}`} key={event._id}>
                    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                      {event.image && (
                        <img 
                          src={event.image}
                          alt={event.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                      )}
                      <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2">{event.title || 'Untitled Event'}</h2>
                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                          <FaCalendarAlt />
                          <span>
                            {event.eventDetails?.date 
                              ? new Date(event.eventDetails.date).toLocaleDateString()
                              : 'Date not specified'
                            }
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {event.eventDetails?.types?.map(type => (
                            <span 
                              key={type}
                              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                            >
                              {type}
                            </span>
                          ))}
                        </div>
                        <p className="text-gray-600 line-clamp-2">
                          {event.eventDetails?.organizer || 'Organizer not specified'}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}