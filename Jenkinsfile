node {
    env.NODEJS_HOME = "${tool 'recent node'}"
    checkout scm
    stage('Build') {
        echo 'Building..'
        sh 'npm run startpostgres && sleep 10 && npm run migratedb'
        sh 'yarn install'
        sh 'cd client && yarn install'
        sh 'npm run startserver'
    }
    stage('Test') {
        echo 'Testing..'
        sh 'npm run test'
    }
    stage('Deploy') {
        sh './provision-new-environment.sh'
    }
}
