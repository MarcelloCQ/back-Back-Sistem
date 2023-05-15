import app from "./app";

const main = () => {
  app.listen(app.get('port'));
  console.log(`server is runing on http://localhost:${app.get('port')}/api`);
};

main();
