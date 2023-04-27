import {action, makeObservable, observable} from "mobx";

class ThemeStore {
    isDarkMode = false;
    constructor() {
        makeObservable(this, {
            isDarkMode: observable,
            toggleDarkMode: action
        })
    }

    toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode
    }
}
