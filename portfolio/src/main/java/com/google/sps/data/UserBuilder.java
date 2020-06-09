package com.google.sps.data;


/**
* Fluent Builder class for the User database model
*/
public final class UserBuilder {

    private String email;
    private long id;

    /**
    * Directly adds all parameters to the builder.
    * @param id the id of the user.
    * @param email the email of the user.
    */
    public UserBuilder (long id, String email) {
        this.email = email;
        this.id = id;
    }

    /**
    * Empty constructor for use of Fluent interface.
    */
    public UserBuilder() {
    }

    /**
    * Sets the email of the builder.
    * @param email the email of the user.
    */
    public UserBuilder setEmail(String email) {
        this.email = email;
        return this;
    }


    /**
    * Sets the email of the builder.
    * @param id the id of the user.
    */
    public UserBuilder setId(long id) {
        this.id = id;
        return this;
    }


    /**
    * Builds the User instance.
    * @returns a new User instance with the properties set.
    */
    public UserModel build () {
        return new UserModel(id, email);
    }
}