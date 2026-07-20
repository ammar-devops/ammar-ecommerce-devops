pipeline {
    agent any

    environment {
        APP_DIR = "/home/ubuntu/ammar-ecommerce-devops"
        COMPOSE_FILE = "docker-compose.prod.yml"
    }

    stages {

        stage('Show Workspace') {
            steps {
                sh '''
                    echo "===== Jenkins Workspace ====="
                    pwd

                    echo ""
                    echo "Workspace Files:"
                    ls -la

                    echo ""
                    echo "Git Commit:"
                    git log --oneline -1 || true
                '''
            }
        }

        stage('Workspace Test') {
            steps {
                sh '''
                    echo "===== Workspace Test ====="
                    pwd

                    echo ""
                    echo "===== Docker Compose Config ====="
                    docker compose -f docker-compose.prod.yml config
                '''
            }
        }

        stage('Stop Old Containers') {
            steps {
                dir("${APP_DIR}") {
                    sh '''
                        docker compose -f ${COMPOSE_FILE} down || true
                    '''
                }
            }
        }

        stage('Deploy Application') {
            steps {
                dir("${APP_DIR}") {
                    sh '''
                        docker compose -f ${COMPOSE_FILE} up -d --build
                    '''
                }
            }
        }

        stage('Show Running Containers') {
            steps {
                dir("${APP_DIR}") {
                    sh '''
                        docker compose -f ${COMPOSE_FILE} ps
                    '''
                }
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    echo "Waiting for application..."
                    sleep 20

                    curl -f http://backend:5000/api/health

                    echo ""
                    echo "Application is Healthy"
                '''
            }
        }
    }

    post {

        success {
            echo "Deployment Successful!"
        }

        failure {
            echo "Deployment Failed!"

            dir("${APP_DIR}") {
                sh '''
                    docker compose -f ${COMPOSE_FILE} ps || true

                    echo ""
                    echo "===== Backend Logs ====="
                    docker compose -f ${COMPOSE_FILE} logs backend --tail=100 || true

                    echo ""
                    echo "===== Frontend Logs ====="
                    docker compose -f ${COMPOSE_FILE} logs frontend --tail=100 || true

                    echo ""
                    echo "===== Database Logs ====="
                    docker compose -f ${COMPOSE_FILE} logs postgres --tail=100 || true
                '''
            }
        }
    }
}