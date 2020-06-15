
package com.google.sps.servlets;

import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import java.io.IOException;
import java.io.PrintWriter;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.sps.data.Comment;
import com.google.sps.data.CommentBuilder;
import com.google.appengine.api.datastore.FetchOptions;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Optional;
import java.util.ArrayList;
import java.util.LinkedList;
import com.google.gson.*;

/** 
* Servlet that handles the  "/file" endpoint 
*/
@WebServlet("/file")
public class FileServlet extends HttpServlet {


    private Gson gson = new Gson();

    /** 
    * Responds with a url to upload the file to
    */
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        
        BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
        String uploadUrl = blobstoreService.createUploadUrl("/comments");

        JsonObject jsonResp = new JsonObject();
        jsonResp.addProperty("uploadUrl", uploadUrl);

        response.getWriter().println(gson.toJson(jsonResp));

    }
}