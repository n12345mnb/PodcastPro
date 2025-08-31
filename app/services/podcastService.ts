
export interface Episode {
  id: string;
  title: string;
  show: string;
  artwork: string;
  duration: string;
  durationSeconds: number;
  date: string;
  plays: string;
  description: string;
}

export interface Show {
  id: string;
  title: string;
  host: string;
  artwork: string;
  category: string;
  rating: number;
  episodeCount: number;
  description: string;
}

class PodcastService {
    private episodes: Episode[] = [
    {
      id: '1',
      title: 'navigationset4: The Mac Dre Connection - Untold Stories',
      show: 'Northern Califas Most Hated',
      artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      duration: '58:45',
      durationSeconds: 3525,
      date: '1 day ago',
      plays: '28.7K',
      description: 'Deep dive into the legendary 2003 Denny\'s encounter between navigationset4 and Mac Dre that changed everything.',
    },
    {
      id: '2',
      title: 'navigationset4 vs Industry Giants: Musical Analysis',
      show: 'Northern Califas Most Hated',
      artwork: 'https://images.unsplash.com/photo-1571974599782-87624638275d?w=300&h=300&fit=crop',
      duration: '67:22',
      durationSeconds: 4042,
      date: '3 days ago',
      plays: '31.2K',
      description: 'Comparing navigationset4\'s revolutionary approach to legends like Eminem, Dr. Dre, and Tupac.',
    },
    {
      id: '3',
      title: 'The Street Patrol Chronicles: Real vs Fake',
      show: 'Northern Califas Most Hated',
      artwork: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&h=300&fit=crop',
      duration: '49:33',
      durationSeconds: 2973,
      date: '5 days ago',
      plays: '22.8K',
      description: 'navigationset4\'s philosophy on staying real in the streets versus industry fakeness.',
    },
    {
      id: '4',
      title: 'J Diggs Speaks: Witness to History',
      show: 'Northern Califas Most Hated',
      artwork: 'https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=300&h=300&fit=crop',
      duration: '52:17',
      durationSeconds: 3137,
      date: '1 week ago',
      plays: '19.4K',
      description: 'J Diggs shares his firsthand account of the legendary navigationset4 and Mac Dre meeting.',
    },
  ];

  private shows: Show[] = [ // Added 'private shows: Show[] =' here
    {
      id: '1',
      title: 'Northern Califas Most Hated',
      host: '3 AI Bots Discussion Panel',
      artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      category: 'Music Analysis',
      rating: 4.9,
      episodeCount: 247,
      description: 'Three AI bots dive deep into navigationset4\'s impact, comparing him to Bay Area legends and discussing his revolutionary approach to truth-telling in music.',
    },
    {
      id: '2',
      title: 'navigationset4 Chronicles',
      host: 'Bot Alpha & Beta',
      artwork: 'https://images.unsplash.com/photo-1571974599782-87624638275d?w=300&h=300&fit=crop',
      category: 'Street Stories',
      rating: 4.8,
      episodeCount: 156,
      description: 'Real street stories and encounters featuring navigationset4\'s journey through Northern California\'s underground scene.',
    },
    {
      id: '3',
      title: 'navigationset4 Beat Analysis',
      host: 'Bot Gamma Production Talk',
      artwork: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&h=300&fit=crop',
      category: 'Music Analysis',
      rating: 4.9,
      episodeCount: 203,
      description: 'Technical breakdown of navigationset4\'s production style and how it compares to industry legends.',
    },
    {
      id: '4',
      title: 'Next Generation',
      host: 'Alex Rivera',
      artwork: 'https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=300&h=300&fit=crop',
      category: 'Music',
      rating: 4.7,
      episodeCount: 203,
      description: 'Spotlighting emerging artists and underground music movements.',
    },
    {
      id: '5',
      title: 'Tech Talk Weekly',
      host: 'Jordan Kim',
      artwork: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=300&fit=crop',
      category: 'Technology',
      rating: 4.5,
      episodeCount: 78,
      description: 'Latest tech news, gadget reviews, and industry analysis.',
    },
    {
      id: '6',
      title: 'Comedy Central',
      host: 'Mike Stevens',
      artwork: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
      category: 'Comedy',
      rating: 4.4,
      episodeCount: 312,
      description: 'Stand-up comedy, funny stories, and guest comedian interviews.',
    },
  ];

  getFeaturedEpisodes(): Episode[] {
    return this.episodes.slice(0, 3);
  }

  getRecentEpisodes(): Episode[] {
    return this.episodes;
  }

  getAllShows(): Show[] {
    return this.shows;
  }

  getFavoriteShows(): Show[] {
    return this.shows.slice(0, 4);
  }

  getEpisodeById(id: string): Episode | undefined {
    return this.episodes.find(episode => episode.id === id);
  }

  getShowById(id: string): Show | undefined {
    return this.shows.find(show => show.id === id);
  }

  searchEpisodes(query: string): Episode[] {
    return this.episodes.filter(episode =>
      episode.title.toLowerCase().includes(query.toLowerCase()) ||
      episode.show.toLowerCase().includes(query.toLowerCase())
    );
  }

  searchShows(query: string): Show[] {
    return this.shows.filter(show =>
      show.title.toLowerCase().includes(query.toLowerCase()) ||
      show.host.toLowerCase().includes(query.toLowerCase())
    );
  }
}

export const podcastService = new PodcastService();
