Tuzimbe-app is a construction site app for people to keep track of workers and building material at their construction sites.
This app is build with react at the frontend and Django at the backend
To run this app locally, installations of node.js and python should pe present and in the  path environment.
A revised code for the Front End which is runinig a git-page is at 

	https://github.com/ChiefDNA/tuzimbe-React

When these requirements are present, 
Download the repository to a local folder,
	Open commandPrompt and navigate to the root folder of Tuzimbe-App by code
     
     cd “your folder path”/Tuzimbe-App
  
  Be sure to navigate to the drive later first incase your download is not in the OperatingSystem drive by 
		 
      cd drive-later:

  navigate to the  tuzimbe_backend to start the database server by entring the following codes:
	   
     cd tuzimbe_backend
		   python manage.py runserver

 open  a new terminal (commandPromt) console and navigate to the root folder of the app and  enter the code bellow to start the react app
		   
     cd tuzimbe-app
		  npm start

now that the app is running,  open the browser and navigate to these  websites to view the app interface and tables respectively(paste and enter)
	   
     htttp://localhost:3000/
	    http://localhost:8000/admin/
     
Note: you will need create a  user either by registering or use the default username password ChiefDNA ADMIN to change give special permissions to the user: 
The current model does not require one to be allowed to access different components, simply register with the different job titles with Manager being the highest followed by Tracker and then the other.
This is because the Tracker needs access to more website tools almost as the manager that the rest in order to carry out his duties efficiently.
