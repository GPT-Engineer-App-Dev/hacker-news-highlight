import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpCircle, ExternalLink } from "lucide-react";

const StoryItem = ({ story }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{story.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <ArrowUpCircle className="mr-2 h-4 w-4 text-green-500" />
            <span>{story.score} points</span>
          </div>
          <a
            href={story.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-500 hover:text-blue-700"
          >
            Read more <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default StoryItem;