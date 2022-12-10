import fs from 'fs';

const errorHandler = (error, request, response, next) => {
    // Error handling middleware functionality
    // console.log( `error ${error.message}`) // log the error
    const status = error.status ? error.status : 500;
    // append error in log file

    const date = new Date().toISOString();
    
    fs.appendFile(`logs/errors-${date.split('T')[0]}.log`, `${status}: ${error.message} at ${date}\n`, function (err) {
      if (err) throw err;
    });
    
    // send back an easily understandable error message to the caller
    response.status(status).send({message:error.message})
  }

  export default errorHandler;