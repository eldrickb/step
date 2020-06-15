package com.google.sps.data;


/**
* Database model for the Comment type 
*/
public final class Comment {

    private final String author;
    private final String content;
    private final long id;
    private final String img;

    /**
    * Full constructor of all properties of the comment.
    * @param id the id of the comment.
    * @param author the author of the comment.
    * @param content the content of the comment.
    * @param img the image of the comment.
    */
    public Comment (long id, String author, String content, String img) {
        this.id = id;
        this.author = author;
        this.content = content;
        this.img = img;
    }

    /**
    * Constructor without image.
    * @param id the id of the comment.
    * @param author the author of the comment.
    * @param content the content of the comment.
    */
    public Comment (long id, String author, String content) {
        this.id = id;
        this.author = author;
        this.content = content;
        this.img = null;
    }
    
    /**
    * Gets the author of the comment.
    * @return the author of the comment.
    */
    public String getAuthor() {
        return author;
    }

    /**
    * Gets the content of the comment.
    * @return the content of the comment.
    */
    public String getContent() {
        return content;
    }

    /**
    * Gets the database ID of the comment.
    * @return the database ID of the comment.
    */
    public long getId() {
        return id;
    }

    /**
    * Gets the image of the comment.
    * @return the image of the comment.
    */
    public String getImg() {
        return img;
    }
}