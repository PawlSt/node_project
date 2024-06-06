import fs from "fs"
import { photosJson } from "../model.js"
const downloadFunctions = {
    ogFileDownload: (adres) => {
        const file = photosJson.find(photo => photo.id == adres)
        if (!file) {
            return "nophoto"
        } else {

            const filepath = file.url
            console.log(filepath)
            return filepath
        }
    },
    filteredDownload: (adres, filter) => {
        const file = photosJson.find(photo => photo.id == adres)
        if (!file) {
            return "nophoto"
        } else {
            const filepath = file.url.slice(0, file.url.lastIndexOf('.')) + filter + file.url.slice(file.url.lastIndexOf('.'))
            console.log(filepath)
            return filepath
        }
    }
}
export { downloadFunctions }