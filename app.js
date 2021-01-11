//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const _=require("lodash")
const ejs = require("ejs");
var mongoose=require("mongoose");
mongoose.connect('mongodb://localhost:27017/BlogDB',{useNewUrlParser: true,useUnifiedTopology:true});
let BlogTitle;
let BlogContent;
var HomeContent;
 const postSchema=
 {
   Title:String,
   Content:String
 }
 const ContentSchema=
 {
   name:String,
   BlogContent:String,
 }
 const Post=mongoose.model("Post",postSchema);
 const Content=mongoose.model("Content",ContentSchema);
 const content1= new Content(
  {
    name:"homeStartingContent",
    BlogContent:"Lacus Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing. ghjhghjghjgjkljdklf jkfdf dfklsdjfklsd jfklsdjfklsdjfklsdfsdlfj sdkfjsdklfjasdklfjsdklf Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales quam erat, ultrices facilisis felis placerat sed. Nulla vel metus eu magna egestas finibus. In aliquet neque vitae velit blandit vehicula. Donec in nunc vel odio aliquam gravida. In tempor nulla eget enim convallis fermentum. Praesent non mauris nulla. Quisque sed dapibus nisi. Proin quis gravida est, eu gravida justo. Integer gravida eros sed enim commodo semper. Phasellus quis felis et quam tincidunt scelerisque ut a turpis. Quisque finibus eget quam sed pellentesque. Vestibulum feugiat, urna in sodales commodo, metus ligula tincidunt ipsum, ut rhoncus ex tellus et nulla. Morbi pulvinar, sapien sit amet ultrices congue, mauris lorem cursus mauris, ut vulputate tortor arcu venenatis mauris. Donec at tellus ac arcu dignissim posuere. Donec at lobortis massa. Quisque et lorem vitae eros maximus imperdiet at eget nibh. Proin non finibus orci, id finibus mauris. Mauris aliquam elementum enim, luctus dapibus risus commodo non. Maecenas lobortis turpis nec dui posuere, non ultricies nibh rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam efficitur justo id tincidunt pellentesque. Proin feugiat diam quis porta consequat. Sed non ante eget odio ornare suscipit. Curabitur iaculis nibh sed ligula lacinia, ut facilisis massa consequat. Vestibulum sed lectus et arcu elementum gravida nec eu quam. Donec porta faucibus consequat. In non sollicitudin ligula, vel viverra ex. Nam pellentesque orci dolor, at sodales lectus ultrices dignissim. Nulla ultrices orci lacus, id efficitur turpis vestibulum non. Aliquam vel tellus pretium, sagittis odio vel, varius elit.jsdklfjsdklfjd klfjdklfjkl fj",
  
  }
)
content1.save();
const content2= new Content(
  {
    name:"aboutContent",
    BlogContent:"Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.",
  }
)
content2.save();
  const content3= new Content(
    {
      name:"contactContent",
      BlogContent: "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.",
    }
  )
content3.save()

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use('*/css',express.static("public/css"));
let posts=[];
app.get("/",(req,res)=>
{
   Content.findOne({name:"homeStartingContent"},(err,FoundedContent)=>
   {
     Post.find({},(err,FoundedItem)=>
   {
     if(!err)
{
  console.log(FoundedContent.BlogContent);
  res.render("home",{
    
    content:FoundedContent.BlogContent,
    PostsArray:FoundedItem});   
}
   })

   })
   
 
});

app.get("/posts/:BlogNo",(req,res)=>
{
  const requestedTitle=_.lowerCase(req.params.BlogNo);
  Post.find({},(err,FoundedItems)=>
  {
    FoundedItems.forEach(Blog => {
      const storedTitle=_.lowerCase(Blog.Title);
      console.log(storedTitle);   
      if(storedTitle===requestedTitle)
      {
         res.render("post",{PostTitle:Blog.Title,PostContent:Blog.Content})
      } 
      else
      {
        console.log("Not a match");
      }
  })
  
  }); 
  
})

app.get("/about",(req,res)=>
{
  res.render("about",{content:aboutContent})
});
 app.get("/contact",(req,res)=>
 {
   res.render("contact",{content:contactContent});
 })
 app.get("/compose",(req,res)=>
 {
   res.render("compose");
 })

 app.post("/",(req,res)=>
{

const post= new Post(
{
  Title:req.body.PostTitle,
  Content:req.body.PostBody,
})
post.save();
BlogTitle=req.body.PostTitle;
BlogContent=req.body.PostBody;
res.redirect("/");
 
});

 
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
