import axios, { AxiosResponse } from 'axios';
import logger from '../logger';

// Reddit API types
export interface RedditPost {
  id: string;
  title: string;
  author: string;
  url: string;
  selftext: string;
  score: number;
  created_utc: number;
  num_comments: number;
  subreddit: string;
  permalink: string;
  is_self: boolean;
  domain: string;
}

export interface RedditListing {
  kind: string;
  data: {
    children: Array<{
      kind: string;
      data: RedditPost;
    }>;
    after: string | null;
    before: string | null;
  };
}

export interface RedditApiResponse {
  kind: string;
  data: {
    children: Array<{
      kind: string;
      data: RedditPost;
    }>;
  };
}

export interface RedditServiceResponse {
  success: boolean;
  data?: RedditPost[];
  error?: string;
  count?: number;
}

class RedditService {
  private readonly baseUrl = 'https://www.reddit.com';
  private readonly userAgent = 'RedditTTS/1.0.0 (by /u/your_username)';

  /**
   * Fetch hot posts from r/TIFU subreddit
   * @param limit - Number of posts to fetch (default: 10, max: 100)
   * @returns Promise<RedditServiceResponse>
   */
  async getTIFUHotPosts(limit: number = 10): Promise<RedditServiceResponse> {
    try {
      logger.info(`Fetching ${limit} hot posts from r/TIFU`);

      const response: AxiosResponse<RedditApiResponse> = await axios.get(
        `${this.baseUrl}/r/TIFU/hot.json`,
        {
          headers: {
            'User-Agent': this.userAgent,
            'Accept': 'application/json'
          },
          params: {
            limit: Math.min(limit, 100), // Reddit API max is 100
            raw_json: 1
          },
          timeout: 10000 // 10 second timeout
        }
      );

      if (response.status !== 200) {
        throw new Error(`Reddit API returned status ${response.status}`);
      }

      const posts = response.data.data.children.map(child => child.data);
      
      logger.info(`Successfully fetched ${posts.length} posts from r/TIFU`);

      return {
        success: true,
        data: posts,
        count: posts.length
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      logger.error('Failed to fetch TIFU hot posts', {
        error: errorMessage,
        stack: error instanceof Error ? error.stack : undefined
      });

      return {
        success: false,
        error: errorMessage
      };
    }
  }

  /**
   * Fetch a specific post by ID from r/TIFU
   * @param postId - The Reddit post ID
   * @returns Promise<RedditServiceResponse>
   */
  async getTIFUPost(postId: string): Promise<RedditServiceResponse> {
    try {
      logger.info(`Fetching post ${postId} from r/TIFU`);

      const response: AxiosResponse<RedditApiResponse> = await axios.get(
        `${this.baseUrl}/r/TIFU/comments/${postId}.json`,
        {
          headers: {
            'User-Agent': this.userAgent,
            'Accept': 'application/json'
          },
          params: {
            raw_json: 1
          },
          timeout: 10000
        }
      );

      if (response.status !== 200) {
        throw new Error(`Reddit API returned status ${response.status}`);
      }

      // The first element contains the post data
      const post = response.data.data.children[0]?.data;
      
      if (!post) {
        throw new Error('Post not found');
      }

      logger.info(`Successfully fetched post ${postId} from r/TIFU`);

      return {
        success: true,
        data: [post],
        count: 1
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      logger.error('Failed to fetch TIFU post', {
        postId,
        error: errorMessage,
        stack: error instanceof Error ? error.stack : undefined
      });

      return {
        success: false,
        error: errorMessage
      };
    }
  }

  /**
   * Search for posts in r/TIFU
   * @param query - Search query
   * @param limit - Number of posts to fetch (default: 10, max: 100)
   * @returns Promise<RedditServiceResponse>
   */
  async searchTIFUPosts(query: string, limit: number = 10): Promise<RedditServiceResponse> {
    try {
      logger.info(`Searching for "${query}" in r/TIFU`);

      const response: AxiosResponse<RedditApiResponse> = await axios.get(
        `${this.baseUrl}/r/TIFU/search.json`,
        {
          headers: {
            'User-Agent': this.userAgent,
            'Accept': 'application/json'
          },
          params: {
            q: query,
            limit: Math.min(limit, 100),
            sort: 'hot',
            t: 'all',
            raw_json: 1
          },
          timeout: 10000
        }
      );

      if (response.status !== 200) {
        throw new Error(`Reddit API returned status ${response.status}`);
      }

      const posts = response.data.data.children.map(child => child.data);
      
      logger.info(`Successfully found ${posts.length} posts for query "${query}" in r/TIFU`);

      return {
        success: true,
        data: posts,
        count: posts.length
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      logger.error('Failed to search TIFU posts', {
        query,
        error: errorMessage,
        stack: error instanceof Error ? error.stack : undefined
      });

      return {
        success: false,
        error: errorMessage
      };
    }
  }
}

export default new RedditService(); 