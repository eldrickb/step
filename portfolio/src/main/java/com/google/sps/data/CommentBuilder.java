package com.google.sps.data;


/**
* Fluent Builder class for the Comment database model
*/
public final class CommentBuilder {

    private String author;
    private String content;
    private long id;
    private String img;

    /**
    * Directly adds all parameters to the builder.
    * @param id the id of the comment.
    * @param author the author of the comment.
    * @param content the content of the comment.
    * @param img the img of the comment (if it has one).
    */
    public CommentBuilder (long id, String author, String content, String img) {
        this.author = author;
        this.content = content;
        this.id = id;
    }


    /**
    * Empty constructor for use of Fluent interface.
    */
    public CommentBuilder() {
    }

    /**
    * Sets the author of the builder.
    * @param author the author of the comment.
    */
    public CommentBuilder setAuthor(String author) {
        this.author = author;
        return this;
    }

    /**
    * Sets the content of the builder.
    * @param content the content of the comment.
    */
    public CommentBuilder setContent(String content) {
        this.content = content;
        return this;
    }


    /**
    * Sets the author of the builder.
    * @param id the id of the comment.
    */
    public CommentBuilder setId(long id) {
        this.id = id;
        return this;
    }


    /**
    * Sets the imagea of the builder.
    * @param img the image of the comment.
    */
    public CommentBuilder setImg(String img) {
        if (img != null && img.length() > 0) {
            this.img = img;
        }
        return this;
    }


    /**
    * Builds the comment instance.
    * @returns a new Comment instance with the properties set.
    */
    public Comment build () {
        if (this.img != null) {
            return new Comment(id, author, content, img);
        } else {
            return new Comment(id, author, content);
        }

    }
}