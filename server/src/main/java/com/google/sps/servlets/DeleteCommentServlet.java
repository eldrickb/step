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
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.sps.data.Comment;
import com.google.sps.data.CommentBuilder;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Optional;
import com.google.gson.Gson;

/** 
* Servlet that handles the  "/comments" endpoint 
* @deprecated not finished yet
*/
@WebServlet("/comment/delete")
@Deprecated
public class DeleteCommentServlet extends HttpServlet {

    private DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    private Gson gson = new Gson();

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        String commentId = getParameter(request, "comment-id", "");

        Filter keyFilter = new FilterPredicate("id", FilterOperator.EQUAL, commentId); 

        Entity comment = datastore.prepare(new Query("Comment").setFilter(keyFilter)).asSingleEntity();


        if (comment != null)
            datastore.delete(comment.getKey());

        response.setStatus(200);
        response.getWriter().println("Success");
    }

    @Override 
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        
        Query query = new Query("Comment");
        PreparedQuery results = datastore.prepare(query);

        for (Entity entity : results.asIterable()) {

            long id = entity.getKey().getId();

            getQueryById(id);
        }
    }

    private void getQueryById (long id) {
        Filter keyFilter = new FilterPredicate("key.id", FilterOperator.EQUAL, id); 

        PreparedQuery comment = datastore.prepare(new Query("Comment").setFilter(keyFilter));
    }

    /**
    * @return the request parameter, or the default value if the parameter
    *         was not specified by the client
    */
    private String getParameter(HttpServletRequest request, String name, String defaultValue) {
        return Optional.ofNullable(request.getParameter(name)).orElse(defaultValue);
    }
}
