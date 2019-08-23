import lockr from "lockr";

export default function logOut( historyArray, path ) {
    historyArray.push(path);
    lockr.flush();
}