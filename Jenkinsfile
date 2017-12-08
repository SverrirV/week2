node {
    checkout scm
    stage('Build') {
        echo 'Building..'
        sh 'yarn install'
        sh 'yarn run startserver'
    }
    stage('Test') {
        echo 'Testing..'
        sh 'yarn run test'
    }
    stage('Deploy') {
        echo 'Deploying....'
    }
}
