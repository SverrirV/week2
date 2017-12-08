# Steps we took to set up Jenkins

### Links to scripts used to set up Jenkins.
We decided to set up Jenkins manually and followed the instructions provided in day6/manualJenkins.md

### Url to Jenkins instance
http://ec2-18-217-192-65.us-east-2.compute.amazonaws.com:8080

### Other steps taken to make Jenkins work
We had to install a few plugins to make Jenkins work properly:
* GitHub Intergration
* NodeJS
* Pipeline NPM

We had to add NodeJS to the environment by stating in the Jenkinsfile to use the NodeJS plugin. We also ran into problems with the command 'npm install' but using 'yarn install' instead solves the issue.

A pipeline was successfully created and Jenkins correctly runs the server and tests.