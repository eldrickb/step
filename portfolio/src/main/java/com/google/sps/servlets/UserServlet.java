package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.users.User;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.appengine.api.datastore.Query.FilterOperator;

import com.google.sps.data.UserModel;
import com.google.sps.data.UserBuilder;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.*;

@WebServlet("/user")
public class UserServlet extends HttpServlet {

    private DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    private Gson gson = new Gson();

    @Override 
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        JsonObject jsonResp = new JsonObject();
        UserService userService = UserServiceFactory.getUserService();

        if (userService.isUserLoggedIn()) {

            User currUser = userService.getCurrentUser();

            jsonResp.addProperty("email", currUser.getEmail());
            jsonResp.addProperty("logoutUrl", userService.createLogoutURL("/panel.html"));
            jsonResp.addProperty("isLoggedIn", true);
        } else {
            
            jsonResp.addProperty("loginUrl", userService.createLoginURL("/panel.html"));
            jsonResp.addProperty("isLoggedIn", false);
        }

        response.getWriter().println(gson.toJson(jsonResp));
    }
}