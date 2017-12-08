node {
    checkout scm
    stage('Build') {
        echo 'Building..'
        sh 'curl -o- -L https://yarnpkg.com/install.sh | bash'
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
