node {
    env.NODEJS_HOME = "${tool 'Nafn'}"
    checkout scm
    stage('Build') {
        echo 'Building..'
        sh 'npm install'
        sh 'npm run startserver'
    }
    stage('Test') {
        echo 'Testing..'
        sh 'npm run test'
    }
    stage('Deploy') {
        echo 'Deploying....'
    }
}
