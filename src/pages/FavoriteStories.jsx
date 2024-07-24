import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import StoryItem from "./StoryItem";
import SkeletonLoader from "./SkeletonLoader";

const fetchStory = async (id) => {
  const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
  return response.json();
};

const FavoriteStories = () => {
  const [favoriteIds, setFavoriteIds] = useState([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoriteIds(favorites);
  }, []);

  const { data: favoriteStories, isLoading, error } = useQuery({
    queryKey: ['favoriteStories', favoriteIds],
    queryFn: () => Promise.all(favoriteIds.map(fetchStory)),
    enabled: favoriteIds.length > 0,
  });

  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Favorite Stories</h1>
      {isLoading ? (
        <SkeletonLoader />
      ) : favoriteStories && favoriteStories.length > 0 ? (
        <div className="space-y-4">
          {favoriteStories.map(story => (
            story && <StoryItem key={story.id} story={story} />
          ))}
        </div>
      ) : (
        <p>No favorite stories yet.</p>
      )}
    </div>
  );
};

export default FavoriteStories;