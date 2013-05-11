google.load("feeds", "1");

// Callback function, for when a feed is loaded.
function constructFeed(result) {
  if (!result.error) {
  
    var container = document.getElementById("content");
    container.innerHTML = '';

    var entry, feed, feedTitle, feedDesc, feedItem, feedContent, mediaList, mediaLink;

    feedTitle = document.createElement("h1");
    feedTitle.innerHTML = result.feed.title;  

    feedDesc = document.createElement("div");
    feedDesc.innerHTML = result.feed.description;  

    feed = document.createElement("div");
    feed.className = "feed";

    container.appendChild(feedTitle);
    container.appendChild(feedDesc);
    container.appendChild(feed);

    // Loop through the feeds, putting the titles onto the page.
    // Check out the result object for a list of properties returned in each entry.
    // http://code.google.com/apis/ajaxfeeds/documentation/reference.html#JSON
     for (var i = 0; i < result.feed.entries.length; i++) {
       entry = result.feed.entries[i];
       feedItem = document.createElement("div");
       feedItem.className = "feedItem hide";
       
       feedTitle = document.createElement("h1");
       feedTitle.innerHTML = entry.title;  
 
       feedContent = document.createElement("div");
       feedContent.className = "content";
       feedContent.innerHTML = "<div class='datePublished'>Published on " + entry.publishedDate + "</div>" +
                               "<a class='watchTalk' target='_blank' href='" + entry.link + "'>View This Talk</a>" +
                               "<p>" + entry.content + "</p>";
       if(entry.mediaGroups)
       {
         mediaList = document.createElement("div");
         mediaList.className = "mediaList";
         mediaList.innerHTML += "<h1>Media Files:</h1><ul>";
         for(var count = 0; count < entry.mediaGroups.length; count++)
         {
           mediaLink = entry.mediaGroups[count].contents[0].url;
           mediaList.innerHTML += "<li><a href='" + mediaLink + "'>" + mediaLink.split("/").pop() + "</a></li>";
         }
         mediaList.innerHTML += "</ul>";
         
         feedContent.appendChild(mediaList);
       }
       
       feedItem.appendChild(feedTitle);
       feedItem.appendChild(feedContent);
       
       feed.appendChild(feedItem);
       
       feedItem.onclick = function(){
         if(this.className == "feedItem hide")
         {
           this.className = "feedItem";
         }
         else
         {
           this.className = "feedItem hide";
         }
       };
     }
   }
 }
 
 function loadFeed() {
   var feed = new google.feeds.Feed("http://feeds.feedburner.com/tedtalks_video");
   feed.setNumEntries(20);
   feed.load(constructFeed);
 }
 
 google.setOnLoadCallback(loadFeed);