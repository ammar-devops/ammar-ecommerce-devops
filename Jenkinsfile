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
                echo "===== Current Directory ====="
                pwd

                echo "===== Files ====="
                ls -la

                echo "===== Git ====="
                git --version

                echo "===== Node ====="
                node -v

                echo "===== NPM ====="
                npm -v

                echo "===== Docker ====="
                docker --version

                echo "===== Docker Containers ====="
                docker ps
                '''
            }
        }
    }
}