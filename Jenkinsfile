node {
    env.NODEJS_HOME = "${tool 'recent node'}"
    checkout scm
    stage('Build') {
        echo 'Building..'
        sh 'npm install'
        sh 'npm run startserver'
        //Checking if jenkins picks up git push
    }
    stage('Test') {
        echo 'Testing..'
        sh 'npm run test'
    }
    stage('Deploy') {
        echo 'Deploying....'
    }
}
