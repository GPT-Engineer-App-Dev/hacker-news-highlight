import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import StoryItem from "./StoryItem";
import SkeletonLoader from "./SkeletonLoader";

const fetchTopStories = async () => {
  const response = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
  const storyIds = await response.json();
  const top100Ids = storyIds.slice(0, 100);
  
  const storyPromises = top100Ids.map(id =>
    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())
  );
  
  return Promise.all(storyPromises);
};

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: stories, isLoading, error } = useQuery({
    queryKey: ['topStories'],
    queryFn: fetchTopStories
  });

  const filteredStories = stories?.filter(story =>
    story && story.title && story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Hacker News Top 100 Stories</h1>
      <Input
        type="text"
        placeholder="Search stories..."
        className="mb-6"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <div className="space-y-4">
          {filteredStories?.map(story => (
            story && <StoryItem key={story.id} story={story} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;