FROM jenkins/jenkins:lts-jdk21

USER root

# Install utilities
RUN apt-get update && apt-get install -y \
    curl \
    git \
    unzip \
    ca-certificates \
    gnupg \
    lsb-release

# Install Docker CLI
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | \
    gpg --dearmor -o /usr/share/keyrings/docker.gpg

RUN echo \
"deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker.gpg] https://download.docker.com/linux/debian \
$(. /etc/os-release && echo $VERSION_CODENAME) stable" \
> /etc/apt/sources.list.d/docker.list

RUN apt-get update && apt-get install -y \
    docker-ce-cli \
    docker-compose-plugin

# Install Node.js 22
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash -

RUN apt-get install -y nodejs

# Install Jenkins plugins
COPY plugins.txt /usr/share/jenkins/ref/plugins.txt

RUN jenkins-plugin-cli --plugin-file /usr/share/jenkins/ref/plugins.txt

# Match Docker group from host (GID 986)
RUN groupadd -g 986 dockerhost || true && \
    usermod -aG dockerhost jenkins

USER jenkins
