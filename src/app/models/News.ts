class News{
    id: string;
    author: string;
    description: string;
    publishedAt: string;
    title: string;
    
    urlToImage: string;
    

    constructor(author: string,title:string,description:string,urlToImage:string,publishedAt:string)
    {
        this.id = new Date().toISOString() + Math.random() * 10;
        this.author = author;
        this.title = title;
        this.description = description;
        this.urlToImage = urlToImage;
        this.publishedAt = publishedAt;
    }
}

export default News;