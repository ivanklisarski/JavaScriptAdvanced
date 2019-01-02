function posts() {

    class Post{
        constructor(title,content){
            this.title = title;
            this.content = content;
        }

        toString(){
            return `Post: ${this.title}\nContent: ${this.content}`;

        }
    }
      class SocialMediaPost extends Post{
        constructor(title,content,likes,dislikes){
            super(title,content);
            this.likes = likes;
            this.dislikes = dislikes;

            this.comments = [];


        }
        addComment(comment){
                this.comments.push(comment);
        }

        toString(){
            let result = super.toString() + "\n" +
                `Rating: ${this.likes - this.dislikes}`;

            if(this.comments.length > 0) {
                result += "\n" + "Comments:\n";
            }

            for (let comment of this.comments) {
                result += (` * ${comment}` + "\n");
            }

            return result.trim();
        }
      }
      class BlogPost extends Post{
        constructor(title,content,views){
            super(title, content);
            this.views = +views;

        }
        view(){
            this.views++;
            return this;

        }
        toString(){
            return super.toString() + "\n" +
                `Views: ${this.views}`;
        }
      }


    return {
        Post,
        BlogPost,
        SocialMediaPost
    }


}