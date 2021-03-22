"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./configs/main");
const port = process.env.PORT || 3000;
main_1.app.listen(port, () => {
    // tslint:disable-next-line: no-console
    console.log('App on port ', port);
});
//# sourceMappingURL=index.js.map