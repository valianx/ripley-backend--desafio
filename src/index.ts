import { app } from './configs/main';

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // tslint:disable-next-line: no-console
  console.log('App on port ', port);
});
