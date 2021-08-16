export class DataManager {
    static dataSlots = [];

    static createDataSlot(key, data) {

    }

    static getDataSlot(key) {
        return DataManager.dataSlots.filter(ds => ds.key === key);
    }

    static loadDataSlot(key) {
        let ds = this.getDataSlot(key);
        httpUtil.load(ds.apiLink, sd.parameters, (result) => {
            ds.data = result;
            ds.notifyChange("dataLoadedSuccessfully")
        })
        return DataManager.dataSlots.filter(ds => ds.key === key);
    }
}

export class HttpDataSlot {
    publisher;
    key;
    data;

    apiLink = "www.api/user/"
    parameters = [
        {id: 10}
    ]

    notifyChange(newState) {
        this.publisher.notify(newState)
    }
}


