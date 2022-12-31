const IgApiClient = require('instagram-private-api').IgApiClient;
let pendingFollowRequests = require('./pending_follow_requests.json')
pendingFollowRequests=pendingFollowRequests.relationships_follow_requests_sent;
console.log(pendingFollowRequests)

async function cancelAllFollowRequests(username, password, pendingFollowRequests) {
  // Create a new Instagram API client
  const ig = new IgApiClient();
  ig.state.generateDevice(username);

  // Login to Instagram
  await ig.account.login(username, password);

  // Extract the user IDs from the list of pending follow requests
  const userIds = pendingFollowRequests.map((request) => {
    return request.string_list_data[0].value;
  });
  // Cancel the follow requests
  await Promise.all(userIds.map(async (userId) => {
    userId = await ig.user.getIdByUsername(userId);
    ig.friendship.destroy(userId);
    
  }));
}

// Example usage: cancel all follow requests
cancelAllFollowRequests('userName', 'Password', pendingFollowRequests);
