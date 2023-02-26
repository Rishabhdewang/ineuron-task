TO start the project run: npm start

to dockerise the setup

// create build

1. RUN : " docker build -t ineuron-tbackend . "

// to create instance of images 
2. Run : " docker run --name express-api -d -p 4000:4000 ineuron-tbackend "

// To Start 
3. " docker start express-api "

// To Stop 
4. "docker stop express-api "
