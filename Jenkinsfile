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

        stage('Stop Old Containers') {
            steps {
                sh '''
                docker compose -f ${COMPOSE_FILE} down || true
                '''
            }
        }

        stage('Deploy Application') {
            steps {
                sh '''
                docker compose -f ${COMPOSE_FILE} up -d --build
                '''
            }
        }

        stage('Show Running Containers') {
            steps {
                sh '''
                docker compose -f ${COMPOSE_FILE} ps
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                echo "Waiting for backend..."
                sleep 20

                echo "Checking Backend Health..."
                curl -f http://backend:5000/api/health

                echo ""
                echo "Application is Healthy."
                '''
            }
        }
    }

    post {

        success {
            echo 'Deployment Successful!'
        }

        failure {
            echo 'Deployment Failed!'

            sh '''
            echo "========== Docker Compose Status =========="
            docker compose -f ${COMPOSE_FILE} ps || true

            echo ""
            echo "========== Backend Logs =========="
            docker compose -f ${COMPOSE_FILE} logs backend --tail=100 || true

            echo ""
            echo "========== Frontend Logs =========="
            docker compose -f ${COMPOSE_FILE} logs frontend --tail=100 || true

            echo ""
            echo "========== Database Logs =========="
            docker compose -f ${COMPOSE_FILE} logs postgres --tail=100 || true
            '''
        }

        always {
            cleanWs()
        }
    }
}
