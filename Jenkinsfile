pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Environment') {
            steps {
                sh '''
                echo "===== Environment ====="
                node -v
                npm -v
                git --version
                docker --version
                docker compose version
                pwd
                ls -la
                '''
            }
        }
    }
}
