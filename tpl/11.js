function a(posts) {
  var r = [];
  for(var i = 0; i < posts.length; i++) {
  var post = posts[i]; 
  if(!post.expert){ 
    r.push("<span>post is null</span>");
  } else { 
    r.push("<a href=\"#\">");
    r.push( post.expert );
    r.push(" at ");
    r.push( post.time );
    r.push("</a>");
  } 
 } 
  return r.join(" ")
}
console.log(a([1,2,{expert:'saa',time:'12-21-2'}]));