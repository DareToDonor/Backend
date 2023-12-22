
# Dare To Donor Backend

Backend application serve REST API for Dare To Donor App. Dare To Donor is application that serves as a centralized platform for tracking blood bank availability, providing real-time updates on donation events and news, and enabling users to maintain a comprehensive donation history. Leveraging machine learning capabilities, the application will forecast blood supply demand, fostering a more efficient and timely donation process.


## Backend Architecture
![Logo](https://storage.googleapis.com/daretodonor-bucket/assets/Arcitecture.png)



## Run Locally

Clone the project

```bash
  git clone https://github.com/DareToDonor/Backend
```

Go to the project directory

```bash
  cd Backend
```

Install dependencies

```bash
  npm install
```

Configure file .env

```bash
  cp .env.example .env
```

Install Migrate Database

```bash
  npx sequelize-cli db:migrate
```

Start the server

```bash
  npm run start
```
    