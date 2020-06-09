package com.google.sps.data;


/**
* Database model for the User type 
*/
public final class UserModel {

    private final String email;
    private final long id;

    /**
    * Full constructor of all properties of the user.
    * @param id the id of the user.
    * @param email the email of the user.
    */
    public UserModel (long id, String email) {
        this.id = id;
        this.email = email;
    }

    /**
    * @return the email of the user.
    */
    public String getEmail() {
        return email;
    }
}