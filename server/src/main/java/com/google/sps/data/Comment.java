package com.google.sps.data;

public class Comment {

    private String author;
    private String content;
    private long id;

    public Comment (long id, String author, String content) {
        this.author = author;
        this.content = content;
        this.id = id;
    }

    public Comment() {
    }

    public Comment setAuthor(String author) {
        this.author = author;
        return this;
    }
    public Comment setContent(String content) {
        this.content = content;
        return this;
    }

    public Comment setId(long id) {
        this.id = id;
        return this;
    }
}