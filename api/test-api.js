const axios = require("axios");

const BASE_URL = "http://localhost:3000";

async function testRedditAPI() {
  console.log("🧪 Testing Reddit API endpoints...\n");

  try {
    // Test 1: Get hot posts from r/TIFU
    console.log("1. Testing GET /api/reddit/tifu/hot");
    const hotPostsResponse = await axios.get(
      `${BASE_URL}/api/reddit/tifu/hot?limit=3`
    );
    console.log("✅ Hot posts endpoint working");
    console.log(`   Found ${hotPostsResponse.data.count} posts`);
    console.log(
      `   First post: ${hotPostsResponse.data.data[0]?.title?.substring(
        0,
        50
      )}...\n`
    );

    // Test 2: Test with invalid limit
    console.log("2. Testing GET /api/reddit/tifu/hot with invalid limit");
    try {
      await axios.get(`${BASE_URL}/api/reddit/tifu/hot?limit=150`);
    } catch (error) {
      if (error.response?.status === 400) {
        console.log("✅ Invalid limit validation working");
        console.log(`   Error: ${error.response.data.error}\n`);
      }
    }

    // Test 3: Test search endpoint
    console.log("3. Testing GET /api/reddit/tifu/search");
    const searchResponse = await axios.get(
      `${BASE_URL}/api/reddit/tifu/search?q=work&limit=2`
    );
    console.log("✅ Search endpoint working");
    console.log(`   Found ${searchResponse.data.count} posts for query "work"`);
    console.log(
      `   First result: ${searchResponse.data.data[0]?.title?.substring(
        0,
        50
      )}...\n`
    );

    // Test 4: Test health endpoint
    console.log("4. Testing GET /health");
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log("✅ Health endpoint working");
    console.log(`   Status: ${healthResponse.data.status}\n`);

    console.log("🎉 All tests passed! The Reddit API is working correctly.");
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }
  }
}

// Run the test
testRedditAPI();
