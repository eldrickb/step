// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.sps.data.Comment;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.LinkedList;
import com.google.gson.Gson;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/comments")
public class CommentsServlet extends HttpServlet {

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Gson gson = new Gson();

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        Query query = new Query("Comment");
        PreparedQuery results = datastore.prepare(query);

        LinkedList<Comment> comments = new LinkedList<>();

        for (Entity entity : results.asIterable()) {
            Comment newComment = new Comment()
                .setId(entity.getKey().getId())
                .setAuthor((String) entity.getProperty("author"))
                .setContent((String) entity.getProperty("content"));
            
            comments.add(newComment);
        }

        response.setContentType("application/json");
        response.getWriter().println(gson.toJson(comments));

    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        String commentContent = getParameter(request, "comment-content", "");
        String commentAuthor = getParameter(request, "comment-author", "");

        Entity commentEntity = new Entity("Comment");
        
        commentEntity.setProperty("author", commentAuthor);
        commentEntity.setProperty("content", commentContent);

        datastore.put(commentEntity);

        response.getWriter().println(gson.toJson(commentEntity));
        
    }

    /**
    * @return the request parameter, or the default value if the parameter
    *         was not specified by the client
    */
    private String getParameter(HttpServletRequest request, String name, String defaultValue) {

        String value = request.getParameter(name);
        if (value == null) {
            return defaultValue;
        }
        return value;
    }
}
