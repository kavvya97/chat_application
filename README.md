## NIMBLE ROBOTICS ASSESSMENT

**Author**: Kavvya Ramarathnam

### Description
A React web application that allows users to login/signup/logout with username and password and allow users to chat with other users of the application and upvote/downvote their messages

### Features
- Sign up a new user/account with a username and a password
- Login in with an existing username and password
- After login successfully, the user can send messages and see history messages from other users
- Users can send messages
- Users can upvote or downvote other user's message except their own messages

### Run the app
In the project directory, run 
1. `npm install` to install the necessary requirements
2. `npm start` to open the app in development mode
3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
4. Run `npm run build` to build app for production to the `build` folder

### Docker Container Deployment

- In the root directory, There is a `Dockerfile`
- To build the docker image, Run the below command
  - `docker build -t webchat_react:latest .` for building the webchat react application

- To Run the docker image, use the following commands
  - `docker run -p 8000:80 webchat_react:latest`

### Kubernetes Deployment
There is a kube folder in the root directory which contains the `webchat_react_deployment.yml` and `webchat_react_service.yml` and they host the deployment files for the webchat react frontend application. Ensure to install minikube for required OS and start the minikube cluster using
`minikube start`
Assuming the docker image is already built and available, we can run `build_kube.sh`` to run the required deployments.

### Additional Improvements
1. Added functionality to logout the user and navigate to login page
2. Created Form error  to let the user know if the API call has failed
3. Email and password check to inform user of any invalid email or password
4. username, email, password checks to ensure that the fields are required and not-empty
5. link to navigate to signup from login if user does not have login credentials and navigate to login page from signup if user is already a member
6. Navigation bar at the top of the page to scale the application for adding new features later
7. Profile icon on navigation bar to provide options of user to logout of the application
8. Auto-scrolling to the bottom of the messages when user types in a new message
9. Intuitive UI with speech bubbles to clearly indicate the current user and other users
10. If users attempt to go to /home page without logging in, they would be redirected/navigated to login page

### TODO/Can be improved
1. Hashing the password when sending request from frontend to backend
2. show the upvote/downvote count in the UI
3. Maintain a session object when user logs in and automatically logout when the session expires
4. Make the password field more strong and secure by adding additional checks to ensure that user data is secure