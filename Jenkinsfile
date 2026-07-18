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
                node -v
                npm -v
                git --version
                docker --version
                '''
            }
        }

        stage('Backend') {
            steps {
                dir('backend') {
                    sh '''
                    npm install
                    '''
                }
            }
        }

        stage('Frontend') {
            steps {
                dir('frontend') {
                    sh '''
                    npm install
                    npm run build
                    '''
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                docker build -t ecommerce-backend:v1 ./backend
                docker build -t ecommerce-frontend:v1 ./frontend
                '''
            }
        }
    }
}