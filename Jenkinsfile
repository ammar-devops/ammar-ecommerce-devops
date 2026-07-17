pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Repository cloned successfully.'
            }
        }

        stage('Workspace') {
            steps {
                sh 'pwd'
                sh 'ls -la'
            }
        }
    }
}