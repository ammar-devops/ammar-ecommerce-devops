pipeline {
    agent any

    environment {
        COMPOSE_FILE = "docker-compose.prod.yml"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Environment Check') {
            steps {
                sh '''
                echo "===== Environment ====="
                node -v
                npm -v
                git --version
                docker --version
                docker compose version
                '''
            }
        }

        stage('Install Backend') {
            steps {
                dir('backend') {
                    sh 'npm ci'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh '''
                    npm ci
                    npm run build
                    '''
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                docker compose -f ${COMPOSE_FILE} build
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                docker compose -f ${COMPOSE_FILE} down
                docker compose -f ${COMPOSE_FILE} up -d
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                sleep 10

                curl -f http://localhost:5000/api/health

                curl -I http://localhost
                '''
            }
        }

        stage('Docker Cleanup') {
            steps {
                sh '''
                docker image prune -f
                '''
            }
        }
    }

    post {

        success {
            echo "✅ Deployment Successful"
        }

        failure {
            echo "❌ Deployment Failed"

            sh '''
            docker compose -f ${COMPOSE_FILE} ps
            docker compose -f ${COMPOSE_FILE} logs --tail=50
            '''
        }

        always {
            echo "Pipeline Finished"
        }
    }
}
