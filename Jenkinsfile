pipeline {
    agent any

    environment {
        APP_DIR = "/home/ubuntu/ammar-ecommerce-devops"
        COMPOSE_FILE = "docker-compose.prod.yml"
        BRANCH = "main"
    }

    stages {

        stage('Update Source') {
            steps {
                sh '''
                cd ${APP_DIR}
                git fetch origin
                git reset --hard origin/${BRANCH}
                '''
            }
        }

        stage('Stop Old Containers') {
            steps {
                sh '''
                cd ${APP_DIR}
                docker compose -f ${COMPOSE_FILE} down || true
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                cd ${APP_DIR}
                docker compose -f ${COMPOSE_FILE} up -d --build
                '''
            }
        }

        stage('Show Containers') {
            steps {
                sh '''
                cd ${APP_DIR}
                docker compose -f ${COMPOSE_FILE} ps
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                sleep 20
                curl -f http://localhost:5000/api/health
                '''
            }
        }
    }

    post {

        success {
            echo "Deployment Successful"
        }

        failure {

            sh '''
            cd ${APP_DIR}

            docker compose -f ${COMPOSE_FILE} ps || true

            docker compose -f ${COMPOSE_FILE} logs backend --tail=100 || true

            docker compose -f ${COMPOSE_FILE} logs frontend --tail=100 || true

            docker compose -f ${COMPOSE_FILE} logs postgres --tail=100 || true
            '''
        }
    }
}
