# Reddit TTS API

Backend for the App: Interesting stories are picked from reddit and converted into audio to give mini tidbit stories to listen on the go.

## Features

- **Reddit Integration**: Fetch hot posts from r/TIFU subreddit
- **Search Functionality**: Search for specific posts in r/TIFU
- **RESTful API**: Clean and intuitive API endpoints
- **Error Handling**: Comprehensive error handling and validation
- **Logging**: Structured logging with Winston
- **TypeScript**: Full TypeScript support with type safety

## API Endpoints

### Reddit API

#### Get Hot Posts from r/TIFU

```
GET /api/reddit/tifu/hot?limit={number}
```

**Parameters:**

- `limit` (optional): Number of posts to fetch (1-100, default: 10)

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "post_id",
      "title": "Post title",
      "author": "username",
      "url": "https://reddit.com/...",
      "selftext": "Post content",
      "score": 1234,
      "created_utc": 1234567890,
      "num_comments": 56,
      "subreddit": "TIFU",
      "permalink": "/r/TIFU/comments/...",
      "is_self": true,
      "domain": "self.TIFU"
    }
  ],
  "count": 10,
  "subreddit": "TIFU",
  "sort": "hot"
}
```

#### Search Posts in r/TIFU

```
GET /api/reddit/tifu/search?q={query}&limit={number}
```

**Parameters:**

- `q` (required): Search query
- `limit` (optional): Number of posts to fetch (1-100, default: 10)

**Response:**

```json
{
  "success": true,
  "data": [...],
  "count": 5,
  "subreddit": "TIFU",
  "query": "search term"
}
```

#### Get Specific Post by ID

```
GET /api/reddit/tifu/post/{postId}
```

**Parameters:**

- `postId` (required): Reddit post ID

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "post_id",
    "title": "Post title",
    "author": "username",
    "url": "https://reddit.com/...",
    "selftext": "Post content",
    "score": 1234,
    "created_utc": 1234567890,
    "num_comments": 56,
    "subreddit": "TIFU",
    "permalink": "/r/TIFU/comments/...",
    "is_self": true,
    "domain": "self.TIFU"
  },
  "subreddit": "TIFU"
}
```

### Health Check

```
GET /health
```

**Response:**

```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd reddit-tts
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The server will start on `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run dev:watch` - Start development server with nodemon
- `npm run build` - Build the project
- `npm start` - Start production server

## Project Structure

```
reddit-tts/
├── app.ts                 # Main application entry point
├── src/
│   ├── logger/           # Logging configuration
│   ├── routes/           # API route handlers
│   │   ├── index.ts      # Main routes
│   │   └── reddit.ts     # Reddit API routes
│   ├── services/         # Business logic
│   │   └── reddit.ts     # Reddit API service
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── logs/                 # Application logs
└── package.json
```

## Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Invalid parameters (e.g., limit out of range)
- **404 Not Found**: Post not found
- **500 Internal Server Error**: Server-side errors

All errors return a consistent format:

```json
{
  "success": false,
  "error": "Error message"
}
```

## Logging

The application uses Winston for structured logging. Logs are written to:

- `logs/app.log` - Application logs
- `logs/error.log` - Error logs

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Axios** - HTTP client for Reddit API
- **Winston** - Logging
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logging
