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

import com.google.appengine.api.blobstore.BlobInfo;
import com.google.appengine.api.blobstore.BlobInfoFactory;
import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.google.appengine.api.images.ImagesService;
import com.google.appengine.api.images.ImagesServiceFactory;
import com.google.appengine.api.images.ServingUrlOptions;
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
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
import java.util.Map;
import java.lang.Boolean;

/** 
* Servlet that handles the  "/comments" endpoint 
*/
@WebServlet("/comments")
public class CommentsServlet extends HttpServlet {

    private DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    private Gson gson = new Gson();

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        int queryCount = Integer.parseInt(getParameter(request, "limit", "-1"));

        Query query = new Query("Comment");
        PreparedQuery results = datastore.prepare(query);
        Iterable<Entity> resultsList;


        // apply appropriate request limit
        if (queryCount > -1) {
            resultsList = results.asIterable(FetchOptions.Builder.withLimit(queryCount));
        } else {
            resultsList = results.asIterable();
        }

        // deal with uploaded file (if there is one)


        // build list of comments
        LinkedList<Comment> comments = new LinkedList<>();

        for (Entity entity : resultsList) {
                
            Comment newComment = new CommentBuilder()
                .setId(entity.getKey().getId())
                .setAuthor((String) entity.getProperty("author"))
                .setContent((String) entity.getProperty("content"))
                .setImg((String) entity.getProperty("image"))
                .build();
            
            comments.add(newComment);
        }

        response.setContentType("application/json");
        response.getWriter().println(gson.toJson(comments));
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        
        // set usual parameters
        String commentAuthor = getParameter(request, "author", "");
        String commentContent = getParameter(request, "content", "");
        boolean hasImage = Boolean.parseBoolean(getParameter(request, "hasImage", "false"));

        Entity commentEntity = new Entity("Comment");
        
        commentEntity.setProperty("author", commentAuthor);
        commentEntity.setProperty("content", commentContent);

        // check for file
        if (hasImage) {
            commentEntity.setProperty("image", getUploadedFileUrl(request, "image"));
        }

        // place comment in datstore
        datastore.put(commentEntity);

        response.getWriter().println(gson.toJson(commentEntity));
    }

    /**
    * @return the request parameter, or the default value if the parameter
    *         was not specified by the client
    */
    private String getParameter(HttpServletRequest request, String name, String defaultValue) {
        return Optional.ofNullable(request.getParameter(name)).orElse(defaultValue);
    }

    /** Returns a URL that points to the uploaded file, or null if the user didn't upload a file. */
    private String getUploadedFileUrl(HttpServletRequest request, String formInputElementName) {
        BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
        Map<String, List<BlobKey>> blobs = blobstoreService.getUploads(request);
        List<BlobKey> blobKeys = blobs.get(formInputElementName);

        // User submitted form without selecting a file, so we can't get a URL. (dev server)
        if (blobKeys == null || blobKeys.isEmpty()) {
            return null;
        }

        // Our form only contains a single file input, so get the first index.
        BlobKey blobKey = blobKeys.get(0);

        // User submitted form without selecting a file, so we can't get a URL. (live server)
        BlobInfo blobInfo = new BlobInfoFactory().loadBlobInfo(blobKey);
        if (blobInfo.getSize() == 0) {
            blobstoreService.delete(blobKey);
            return null;
        }

        // We could check the validity of the file here, e.g. to make sure it's an image file
        // https://stackoverflow.com/q/10779564/873165

        // Use ImagesService to get a URL that points to the uploaded file.
        ImagesService imagesService = ImagesServiceFactory.getImagesService();
        ServingUrlOptions options = ServingUrlOptions.Builder.withBlobKey(blobKey);

        // To support running in Google Cloud Shell with AppEngine's dev server, we must use the relative
        // path to the image, rather than the path returned by imagesService which contains a host.
        try {
            URL url = new URL(imagesService.getServingUrl(options));
            return url.getPath();
        } catch (MalformedURLException e) {
            return imagesService.getServingUrl(options);
        }
    }
}
