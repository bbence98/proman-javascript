import { dom } from "./dom.js";
import { user_manager } from "./user_manager.js"

// This function is to initialize the application
function init() {
    // init data
    dom.init();
    // loads user functions
    user_manager.main();
}

init();
