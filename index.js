const IgApiClient = require('instagram-private-api').IgApiClient;
let pendingFollowRequests = require('./pending_follow_requests.json')
pendingFollowRequests=pendingFollowRequests.relationships_follow_requests_sent;
console.log(pendingFollowRequests)

async function cancelAllFollowRequests(user, password, pendingFollowRequests) {
  // Create a new Instagram API client
  const ig = new IgApiClient();
  ig.state.generateDevice(user);

  // Login to Instagram
  await ig.account.login(user, password);
  // Extract the user IDs from the list of pending follow requests
  const userIds = pendingFollowRequests.map((request) => {
    return request.string_list_data[0].value;
  });
  // Cancel the follow requests
  console.log("You have total "+userIds.length+" pending follow request");
  
  async function cancelRequest(usernames) {
    let i = 0;
    for (const username of usernames) {
      if(i<=10){
        console.log("Cancelling request for => "+username)
        const userId = await ig.user.getIdByUsername(username);
        setTimeout(async () => {
          await ig.friendship.destroy(userId);
        },2000);
        console.log("Cancelled request for => "+username)
        i++;
      }else{
        //Re Login to Instagram
        console.log('You have logged in again')
        await ig.account.login(user, password);
        i=0;
      }
    }
  }

  cancelRequest(userIds).then(() => {
    console.log('Your All Pending Request has been cancelled');
  }).catch((error) => {
    console.error(error);
  });    
}

// Example usage: cancel all follow requests
cancelAllFollowRequests('UserName', 'Password', pendingFollowRequests);
